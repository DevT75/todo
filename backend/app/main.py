# from fastapi import FastAPI,Depends
# from fastapi.middleware.cors import CORSMiddleware
# from .routers import todo, user

# app = FastAPI()

# # Add CORS middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000","*"],  # Change this to your frontend URL
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(todo.router, prefix="/todos", tags=["todos"])
# app.include_router(user.router, prefix="/users", tags=["users"])

# @app.get("/")
# async def root():
#     return {"message": "Welcome to the TODO app"}


from fastapi import FastAPI,Depends
from fastapi.middleware.cors import CORSMiddleware

from backend.app.auth import get_current_user
from .routers import todo, user

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","*"],  # Change this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todo.router, prefix="/todos", tags=["todos"])
app.include_router(user.router, prefix="/users", tags=["users"])

@app.get("/")
async def root():
    return {"message": "Welcome to the TODO app"}

# def custom_openapi():
#     # if not app.openapi_schema:
#     openapi_schema = app.openapi()
#     openapi_schema["components"]["securitySchemes"] = {
#         "OAuth2Password": {
#             "type": "oauth2",
#             "flows": {
#                 "password": {
#                     "tokenUrl": "/users/token",
#                     "scopes": {}
#                 }
#             }
#         }
#     }
#     openapi_schema["security"] = [{"OAuth2Password": []}]
#     app.openapi_schema = openapi_schema
#     # return app.openapi_schema

# custom_openapi()
