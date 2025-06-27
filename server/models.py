from .config import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    stations = db.relationship('ChargingStation', backref='owner', lazy=True)
    reservations = db.relationship('Reservation', backref='user', lazy=True)
    reviews = db.relationship('Review', backref='user', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'is_admin': self.is_admin
        }

    def __repr__(self): return f'<User {self.username}>'

class ChargingStation(db.Model):
    __tablename__ = 'charging_stations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    is_available = db.Column(db.Boolean, default=True)
    price = db.Column(db.Float, nullable=False)
    type = db.Column(db.String(50), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    reservations = db.relationship('Reservation', backref='station', lazy=True)
    reviews = db.relationship('Review', backref='station', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'is_available': self.is_available,
            'price': self.price,
            'type': self.type,
            'owner_id': self.owner_id
        }

    def __repr__(self): return f'<ChargingStation {self.name}>'

class Reservation(db.Model):
    __tablename__ = 'reservations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    station_id = db.Column(db.Integer, db.ForeignKey('charging_stations.id'), nullable=False)
    vehicle_details = db.Column(db.String(200), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'station_id': self.station_id,
            'vehicle_details': self.vehicle_details,
            'start_time': self.start_time.isoformat()
        }

    def __repr__(self): return f'<Reservation User {self.user_id} at Station {self.station_id}>'

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    station_id = db.Column(db.Integer, db.ForeignKey('charging_stations.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(500))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'station_id': self.station_id,
            'rating': self.rating,
            'comment': self.comment
        }

    def __repr__(self): return f'<Review by User {self.user_id} for Station {self.station_id}>'