# School Cafeteria System API

A RESTful Node.js / Express API for managing a school cafeteria food ordering system.

This project includes food item management, student orders, attendant authentication, and sales reporting using MongoDB and JWT.

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- `express-validator` for request validation
- `cors` for cross-origin requests
- `dotenv` for environment configuration

## Features

- Register and login staff with JWT authentication
- Public food menu endpoints with search, pagination, and availability filters
- Create and manage orders
- Update order status
- Sales reporting for completed orders
- Basic student and attendant data handling

## Project Structure

- `server.js` — app entry point and route registration
- `config/db.js` — MongoDB connection helper
- `routes/` — route definitions for auth, food, orders, students, attendants, and reports
- `controllers/` — request handlers and business logic
- `models/` — Mongoose schemas for `FoodItem`, `Order`, `Student`, and `CafeteriaAttendant`
- `middlewares/` — authentication and validation middleware

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with at least:

   ```env
   MONGO_URI=<your-mongo-connection-string>
   JWT_SECRET=<your-jwt-secret>
   PORT=9000
   ```

3. Start the application:

   ```bash
   npm start
   ```

4. Open the API:

   - http://localhost:9000/

## Environment Variables

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret key for signing JWT tokens
- `PORT` — optional port to run the server (default: `9000`)

## API Endpoints

### Authentication

- `POST /api/auth/register` — register new staff
- `POST /api/auth/login` — login staff and receive JWT

### Food Items

- `GET /api/food` — get all food items
  - Query params: `page`, `limit`, `search`, `available`
- `GET /api/food/:id` — get a single food item by ID
- `POST /api/food` — create a food item (protected)
- `PUT /api/food/:id` — update a food item (protected)
- `DELETE /api/food/:id` — delete a food item (protected)

### Orders

- `POST /api/orders` — create an order (protected)
- `GET /api/orders` — list all orders
- `GET /api/orders/:id` — get order details by ID
- `PUT /api/orders/:id/status` — update order status (protected)

### Reports

- `GET /api/reports/sales` — get completed sales totals for today and the last 7 days (protected)

## Data Models

### FoodItem

- `name` — string
- `price` — number
- `category` — string
- `available` — boolean
- `createdAt` — date

### Order

- `student` — ObjectId of `Student`
- `items` — array of ObjectId references to `FoodItem`
- `totalPrice` — number
- `status` — enum: `Pending`, `In Progress`, `Completed`, `Cancelled`
- `orderedBy` — ObjectId of `CafeteriaAttendant`
- `orderDate` — date
- `readyTime` — date

### Student

- `name` — string
- `email` — string
- `studentId` — string
- `createdAt` — date

### CafeteriaAttendant

- `name` — string
- `staffId` — string
- `createdAt` — date

## Notes

- `routes/studentRoutes.js` is present in the project but currently contains no route definitions.
- `routes/attendantRoutes.js` currently only defines a login route and may require additional implementation.
- The `authController` uses `email` and password fields for login/register, while validation currently validates `staffId` and password.

## Running Locally

- Default app port: `9000`
- Start request:
  - `npm start`

## License

This project currently has no license specified.
