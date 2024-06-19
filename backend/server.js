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








// const express = require("express");
// const dotenv = require("dotenv");
// const userRoutes = require("./routes/userRoutes");
// const postRoutes = require("./routes/postRoutes");
// const connectDB = require("./config/db");
// const cors = require('cors');
// const chatRoutes = require('./routes/chatRoutes');
// const socketIo = require('socket.io');
// const http = require('http');
// // const notFoundHandler = require("./middleware/notFound");

// const notFound = require("./middleware/notFound");

// const errorHandler = require("./middleware/errorHandler");
// const path = require('path');

// dotenv.config();
// connectDB();

// const app = express();
// const server = http.createServer(app); 

// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:3000", // React app's URL
//     methods: ["GET", "POST"]
//   }
// }); 

// app.use(cors()); 

// app.use(express.json());

// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// app.use("/api/user", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use('/api/chats', chatRoutes);
// // app.use('*', notFoundHandler);

// app.get('/', (req, res) => {
//   console.log('Root URL accessed');
//   res.send('Hello, this is a plain text response from the server!');
// });
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
