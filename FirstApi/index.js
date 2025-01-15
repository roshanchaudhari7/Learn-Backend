// const express = require("express"); //ES5
import express from 'express';
const app = express();
const port = 5001;

app.use(express.json())

//middleware for urlencoded data
// app.use(urlencoded({extended:true}));

// Adds middleware to the application’s request-processing pipeline.
// Middleware is a function that is ALWAYS called before any route is handled.
// Logging Middleware
app.use((req, res, next) => {
  const time = new Date().toTimeString();
  console.log("Time: ", time, "Method:", req.method, ",Path:\"", req.path, "\"");
  next();
})

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.get("/login", (req, res) => {
  return res.send("This is a login page");
})

// Dynamic Routing
app.get('/roadmaps/:id', (req, res) => {
  const id = req.params.id;
  return res.send(`Hello ${id}`);
})

// Query Parameter
app.get("/watch", (req, res)=>{
  const v = req.query.v;
  res.send(`Watching video ${v}`);
})

app.post('/', (req, res) => {
  console.log(req.body);
  res.send("Data Recieved");
})

app.listen(port, () => {
  console.log(`server is running on PORT : ${port}`);
});