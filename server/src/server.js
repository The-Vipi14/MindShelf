import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// connect DB
connectDB();

// start server
app.listen(PORT, () => {
  console.log(`MindShelf server running on port ${PORT} 🚀`);
});
