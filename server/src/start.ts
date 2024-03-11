import express from "express";
import { userRouter } from "./router/userRouter";
import cors from "cors";
import session from "express-session";

export const app = express();

app.use(session({
secret : "TheKey", // TODO Move to separate file. DO NOT UPLOAD TO GITHUB!!!!
resave : false,
saveUninitialized : false,
cookie: { secure: false } // for HTTP; set true for HTTPS
}));
app.use(cors({
origin: true,
credentials : true
}));
app.use(express.json());
app.use("/userRouter", userRouter);


