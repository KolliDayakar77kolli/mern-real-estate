const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const connectDB = require("./config/db");
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const socketIo = require('socket.io');
const http = require('http');
const notFoundHandler = require("./middleware/notFound");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); 

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // React app's URL
    methods: ["GET", "POST"]
  }
}); 

app.use(cors()); 

app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use('/api/chats', chatRoutes);
app.use('*', notFoundHandler);

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id); 

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id); 
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}...`);
});