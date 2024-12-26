const express = require("express"); //ES5

const app = express();
const port = 5001;

app.get("/login", (req, res) => {
  console.log("/login api is working");
  return res.send("/login GET api is working");
});

app.listen(port, () => {
  console.log(`server is running on PORT : ${port}`);
});