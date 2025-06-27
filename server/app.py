from flask import request
from flask_restful import Resource, Api
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

from server.config import app, db
db.init_app(app)

from server.models import User, ChargingStation, Reservation, Review

migrate = Migrate(app, db)
api = Api(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
jwt = JWTManager(app)

class StationList(Resource):
    def get(self):
        stations = [station.to_dict() for station in ChargingStation.query.all()]
        return stations, 200

    @jwt_required()
    def post(self):
        current_user_id = int(get_jwt_identity())
        data = request.get_json()
        station = ChargingStation(
            name=data['name'],
            location=data['location'],
            is_available=data.get('is_available', True),
            price=data['price'],
            type=data['type'],
            owner_id=current_user_id
        )
        db.session.add(station)
        db.session.commit()
        return station.to_dict(), 201

class StationDetail(Resource):
    def get(self, id):
        station = ChargingStation.query.get_or_404(id)
        return station.to_dict(), 200

    @jwt_required()
    def patch(self, id):
        current_user_id = int(get_jwt_identity())
        station = ChargingStation.query.get_or_404(id)
        user = User.query.get(current_user_id)

        if station.owner_id != current_user_id and not (user and user.is_admin):
            return {'message': 'You do not have permission to edit this station'}, 403

        data = request.get_json()
        for key, value in data.items():
            setattr(station, key, value)
        db.session.commit()
        return station.to_dict(), 200

    @jwt_required()
    def delete(self, id):
        current_user_id = int(get_jwt_identity())
        station = ChargingStation.query.get_or_404(id)
        user = User.query.get(current_user_id)

        if station.owner_id != current_user_id and not (user and user.is_admin):
            return {'message': 'You do not have permission to delete this station'}, 403

        db.session.delete(station)
        db.session.commit()
        return '', 204

class ReservationList(Resource):
    def get(self):
        reservations = [res.to_dict() for res in Reservation.query.all()]
        return reservations, 200

    @jwt_required()
    def post(self):
        current_user_id = int(get_jwt_identity())
        data = request.get_json()
        
        if not all(k in data for k in ['station_id', 'vehicle_details', 'start_time']):
            return {'message': 'Missing reservation data'}, 400

        station = ChargingStation.query.get(data['station_id'])
        if not station:
            return {'message': 'Station not found'}, 404
        
        try:
            start_time = datetime.fromisoformat(data['start_time'].replace('Z', '+00:00'))
        except (ValueError, TypeError):
            return {'message': 'Invalid start time format'}, 400
        
        reservation = Reservation(
            user_id=current_user_id,
            station_id=data['station_id'],
            vehicle_details=data['vehicle_details'],
            start_time=start_time
        )
        db.session.add(reservation)
        db.session.commit()
        return reservation.to_dict(), 201

class ReviewList(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        return reviews, 200

    @jwt_required()
    def post(self):
        current_user_id = int(get_jwt_identity())
        data = request.get_json()

        if not all(k in data for k in ['station_id', 'rating']):
            return {'message': 'Missing review data'}, 400
        
        station = ChargingStation.query.get(data['station_id'])
        if not station:
            return {'message': 'Station not found'}, 404

        review = Review(
            user_id=current_user_id,
            station_id=data['station_id'],
            rating=data['rating'],
            comment=data.get('comment')
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict(), 201

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=data['username']).first()
        if user and check_password_hash(user.password_hash, data['password']):
            token = create_access_token(identity=str(user.id))
            return {
                'token': token,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'is_admin': user.is_admin
                }
            }, 200
        return {'error': 'Invalid credentials'}, 401

class Signup(Resource):
    def post(self):
        data = request.get_json()
        if User.query.filter_by(username=data['username']).first():
            return {'error': 'Username already exists'}, 400
        user = User(
            username=data['username'],
            password_hash=generate_password_hash(data['password']),
            is_admin=data.get('is_admin', False)
        )
        db.session.add(user)
        db.session.commit()
        return {'message': 'User created'}, 201

class UserStations(Resource):
    @jwt_required()
    def get(self):
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        if not user:
            return {"message": "User not found"}, 404
        
        stations = [station.to_dict() for station in user.stations]
        return stations, 200

class UserReservations(Resource):
    @jwt_required()
    def get(self):
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        if not user:
            return {"message": "User not found"}, 404
            
        reservations = [reservation.to_dict() for reservation in user.reservations]
        return reservations, 200

api.add_resource(UserStations, '/api/user/stations')
api.add_resource(UserReservations, '/api/user/reservations')
api.add_resource(Signup, '/api/signup')
api.add_resource(Login, '/api/login')
api.add_resource(StationList, '/api/stations')
api.add_resource(StationDetail, '/api/stations/<int:id>')
api.add_resource(ReservationList, '/api/reservations')
api.add_resource(ReviewList, '/api/reviews')

if __name__ == '__main__':
    app.run(port=5555, debug=True)