import jwt
import requests
from fastapi import HTTPException, Header
from jwt import PyJWKClient

# 🔧 Replace these with your actual Cognito values
COGNITO_REGION = "ap-south-1"
COGNITO_USER_POOL_ID = "ap-south-1_0vdoVYeYp"  # Example format
COGNITO_CLIENT_ID = "your-app-client-id"       # Found in Cognito → App clients

# ✅ This is your Token Signing Key URL (JWKS)
JWKS_URL = "https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_0vdoVYeYp/.well-known/jwks.json"
def verify_token(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = authorization.split(" ")[1]

    try:
        # 🔐 Fetch public key from JWKS
        jwk_client = PyJWKClient(JWKS_URL)
        signing_key = jwk_client.get_signing_key_from_jwt(token)

        # ✅ Decode and verify token
        payload = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            audience=COGNITO_CLIENT_ID,
            options={"verify_exp": True}
        )

        return payload  # Contains user info like sub, email, etc.

    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Token verification failed: {str(e)}")
