from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Review, Booking, BookingStatus, ServiceProvider
from sqlalchemy import func

reviews_bp = Blueprint('reviews', __name__)

@reviews_bp.route('/provider/<int:provider_id>', methods=['GET'])
def get_provider_reviews(provider_id):
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        reviews = Review.query.filter_by(
            provider_id=provider_id,
            is_verified=True
        ).order_by(Review.created_at.desc()).paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
        
        return jsonify({
            'reviews': [review.to_dict() for review in reviews.items],
            'total': reviews.total,
            'pages': reviews.pages,
            'current_page': page
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@reviews_bp.route('/', methods=['POST'])
@jwt_required()
def create_review():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        required_fields = ['booking_id', 'rating']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Validate booking exists and is completed
        booking = Booking.query.get(data['booking_id'])
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
        
        if booking.customer_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        if booking.status != BookingStatus.COMPLETED:
            return jsonify({'error': 'Can only review completed bookings'}), 400
        
        # Check if review already exists
        existing_review = Review.query.filter_by(booking_id=data['booking_id']).first()
        if existing_review:
            return jsonify({'error': 'Review already exists for this booking'}), 400
        
        # Validate rating
        rating = data['rating']
        if not isinstance(rating, int) or rating < 1 or rating > 5:
            return jsonify({'error': 'Rating must be between 1 and 5'}), 400
        
        review = Review(
            booking_id=data['booking_id'],
            customer_id=current_user_id,
            provider_id=booking.provider_id,
            rating=rating,
            comment=data.get('comment', ''),
            is_verified=True
        )
        
        db.session.add(review)
        
        # Update provider's rating and review count
        provider = booking.provider
        provider.total_reviews += 1
        
        # Calculate new average rating
        avg_rating = db.session.query(func.avg(Review.rating)).filter_by(
            provider_id=provider.id,
            is_verified=True
        ).scalar()
        
        provider.rating = round(avg_rating, 2) if avg_rating else 0
        
        db.session.commit()
        
        return jsonify({
            'message': 'Review created successfully',
            'review': review.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@reviews_bp.route('/<int:review_id>', methods=['PUT'])
@jwt_required()
def update_review(review_id):
    try:
        current_user_id = get_jwt_identity()
        review = Review.query.get(review_id)
        
        if not review:
            return jsonify({'error': 'Review not found'}), 404
        
        if review.customer_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        if 'rating' in data:
            rating = data['rating']
            if not isinstance(rating, int) or rating < 1 or rating > 5:
                return jsonify({'error': 'Rating must be between 1 and 5'}), 400
            review.rating = rating
        
        if 'comment' in data:
            review.comment = data['comment']
        
        db.session.commit()
        
        # Recalculate provider rating
        provider = review.provider
        avg_rating = db.session.query(func.avg(Review.rating)).filter_by(
            provider_id=provider.id,
            is_verified=True
        ).scalar()
        
        provider.rating = round(avg_rating, 2) if avg_rating else 0
        db.session.commit()
        
        return jsonify({
            'message': 'Review updated successfully',
            'review': review.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@reviews_bp.route('/<int:review_id>', methods=['DELETE'])
@jwt_required()
def delete_review(review_id):
    try:
        current_user_id = get_jwt_identity()
        review = Review.query.get(review_id)
        
        if not review:
            return jsonify({'error': 'Review not found'}), 404
        
        if review.customer_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        provider = review.provider
        provider.total_reviews -= 1
        
        db.session.delete(review)
        
        # Recalculate provider rating
        avg_rating = db.session.query(func.avg(Review.rating)).filter_by(
            provider_id=provider.id,
            is_verified=True
        ).scalar()
        
        provider.rating = round(avg_rating, 2) if avg_rating else 0
        db.session.commit()
        
        return jsonify({'message': 'Review deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500