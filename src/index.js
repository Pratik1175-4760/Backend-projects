import dotenv from "dotenv";
dotenv.config({
  path: './.env'
})
import express from "express"
import connectDB from "./db/index.js";
import { app } from "./app.js";


connectDB()
.then(()=>{
  app.on("error", (error)=>{
    console.log("error: \n", error);
    throw error;
  })
  app.listen(process.env.PORT || 8000, ()=>
  {
    console.log(`Server is running at ${process.env.PORT}`)
  })
})
.catch((err)=>{
  console.log("Mongo bd connection failed: \n", err)
})
