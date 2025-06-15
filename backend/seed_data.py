from app import app
from models import db, User, ServiceCategory, ServiceProvider, Booking, Review, UserType, BookingStatus
from werkzeug.security import generate_password_hash
from datetime import datetime

def seed_database():
    with app.app_context():
        db.create_all()

        # ----- Service Categories -----
        categories_data = [
            {
                'name': 'Cooking',
                'description': 'Home-cooked meals by skilled women',
                'icon': 'fa-utensils'
            },
            {
                'name': 'Cleaning',
                'description': 'Professional home and office cleaning',
                'icon': 'fa-broom'
            }
        ]
        categories = []
        for cat_data in categories_data:
            category = ServiceCategory.query.filter_by(name=cat_data['name']).first()
            if not category:
                category = ServiceCategory(**cat_data)
                db.session.add(category)
            categories.append(category)

        # ----- Users -----
        users_data = [
            {
                'name': 'Ayesha Khan',
                'email': 'ayesha@gmail.com',
                'phone': '03001234567',
                'user_type': UserType.CUSTOMER,
                'location': 'Lahore',
                'password': 'password123'
            },
            {
                'name': 'Sara Malik',
                'email': 'sara.provider@gmail.com',
                'phone': '03007654321',
                'user_type': UserType.PROVIDER,
                'location': 'Karachi',
                'password': 'password123'
            },
            {
                'name': 'Admin User',
                'email': 'admin@gharkakaam.pk',
                'phone': '03009998888',
                'user_type': UserType.ADMIN,
                'location': 'Islamabad',
                'password': 'admin123'
            }
        ]
        users = []
        for user_data in users_data:
            user = User.query.filter_by(email=user_data['email']).first()
            if not user:
                user = User(
                    name=user_data['name'],
                    email=user_data['email'],
                    phone=user_data['phone'],
                    user_type=user_data['user_type'],
                    location=user_data['location'],
                    is_verified=True,
                    is_active=True
                )
                user.set_password(user_data['password'])
                db.session.add(user)
            users.append(user)

        db.session.commit()  # Commit now to get user and category IDs

        # ----- Service Provider -----
        provider_user = User.query.filter_by(email='sara.provider@gmail.com').first()
        cooking_category = ServiceCategory.query.filter_by(name='Cooking').first()
        if provider_user and cooking_category:
            if not ServiceProvider.query.filter_by(user_id=provider_user.id).first():
                provider = ServiceProvider(
                    user_id=provider_user.id,
                    category_id=cooking_category.id,
                    service_title='Tiffin Service Expert',
                    description='Delicious Pakistani meals for lunch and dinner',
                    specialties=["Pakistani", "Vegetarian", "Tandoori"],
                    experience_years=4,
                    price_range_min=500.00,
                    price_range_max=1500.00,
                    price_unit='per meal',
                    availability={"mon_fri": "9am-5pm"},
                    service_area='Karachi',
                    rating=4.5,
                    total_reviews=10,
                    total_bookings=20,
                    is_approved=True,
                    is_active=True,
                    verification_documents=["cnic.jpg", "certificate.jpg"]
                )
                db.session.add(provider)
                db.session.commit()

        # ----- Booking -----
        customer_user = User.query.filter_by(email='ayesha@gmail.com').first()
        provider = ServiceProvider.query.filter_by(user_id=provider_user.id).first()

        if customer_user and provider:
            if not Booking.query.first():
                booking = Booking(
                    customer_id=customer_user.id,
                    provider_id=provider.id,
                    service_date=datetime(2025, 6, 20, 14, 0),
                    service_duration=90,
                    service_address='House #12, Gulshan-e-Iqbal, Karachi',
                    special_requirements='Less spicy food',
                    estimated_price=1000.00,
                    final_price=1100.00,
                    status=BookingStatus.COMPLETED,
                    payment_status='paid',
                    notes='Customer was happy with the meal.'
                )
                db.session.add(booking)
                db.session.commit()

                # ----- Review -----
                review = Review(
                    booking_id=booking.id,
                    customer_id=customer_user.id,
                    provider_id=provider.id,
                    rating=5,
                    comment='Absolutely delicious and on time! Highly recommended.',
                    is_verified=True
                )
                db.session.add(review)

        db.session.commit()
        print("✅ Database seeded successfully!")


if __name__ == '__main__':
    seed_database()
