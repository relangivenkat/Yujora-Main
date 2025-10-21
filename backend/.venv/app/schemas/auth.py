from pydantic import BaseModel, EmailStr
from typing import Optional

class Msg(BaseModel):
    message: str

class SignupEmailIn(BaseModel):
    email: EmailStr

class SignupIn(BaseModel):
    email: EmailStr
    password: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None

class LoginIn(BaseModel):
    email: EmailStr
    password: str
