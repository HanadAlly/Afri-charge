from server.config import app, db
from server.models import User, ChargingStation, Reservation, Review
from datetime import datetime

with app.app_context():
    db.session.query(Review).delete()
    db.session.query(Reservation).delete()
    db.session.query(ChargingStation).delete()
    db.session.query(User).delete()
    db.session.commit()

    user1 = User(username='alice', password_hash='hashedpass1', is_admin=True)
    user2 = User(username='bob', password_hash='hashedpass2')
    db.session.add_all([user1, user2])
    db.session.commit()

    station1 = ChargingStation(name='Nairobi Station', location='Nairobi CBD', price=5.0, type='Fast', owner_id=user1.id)
    station2 = ChargingStation(name='Kisumu Station', location='Kisumu City', price=4.0, type='Slow', owner_id=user2.id)
    db.session.add_all([station1, station2])
    db.session.commit()

    reservation1 = Reservation(user_id=user1.id, station_id=station1.id, vehicle_details='Tesla Model 3', start_time=datetime(2025, 6, 26, 10, 0))
    db.session.add(reservation1)
    db.session.commit()

    review1 = Review(user_id=user2.id, station_id=station1.id, rating=4, comment='Great service!')
    db.session.add(review1)
    db.session.commit()

    print("Seed data generated successfully!")
