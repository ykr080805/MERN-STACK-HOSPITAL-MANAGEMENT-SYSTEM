import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";  // default import
import userRouter from "./router/userRouter.js";        // fixed import, default import
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import appointmentRouter from "./router/appointmentRouter.js"; 
const app = express();

config({ path: "./config/config.env" });

// Middleware to enable Cross-Origin Resource Sharing, so your frontend (hosted elsewhere) can access your API.
// CORS -- Cross-Origin Resource Sharing.

app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.BACKEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // credential can also be sent as reqs
}));
app.use(cookieParser());
app.use(express.json()); // middle ware for json requests
app.use(express.urlencoded({ extended: true })); // middle ware to access forms
app.use(fileUpload({
    useTempFiles: true,     
    tempFileDir: "/tmp/",
}));
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

dbConnection();
app.use(errorMiddleware);
export default app;
