# Two-Person Chat Application

A real-time chat application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows two users to connect and exchange messages seamlessly.

## Features

- Real-time messaging using WebSocket (Socket.io)
- User authentication with JWT
- Modern UI with Tailwind CSS
- Message delivery status
- Responsive design
- Secure password handling with bcrypt
- Active user status indicators
- User typing indicators

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios for HTTP requests
- Socket.io-client for real-time communication
- React Context API for state management

### Backend
- Node.js
- Express.js
- Socket.io for WebSocket functionality
- MongoDB for data storage
- JWT for authentication
- bcrypt.js for password hashing

## Project Structure

```
chat-app/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   └── src/
│       ├── components/     # UI components
│       ├── context/        # React Context providers
│       ├── App.js          # Main application component
│       └── index.js        # Entry point
├── server/                 # Backend Node.js application
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Express middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   └── server.js           # Main server file
└── package.json            # Root package.json for scripts
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install-all
   ```

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Create a `.env` file in the server directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   CLIENT_URL=http://localhost:3000
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Create a `.env` file in the client directory with the following variables:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Running the Application
You can run both frontend and backend concurrently using:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user profile

### Messages
- GET /api/messages/:receiverId - Get messages between current user and receiver
- POST /api/messages - Send a new message

### Users
- GET /api/users - Get all users
- GET /api/users/:userId - Get user by ID

## Socket.io Events

### Client Emits
- `join` - Join a room with the user's ID
- `userActive` - Notify server that user is active
- `getActiveUsers` - Request list of active users
- `sendMessage` - Send a message to another user
- `userInactive` - Notify server that user is no longer active

### Server Emits
- `activeUsers` - Send list of currently active users
- `receiveMessage` - Deliver a message to a recipient

## Scripts

- `npm run build` - Build the client and install dependencies
- `npm start` - Start the server in production mode
- `npm run dev:server` - Start the server in development mode
- `npm run dev:client` - Start the client in development mode
- `npm run dev` - Run both server and client concurrently in development mode
- `npm run install-all` - Install dependencies for root, client, and server

## Deployment

### Building for Production
```bash
npm run build
```

### Starting in Production
```bash
npm start
```

### Complete Deployment Guide

#### Database Setup
1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster and database
3. Create a database user with read/write permissions
4. Get your MongoDB connection string from the Atlas dashboard
5. Replace `<username>`, `<password>`, and `<dbname>` in the connection string

#### Backend Deployment (Railway)
1. Create a Railway account at https://railway.app/
2. Install Railway CLI: `npm i -g @railway/cli`
3. Login to Railway: `railway login`
4. Navigate to the project root: `cd chat-app`
5. Initialize Railway: `railway init`
6. Link to your project: `railway link`
7. Deploy the server: `railway up`
8. Configure environment variables in Railway dashboard or using CLI:
   ```bash
   railway variables set MONGODB_URI="your_mongodb_uri"
   railway variables set JWT_SECRET="your_secret_key"
   railway variables set PORT="5000"
   railway variables set CLIENT_URL="your_frontend_url"
   ```
9. Get your deployed backend URL from the Railway dashboard

### Alternative: Set variables through the Railway dashboard
1. Go to your project in the Railway dashboard
2. Click on the "Variables" tab
3. Add each variable with its value

#### Frontend Deployment (Netlify)
1. Create a Netlify account at https://www.netlify.com/
2. Install Netlify CLI: `npm install -g netlify-cli`
3. Login to Netlify: `netlify login`
4. Navigate to the client directory: `cd client`
5. Create a `.env.production` file with:
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app
   ```
6. Build the frontend: `npm run build`
7. Deploy to Netlify: `netlify deploy --prod`
8. Configure environment variables in Netlify dashboard:
   - `REACT_APP_API_URL`: Your backend URL from Railway

#### Alternative Deployment (Render)
1. Create a Render account at https://render.com/
2. Create a new Web Service for the backend:
   - Connect your GitHub repository
   - Set the root directory as `/server`
   - Set the build command: `npm install`
   - Set the start command: `npm start`
   - Add environment variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A secure random string
     - `PORT`: 5000
     - `CLIENT_URL`: Your frontend URL
3. Create a new Static Site for the frontend:
   - Connect your GitHub repository
   - Set the root directory as `/client`
   - Set the build command: `npm install && npm run build`
   - Set the publish directory: `build`
   - Add environment variables:
     - `REACT_APP_API_URL`: Your backend URL from Render

#### CORS Configuration
Ensure your backend has proper CORS configuration allowing requests from your frontend domain:
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
```

#### Socket.io Configuration
Ensure your Socket.io configuration in server.js has the correct CORS settings:
```javascript
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});
```

## Contributing
Feel free to submit issues and enhancement requests! 

## License
ISC 