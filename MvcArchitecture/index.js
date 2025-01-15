import express from 'express';
const app = express();
const port = 5001;

app.get("/", (req, res) => {
    return res.send("Hello World");
})

app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
})