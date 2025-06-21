const express = require("express");
const app = express();
const PORT = 5001;

app.get('/', (req, res) => {
    return res.send("Server app is running");
})

app.use(express.urlencoded({ extended: true }));

app.get('/get-form', (req, res) => {
    return res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
            </head>
            <body>
                <h2>Registration Form</h2>
                <form action="/api/form_submit" method="POST">
                    <div>
                        <label for="username">Enter User Name: </label>
                        <input type="text" name="username" />
                    </div>
                    <div>
                        <label for="email">Enter Email: </label>
                        <input type="text" name="email" />
                    </div>
                    <div>
                        <label for="password">Enter Password: </label>
                        <input type="text" name="password" />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </body>
        </html>
    `)
})

app.post("/api/form_submit", (req, res) => {
    console.log(req.body);
    return res.send(req.body);
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})

