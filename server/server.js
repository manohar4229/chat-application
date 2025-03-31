const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chat-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Active Users Storage
const activeUsers = new Map();

// Debug endpoint to check active users
app.get('/api/active-users', (req, res) => {
  res.json(Array.from(activeUsers.values()));
});

// Socket.io Connection
io.on('connection', (socket) => {
  console.log('New client connected with ID:', socket.id);

  // User joins their personal room
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  // Register active user
  socket.on('userActive', ({ userId, username }) => {
    console.log(`Registering active user: ${username} (${userId})`);
    
    // Store user info with socket id
    activeUsers.set(socket.id, { userId, username });

    // Emit active users list to all clients
    const activeUsersList = Array.from(activeUsers.values());
    console.log('Active users list:', activeUsersList);
    io.emit('activeUsers', activeUsersList);
  });

  // Handle request for active users
  socket.on('getActiveUsers', () => {
    const activeUsersList = Array.from(activeUsers.values());
    console.log('Sending active users on request:', activeUsersList);
    socket.emit('activeUsers', activeUsersList);
  });

  // Send message
  socket.on('sendMessage', (message) => {
    io.to(message.receiverId).emit('receiveMessage', message);
    console.log('Message sent:', message);
  });

  // User becomes inactive
  socket.on('userInactive', (userId) => {
    console.log(`User ${userId} marked as inactive`);
    activeUsers.delete(socket.id);
    io.emit('activeUsers', Array.from(activeUsers.values()));
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    // Remove user from active users
    if (activeUsers.has(socket.id)) {
      const user = activeUsers.get(socket.id);
      activeUsers.delete(socket.id);
      console.log(`User ${user.username} (${user.userId}) disconnected and is now inactive`);
      io.emit('activeUsers', Array.from(activeUsers.values()));
    } else {
      console.log('Unknown client disconnected:', socket.id);
    }
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 