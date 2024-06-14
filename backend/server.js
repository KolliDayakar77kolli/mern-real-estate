const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const connectDB = require("./config/db");
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const socketIo = require('socket.io');
const http = require('http');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // Create HTTP server

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your React app's URL
    methods: ["GET", "POST"]
  }
}); // Attach socket.io to HTTP server with CORS configuration

// CORS Configuration
app.use(cors()); // Use cors middleware

// Other middleware and routes
app.use(express.json());

// Middleware to attach io to the request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use('/api/chats', chatRoutes);

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id); // Log the socket id of the connected client

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id); // Log the socket id of the disconnected client
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}...`);
});