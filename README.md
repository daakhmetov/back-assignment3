# Assignment 3 - MongoDB CRUD API

## Project Overview
This project migrates a backend application from a local JSON-based storage system to a MongoDB database. It implements a RESTful CRUD API using Node.js, Express, and Mongoose. The application manages ticket data with full Create, Read, Update, and Delete functionality.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- Postman

## Setup and Installation

### Install Dependencies
npm install

### Environment Variables
Create a .env file in the project root and add:
MONGO_URI=your_mongodb_connection_string

### Start the Server
node server.js

The server runs at:
http://localhost:3000

## Database Schema

### Ticket
Each ticket contains the following fields:
- name (String)
- description (String)
- price (Number)
- createdAt (Date)
- updatedAt (Date)

Timestamps are automatically generated using Mongoose.

## API Endpoints

Base URL:
http://localhost:3000

### Create Ticket
POST /objects

Request body:
{
  "name": "Concert Ticket",
  "description": "VIP seating",
  "price": 150
}

### Get All Tickets
GET /objects

### Get Ticket by ID
GET /objects/:id

### Update Ticket
PUT /objects/:id

### Delete Ticket
DELETE /objects/:id

## Validation and Error Handling
POST requests validate that name, description, and price are provided. Appropriate HTTP status codes are returned for errors and successful operations.

## Testing
All endpoints were tested using Postman to verify correct interaction with MongoDB.

## Notes
The /objects endpoint represents ticket data. MongoDB replaces the JSON-based storage used in Assignment 1.

## Author
Your Name
