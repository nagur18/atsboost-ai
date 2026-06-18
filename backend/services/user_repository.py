from sqlalchemy.orm import Session

from models.user import User


def get_user_by_clerk_id(db: Session, clerk_id: str):
    if not clerk_id:
        return None
    return db.query(User).filter(User.clerk_id == clerk_id).first()


def get_or_create_user(
    db: Session,
    clerk_id: str | None,
    email: str | None = None,
    name: str | None = None,
):
    """Return the User for a Clerk id, creating one on first sight.

    Returns None when no clerk_id is supplied (anonymous usage) so callers can
    still persist rows with a null user_id.
    """
    if not clerk_id:
        return None

    user = get_user_by_clerk_id(db, clerk_id)
    if user:
        # Backfill profile fields if they were previously unknown.
        updated = False
        if email and not user.email:
            user.email = email
            updated = True
        if name and not user.name:
            user.name = name
            updated = True
        if updated:
            db.commit()
            db.refresh(user)
        return user

    user = User(clerk_id=clerk_id, email=email, name=name)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
