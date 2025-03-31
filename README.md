# Two-Person Chat Application

A real-time chat application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows two users to connect and exchange messages seamlessly.

## Features

- Real-time messaging using WebSocket (Socket.io)
- User authentication with JWT
- Modern UI with Tailwind CSS
- Message delivery status
- Responsive design
- Secure password handling with bcrypt

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- Socket.io-client

### Backend
- Node.js
- Express.js
- Socket.io
- MongoDB
- JWT & bcrypt.js

## Project Structure

```
chat-app/
├── client/             # Frontend React application
│   ├── public/
│   └── src/
└── server/             # Backend Node.js application
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    └── middleware/
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the server directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the client directory with the following variables:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Messages
- GET /api/messages - Get messages between two users
- POST /api/messages - Send a new message

## Contributing
Feel free to submit issues and enhancement requests! 