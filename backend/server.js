const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const connectDB = require("./config/db");
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const socketIo = require('socket.io');
const http = require('http');
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const path = require('path');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); 

const io = socketIo(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ["https://ratna-real-estate.onrender.com", "https://www.ratnarealestate.com"]
      : "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Debugging middleware to log requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    console.log(`CORS request from origin: ${origin}`);
    const allowedOrigins = [
      "https://ratna-real-estate.onrender.com",
      "https://www.ratnarealestate.com"
    ];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use('/api/chats', chatRoutes);

// .............Deployment...............
const __dirname1 = path.resolve();
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname1, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is Running Successfully..!');
  });
}
// .............Deployment...............

app.use(notFound);
app.use(errorHandler);

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














// First Mine
// const express = require("express");
// const dotenv = require("dotenv");
// const userRoutes = require("./routes/userRoutes");
// const postRoutes = require("./routes/postRoutes");
// const connectDB = require("./config/db");
// const cors = require('cors');
// const chatRoutes = require('./routes/chatRoutes');
// const socketIo = require('socket.io');
// const http = require('http');
// const notFound = require("./middleware/notFound");
// const errorHandler = require("./middleware/errorHandler");
// const path = require('path');

// dotenv.config();
// connectDB();

// const app = express();
// const server = http.createServer(app); 

// const io = socketIo(server, {
//   cors: {
//     origin: process.env.NODE_ENV === 'production' 
//       ? "https://ratna-real-estate.onrender.com"
//       : "http://localhost:3000",
//     methods: ["GET", "POST"]
//   }
// });

// // Middleware
// app.use(cors({
//   origin: process.env.NODE_ENV === 'production' 
//     ? "https://ratna-real-estate.onrender.com"
//     : "http://localhost:3000",
// }));

// app.use(express.json());

// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// app.use("/api/user", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use('/api/chats', chatRoutes);

// // .............Deployment...............
// const __dirname1 = path.resolve();
// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static(path.join(__dirname1, "/frontend/build")));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname1, 'frontend', 'build', 'index.html'));
//   });
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is Running Successfully..!');
//   });
// }
// // .............Deployment...............

// app.use(notFound);
// app.use(errorHandler);

// io.on('connection', (socket) => {
//   console.log('New client connected:', socket.id); 

//   socket.on('disconnect', () => {
//     console.log('Client disconnected:', socket.id); 
//   });
// });

// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => {
//   console.log(`Server running on PORT ${PORT}...`);
// });