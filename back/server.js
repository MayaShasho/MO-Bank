import "./config.js"
import "./cronJob.js";

import express from "express"
import userRoutes from "./routes/user.js"
import signupRoute from "./routes/signup.js"
import loginRoute from "./routes/login.js"
import mongoose from "mongoose"
import { refreshToken } from "./controllers/refresh.js"
import cors from 'cors';

const app = express();
app.use(cors());

const port = 8080;

app.use(express.json());

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/user", userRoutes);

app.post("/refresh", refreshToken);

app.listen(port, async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    }
    console.log(`Server listening on port ${port}`);
});
