const express = require("express");
const dotenv = require("dotenv");
const postRoutes = require("./routes/postRoutes");
const connectDB = require("./config/db");
const cors = require('cors');

const app = express();

dotenv.config();
connectDB();
app.use(cors()); 
app.use(express.json()); 

app.use("/api/posts", postRoutes);

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server running on PORT ${PORT}...`.yellow.bold));