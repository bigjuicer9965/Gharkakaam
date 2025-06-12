from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from datetime import timedelta
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL',
    'postgresql://postgres:postgres@localhost:5432/gharkakaam'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)

# Initialize extensions
from extensions import db  # ✅ Use this db (initialized with init_app)
db.init_app(app)           # ✅ Required to link db with Flask app

CORS(app)
jwt = JWTManager(app)

# Import and register blueprints inside app context
with app.app_context():
    from models import *  # ✅ Safe to import after db.init_app(app)

    try:
        from routes.auth import auth_bp
        from routes.users import users_bp
        from routes.services import services_bp
        from routes.bookings import bookings_bp
        from routes.reviews import reviews_bp

        app.register_blueprint(auth_bp, url_prefix='/api/auth')
        app.register_blueprint(users_bp, url_prefix='/api/users')
        app.register_blueprint(services_bp, url_prefix='/api/services')
        app.register_blueprint(bookings_bp, url_prefix='/api/bookings')
        app.register_blueprint(reviews_bp, url_prefix='/api/reviews')
    except ImportError as e:
        print(f"[ERROR] Failed to import blueprints or models: {e}")

    # Create tables
    try:
        db.create_all()
        print("[INFO] Database tables created (if not exist).")
    except Exception as e:
        print(f"[ERROR] Failed to create tables: {e}")

# Root test page
@app.route('/')
def index():
    return '''
    <h1>👋 Welcome to GharKaKaam API</h1>
    <p>The backend is running and ready to serve!</p>
    <p>Check <a href="/api/health">/api/health</a> for health status.</p>
    '''

# Health check route
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'GharKaKaam API is running'})

# Start the Flask app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
