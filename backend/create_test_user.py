import bcrypt

from app.database import SessionLocal, engine, Base
from app.models import User


# Create database tables
Base.metadata.create_all(bind=engine)


db = SessionLocal()


existing_user = db.query(User).filter(
    User.email == "ankit@test.com"
).first()


if existing_user:

    print("Test user already exists.")

else:

    password_hash = bcrypt.hashpw(
        b"123456",
        bcrypt.gensalt()
    ).decode("utf-8")

    user = User(
        name="Ankit",
        email="ankit@test.com",
        password_hash=password_hash
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    print("Test user created successfully.")
    print("ID:", user.id)
    print("Name:", user.name)
    print("Email:", user.email)


db.close()