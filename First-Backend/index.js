import express from "express"
import { data } from "./data.js";
const app = express()
const port = 5001;

app.get('/data', (req, res) => {
  res.send({ userData : data })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
