import express from "express"
import userRoutes from "./routes/user.js"
import signupRoute from "./routes/signup.js"
import loginRoute from "./routes/login.js"
import mongoose from "mongoose"
import { refreshToken } from "./controllers/refresh.js"
import dotenv from "dotenv"
dotenv.config({ path: "./.env" })

const app = express()
const port = 4000

app.use(express.json())
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/user", userRoutes);
app.post("/refresh", refreshToken);


app.listen(port, () => {
    mongoose.connect(process.env.MONGODB_CONNECTION)
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.log(err));
    console.log(`Server listening on port ${port}`)
})
