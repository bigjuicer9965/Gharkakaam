from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Booking, BookingStatus, ServiceProvider, User
from datetime import datetime

bookings_bp = Blueprint('bookings', __name__)

@bookings_bp.route('/', methods=['GET'])
@jwt_required()
def get_bookings():
    try:
        current_user_id = get_jwt_identity()
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        status = request.args.get('status')
        
        query = Booking.query.filter(
            (Booking.customer_id == current_user_id) |
            (Booking.provider.has(user_id=current_user_id))
        )
        
        if status:
            try:
                status_enum = BookingStatus(status)
                query = query.filter_by(status=status_enum)
            except ValueError:
                return jsonify({'error': 'Invalid status'}), 400
        
        bookings = query.order_by(Booking.created_at.desc()).paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
        
        return jsonify({
            'bookings': [booking.to_dict() for booking in bookings.items],
            'total': bookings.total,
            'pages': bookings.pages,
            'current_page': page
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bookings_bp.route('/', methods=['POST'])
@jwt_required()
def create_booking():
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if current_user.user_type != 'customer':
            return jsonify({'error': 'Only customers can create bookings'}), 403
        
        data = request.get_json()
        
        required_fields = ['provider_id', 'service_date', 'service_address']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Validate provider exists and is approved
        provider = ServiceProvider.query.get(data['provider_id'])
        if not provider or not provider.is_approved:
            return jsonify({'error': 'Provider not found or not approved'}), 404
        
        # Parse service date
        try:
            service_date = datetime.fromisoformat(data['service_date'].replace('Z', '+00:00'))
        except ValueError:
            return jsonify({'error': 'Invalid service date format'}), 400
        
        booking = Booking(
            customer_id=current_user_id,
            provider_id=data['provider_id'],
            service_date=service_date,
            service_duration=data.get('service_duration'),
            service_address=data['service_address'],
            special_requirements=data.get('special_requirements', ''),
            estimated_price=data.get('estimated_price')
        )
        
        db.session.add(booking)
        db.session.commit()
        
        return jsonify({
            'message': 'Booking created successfully',
            'booking': booking.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@bookings_bp.route('/<int:booking_id>', methods=['GET'])
@jwt_required()
def get_booking(booking_id):
    try:
        current_user_id = get_jwt_identity()
        booking = Booking.query.get(booking_id)
        
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
        
        # Check if user is authorized to view this booking
        if (booking.customer_id != current_user_id and 
            booking.provider.user_id != current_user_id):
            return jsonify({'error': 'Unauthorized'}), 403
        
        return jsonify({'booking': booking.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bookings_bp.route('/<int:booking_id>/status', methods=['PUT'])
@jwt_required()
def update_booking_status(booking_id):
    try:
        current_user_id = get_jwt_identity()
        booking = Booking.query.get(booking_id)
        
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
        
        data = request.get_json()
        new_status = data.get('status')
        
        if not new_status:
            return jsonify({'error': 'Status is required'}), 400
        
        try:
            status_enum = BookingStatus(new_status)
        except ValueError:
            return jsonify({'error': 'Invalid status'}), 400
        
        # Check authorization based on status change
        if status_enum in [BookingStatus.CONFIRMED, BookingStatus.IN_PROGRESS, BookingStatus.COMPLETED]:
            # Only provider can update to these statuses
            if booking.provider.user_id != current_user_id:
                return jsonify({'error': 'Unauthorized'}), 403
        elif status_enum == BookingStatus.CANCELLED:
            # Both customer and provider can cancel
            if (booking.customer_id != current_user_id and 
                booking.provider.user_id != current_user_id):
                return jsonify({'error': 'Unauthorized'}), 403
        
        booking.status = status_enum
        if 'notes' in data:
            booking.notes = data['notes']
        if 'final_price' in data and booking.provider.user_id == current_user_id:
            booking.final_price = data['final_price']
        
        # Update provider's total bookings when completed
        if status_enum == BookingStatus.COMPLETED:
            booking.provider.total_bookings += 1
        
        db.session.commit()
        
        return jsonify({
            'message': 'Booking status updated successfully',
            'booking': booking.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500