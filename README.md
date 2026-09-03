# Syntecxhub_Project1 - User Authentication System

This is a REST API built during my Backend Development Internship at @SyntecXhub.

## Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- bcrypt
- jsonwebtoken (JWT)
- Postman for testing

## Features
- User Signup with password hashing using bcrypt
- User Login with JWT token generation
- Protected routes using JWT middleware
- CRUD operations for Users
- Error handling for invalid credentials and token expiry

## API Endpoints

### Auth
`POST /api/signup` - Register new user
`POST /api/login` - Login and get JWT token

### User
`GET /api/users` - Get all users [Protected]
`GET /api/users/:id` - Get user by ID [Protected]
`PUT /api/users/:id` - Update user [Protected]
`DELETE /api/users/:id` - Delete user [Protected]

## How to Run
1. Clone the repo
2. `npm install`
3. Create `.env` file with MONGO_URI and JWT_SECRET
4. `npm start`

## GitHub Link
https://github.com/Ananyajsalian/syntecxhub-user-crud
