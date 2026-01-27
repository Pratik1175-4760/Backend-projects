import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// This are all middlewares which are used for handling configurations between server and requests

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))
// This is used for allowing requests and to provide response to and from desired web page url only like from www.example.com is our website so only from this not from google or amazon etc.

app.use(express.json({limit:"16kb"}))
// TO allow json format requests from req and we can put limit of the json file 

app.use(express.urlencoded({extended: true, limit: "16kb"}))
// As url can be encoded in many formats so we tell express to allow or understand url of different formats

app.use(express.static("public")) // To use this folder for all wherever needed

app.use(cookieParser()) // To parse cookies of browsers

// import routes
import userRouter from './routes/user.routes.js'

app.use("/api/v1/users", userRouter)

// declare routes


export {app} 