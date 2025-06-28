from server.app import app, db
from server.models import User, ChargingStation, Reservation, Review
from datetime import datetime
from werkzeug.security import generate_password_hash

with app.app_context():
    print("Deleting old data...")
    Review.query.delete()
    Reservation.query.delete()
    ChargingStation.query.delete()
    User.query.delete()
    db.session.commit()

    print("Creating new users...")
    admin_user = User(username='admin', password_hash=generate_password_hash('admin'), is_admin=True)
    user2 = User(username='bob', password_hash=generate_password_hash('password456'))
    db.session.add_all([admin_user, user2])
    db.session.commit()

    print("Creating new stations with GPS coordinates...")
    station1 = ChargingStation(name='Sarit Centre EV Point', location='-1.2588, 36.8017', price=50.0, type='AC_Level_2', owner_id=admin_user.id, is_available=True)
    station2 = ChargingStation(name='Mombasa Rd SuperCharger', location='-1.3323, 36.8884', price=65.0, type='SuperCharger', owner_id=admin_user.id, is_available=True)
    station3 = ChargingStation(name='Naivasha Getaway Charging', location='-0.7167, 36.4333', price=40.0, type='DC_Fast_Charger', owner_id=admin_user.id, is_available=False)
    station4 = ChargingStation(name='Kisumu City Hub', location='-0.0917, 34.7680', price=48.0, type='AC_Level_2', owner_id=admin_user.id, is_available=True)
    station5 = ChargingStation(name='Lagos Solar Hub', location='6.4654, 3.4064', price=200.0, type='SuperCharger', owner_id=user2.id, is_available=True)
    station6 = ChargingStation(name='Cape Town Autonomous', location='-33.9249, 18.4241', price=3.50, type='DC_Fast_Charger', owner_id=user2.id, is_available=True)
    db.session.add_all([station1, station2, station3, station4, station5, station6])
    db.session.commit()

    print("Creating a reservation...")
    reservation1 = Reservation(user_id=user2.id, station_id=station1.id, vehicle_details='Tesla Model Y', start_time=datetime(2025, 6, 28, 14, 0))
    db.session.add(reservation1)
    db.session.commit()

    print("Creating a review...")
    review1 = Review(user_id=user2.id, station_id=station2.id, rating=5, comment='Amazing speed!')
    db.session.add(review1)
    db.session.commit()

    print("Seed data generated successfully!")