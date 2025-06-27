from flask import request
from flask_restful import Resource, Api
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
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
        
        data = request.get_json()
        station = ChargingStation(
            name=data['name'], location=data['location'], is_available=data.get('is_available', True),
            price=data['price'], type=data['type'], owner_id=data['owner_id']
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
        
        station = ChargingStation.query.get_or_404(id)
        data = request.get_json()
        for key, value in data.items(): setattr(station, key, value)
        db.session.commit()
        return station.to_dict(), 200
    @jwt_required()
    def delete(self, id):
       
        station = ChargingStation.query.get_or_404(id)
        db.session.delete(station)
        db.session.commit()
        return '', 204

class ReservationList(Resource):
    def get(self):
        reservations = [res.to_dict() for res in Reservation.query.all()]
        return reservations, 200
    @jwt_required()
    def post(self):
        
        data = request.get_json()
        reservation = Reservation(
            user_id=data['user_id'], station_id=data['station_id'],
            vehicle_details=data['vehicle_details'], start_time=datetime.strptime(data['start_time'], '%Y-%m-%d %H:%M:%S')
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
        
        data = request.get_json()
        review = Review(
            user_id=data['user_id'], station_id=data['station_id'],
            rating=data['rating'], comment=data.get('comment')
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
            return {'token': token}, 200
        return {'error': 'Invalid credentials'}, 401

class Signup(Resource):
    #... no changes needed in Signup ...
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


api.add_resource(Signup, '/api/signup')
api.add_resource(Login, '/api/login')
api.add_resource(StationList, '/api/stations')
api.add_resource(StationDetail, '/api/stations/<int:id>')
api.add_resource(ReservationList, '/api/reservations')
api.add_resource(ReviewList, '/api/reviews')

if __name__ == '__main__':
    app.run(port=5555, debug=True)