from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, ServiceProvider, ServiceCategory, User, UserType
from sqlalchemy import or_, and_

services_bp = Blueprint('services', __name__)

@services_bp.route('/categories', methods=['GET'])
def get_categories():
    try:
        categories = ServiceCategory.query.filter_by(is_active=True).all()
        return jsonify({
            'categories': [category.to_dict() for category in categories]
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@services_bp.route('/categories', methods=['POST'])
@jwt_required()
def create_category():
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if current_user.user_type != UserType.ADMIN:
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        if not data.get('name'):
            return jsonify({'error': 'Category name is required'}), 400
        
        category = ServiceCategory(
            name=data['name'],
            description=data.get('description', ''),
            icon=data.get('icon', '')
        )
        
        db.session.add(category)
        db.session.commit()
        
        return jsonify({
            'message': 'Category created successfully',
            'category': category.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@services_bp.route('/providers', methods=['GET'])
def get_providers():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 12, type=int)
        category_id = request.args.get('category_id', type=int)
        location = request.args.get('location')
        search = request.args.get('search')
        min_rating = request.args.get('min_rating', type=float)
        
        query = ServiceProvider.query.filter_by(is_approved=True, is_active=True)
        
        if category_id:
            query = query.filter_by(category_id=category_id)
        
        if location:
            query = query.filter(ServiceProvider.service_area.ilike(f'%{location}%'))
        
        if search:
            query = query.join(User).filter(
                or_(
                    ServiceProvider.service_title.ilike(f'%{search}%'),
                    ServiceProvider.description.ilike(f'%{search}%'),
                    User.name.ilike(f'%{search}%')
                )
            )
        
        if min_rating:
            query = query.filter(ServiceProvider.rating >= min_rating)
        
        # Order by rating and total reviews
        query = query.order_by(ServiceProvider.rating.desc(), ServiceProvider.total_reviews.desc())
        
        providers = query.paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
        
        return jsonify({
            'providers': [provider.to_dict() for provider in providers.items],
            'total': providers.total,
            'pages': providers.pages,
            'current_page': page
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@services_bp.route('/providers/<int:provider_id>', methods=['GET'])
def get_provider(provider_id):
    try:
        provider = ServiceProvider.query.get(provider_id)
        
        if not provider:
            return jsonify({'error': 'Provider not found'}), 404
        
        return jsonify({'provider': provider.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@services_bp.route('/providers', methods=['POST'])
@jwt_required()
def create_provider_profile():
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if current_user.user_type != UserType.PROVIDER:
            return jsonify({'error': 'Only service providers can create profiles'}), 403
        
        # Check if user already has a provider profile
        existing_provider = ServiceProvider.query.filter_by(user_id=current_user_id).first()
        if existing_provider:
            return jsonify({'error': 'Provider profile already exists'}), 400
        
        data = request.get_json()
        
        required_fields = ['category_id', 'service_title', 'description']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'{field} is required'}), 400
        
        provider = ServiceProvider(
            user_id=current_user_id,
            category_id=data['category_id'],
            service_title=data['service_title'],
            description=data['description'],
            specialties=data.get('specialties', []),
            experience_years=data.get('experience_years'),
            price_range_min=data.get('price_range_min'),
            price_range_max=data.get('price_range_max'),
            price_unit=data.get('price_unit'),
            availability=data.get('availability', {}),
            service_area=data.get('service_area', ''),
            verification_documents=data.get('verification_documents', [])
        )
        
        db.session.add(provider)
        db.session.commit()
        
        return jsonify({
            'message': 'Provider profile created successfully',
            'provider': provider.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@services_bp.route('/providers/<int:provider_id>', methods=['PUT'])
@jwt_required()
def update_provider_profile(provider_id):
    try:
        current_user_id = get_jwt_identity()
        provider = ServiceProvider.query.get(provider_id)
        
        if not provider:
            return jsonify({'error': 'Provider not found'}), 404
        
        if provider.user_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        # Update allowed fields
        updatable_fields = [
            'service_title', 'description', 'specialties', 'experience_years',
            'price_range_min', 'price_range_max', 'price_unit', 'availability',
            'service_area', 'verification_documents'
        ]
        
        for field in updatable_fields:
            if field in data:
                setattr(provider, field, data[field])
        
        db.session.commit()
        
        return jsonify({
            'message': 'Provider profile updated successfully',
            'provider': provider.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@services_bp.route('/providers/<int:provider_id>/approve', methods=['POST'])
@jwt_required()
def approve_provider(provider_id):
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if current_user.user_type != UserType.ADMIN:
            return jsonify({'error': 'Unauthorized'}), 403
        
        provider = ServiceProvider.query.get(provider_id)
        if not provider:
            return jsonify({'error': 'Provider not found'}), 404
        
        provider.is_approved = True
        db.session.commit()
        
        return jsonify({
            'message': 'Provider approved successfully',
            'provider': provider.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500