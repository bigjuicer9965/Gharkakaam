from app import app
from models import db, User, ServiceCategory, ServiceProvider, UserType
from werkzeug.security import generate_password_hash

def seed_database():
    with app.app_context():
        # Create tables
        db.create_all()
        
        # Create service categories
        categories = [
            {
                'name': 'Home Cooking & Catering',
                'description': 'Professional cooking services for homes and events',
                'icon': 'chef-hat'
            },
            {
                'name': 'Beauty Services',
                'description': 'Makeup, hair styling, and beauty treatments',
                'icon': 'scissors'
            },
            {
                'name': 'Tutoring & Education',
                'description': 'Academic tutoring and skill development',
                'icon': 'graduation-cap'
            },
            {
                'name': 'Tailoring & Embroidery',
                'description': 'Custom clothing and alterations',
                'icon': 'palette'
            },
            {
                'name': 'Cleaning Services',
                'description': 'Home and office cleaning services',
                'icon': 'home'
            },
            {
                'name': 'Childcare',
                'description': 'Babysitting and childcare services',
                'icon': 'baby'
            }
        ]
        
        for cat_data in categories:
            if not ServiceCategory.query.filter_by(name=cat_data['name']).first():
                category = ServiceCategory(**cat_data)
                db.session.add(category)
        
        # Create admin user
        if not User.query.filter_by(email='admin@gharkakaam.com').first():
            admin = User(
                name='Admin User',
                email='admin@gharkakaam.com',
                phone='+919876543210',
                user_type=UserType.ADMIN,
                location='Mumbai, India',
                is_verified=True
            )
            admin.set_password('admin123')
            db.session.add(admin)
        
        # Create sample users
        sample_users = [
            {
                'name': 'Sunita Sharma',
                'email': 'sunita@example.com',
                'phone': '+919876543211',
                'user_type': UserType.PROVIDER,
                'location': 'Andheri, Mumbai'
            },
            {
                'name': 'Priya Patel',
                'email': 'priya@example.com',
                'phone': '+919876543212',
                'user_type': UserType.PROVIDER,
                'location': 'Bandra, Mumbai'
            },
            {
                'name': 'Meera Gupta',
                'email': 'meera@example.com',
                'phone': '+919876543213',
                'user_type': UserType.PROVIDER,
                'location': 'Powai, Mumbai'
            },
            {
                'name': 'Anjali Customer',
                'email': 'customer@example.com',
                'phone': '+919876543214',
                'user_type': UserType.CUSTOMER,
                'location': 'Juhu, Mumbai'
            }
        ]
        
        for user_data in sample_users:
            if not User.query.filter_by(email=user_data['email']).first():
                user = User(**user_data)
                user.set_password('password123')
                user.is_verified = True
                db.session.add(user)
        
        db.session.commit()
        print("Database seeded successfully!")

if __name__ == '__main__':
    seed_database()