import expresss from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./Routes/authRoutes.js";
const app = expresss();
const port = process.env.PORT || 3000;
connectDB();

app.use(expresss.json());
app.use(cookieParser());
app.use(cors({credentials: true}));

// API End-Points 
app.use("/api/auth", authRouter);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
