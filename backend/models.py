from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
import enum


class UserType(enum.Enum):
    CUSTOMER = "customer"
    PROVIDER = "provider"
    ADMIN = "admin"

class BookingStatus(enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    user_type = db.Column(db.Enum(UserType), nullable=False, default=UserType.CUSTOMER)
    location = db.Column(db.String(200))
    is_verified = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    profile_image = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    provider_profile = db.relationship('ServiceProvider', backref='user', uselist=False, cascade='all, delete-orphan')
    bookings_as_customer = db.relationship('Booking', foreign_keys='Booking.customer_id', backref='customer')
    reviews_given = db.relationship('Review', foreign_keys='Review.customer_id', backref='reviewer')
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'user_type': self.user_type.value,
            'location': self.location,
            'is_verified': self.is_verified,
            'is_active': self.is_active,
            'profile_image': self.profile_image,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class ServiceCategory(db.Model):
    __tablename__ = 'service_categories'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.Text)
    icon = db.Column(db.String(50))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    providers = db.relationship('ServiceProvider', backref='category')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'icon': self.icon,
            'is_active': self.is_active
        }

class ServiceProvider(db.Model):
    __tablename__ = 'service_providers'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('service_categories.id'), nullable=False)
    service_title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    specialties = db.Column(db.JSON)  # Array of specialties
    experience_years = db.Column(db.Integer)
    price_range_min = db.Column(db.Numeric(10, 2))
    price_range_max = db.Column(db.Numeric(10, 2))
    price_unit = db.Column(db.String(50))  # per hour, per session, per meal, etc.
    availability = db.Column(db.JSON)  # Available days and times
    service_area = db.Column(db.String(500))  # Areas they serve
    rating = db.Column(db.Numeric(3, 2), default=0.0)
    total_reviews = db.Column(db.Integer, default=0)
    total_bookings = db.Column(db.Integer, default=0)
    is_approved = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    verification_documents = db.Column(db.JSON)  # Document URLs
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    bookings = db.relationship('Booking', backref='provider')
    reviews = db.relationship('Review', backref='provider')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user': self.user.to_dict() if self.user else None,
            'category': self.category.to_dict() if self.category else None,
            'service_title': self.service_title,
            'description': self.description,
            'specialties': self.specialties,
            'experience_years': self.experience_years,
            'price_range_min': float(self.price_range_min) if self.price_range_min else None,
            'price_range_max': float(self.price_range_max) if self.price_range_max else None,
            'price_unit': self.price_unit,
            'availability': self.availability,
            'service_area': self.service_area,
            'rating': float(self.rating) if self.rating else 0.0,
            'total_reviews': self.total_reviews,
            'total_bookings': self.total_bookings,
            'is_approved': self.is_approved,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Booking(db.Model):
    __tablename__ = 'bookings'
    
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey('service_providers.id'), nullable=False)
    service_date = db.Column(db.DateTime, nullable=False)
    service_duration = db.Column(db.Integer)  # in minutes
    service_address = db.Column(db.Text, nullable=False)
    special_requirements = db.Column(db.Text)
    estimated_price = db.Column(db.Numeric(10, 2))
    final_price = db.Column(db.Numeric(10, 2))
    status = db.Column(db.Enum(BookingStatus), default=BookingStatus.PENDING)
    payment_status = db.Column(db.String(50), default='pending')
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'customer': self.customer.to_dict() if self.customer else None,
            'provider': self.provider.to_dict() if self.provider else None,
            'service_date': self.service_date.isoformat() if self.service_date else None,
            'service_duration': self.service_duration,
            'service_address': self.service_address,
            'special_requirements': self.special_requirements,
            'estimated_price': float(self.estimated_price) if self.estimated_price else None,
            'final_price': float(self.final_price) if self.final_price else None,
            'status': self.status.value,
            'payment_status': self.payment_status,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Review(db.Model):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey('service_providers.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)  # 1-5 stars
    comment = db.Column(db.Text)
    is_verified = db.Column(db.Boolean, default=True)  # Only from actual bookings
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    booking = db.relationship('Booking', backref='review')
    
    def to_dict(self):
        return {
            'id': self.id,
            'booking_id': self.booking_id,
            'customer': self.reviewer.to_dict() if self.reviewer else None,
            'provider_id': self.provider_id,
            'rating': self.rating,
            'comment': self.comment,
            'is_verified': self.is_verified,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }