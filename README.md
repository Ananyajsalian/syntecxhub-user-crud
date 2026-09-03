# Syntecxhub_Project1 - User CRUD API

This is a REST API built during my Backend Development Internship at @SyntecXhub.

## Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Postman for testing

## Features
- Create a new user - POST
- Get all users - GET
- Get user by ID - GET
- Update user details - PUT
- Delete user - DELETE
- Input validation with express-validator
- Proper HTTP status codes and error handling

## API Endpoints

`POST /api/users`      - Create new user
`GET /api/users`       - Get all users
`GET /api/users/:id`   - Get user by ID
`PUT /api/users/:id`   - Update user by ID
`DELETE /api/users/:id`- Delete user by ID

## How to Run
1. Clone the repo
2. `npm install`
3. Create `.env` file in root with:

MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000

4. `npm start`

## Testing
Use Postman to test all endpoints.
Example body for POST/PUT:
```json
{
  "name": "Ananya",
  "email": "ananya@test.com",
  "age": 20
}
```
## GitHub Link
https://github.com/Ananyajsalian/syntecxhub-user-crud

