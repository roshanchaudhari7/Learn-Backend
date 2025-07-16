const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./userModel");
require('dotenv').config();
const PORT = process.env.PORT;

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Mongodb connected successfully");
    }).catch((err) => {
        console.log(err);
    })

app.get('/', (req, res) => {
    return res.send("Server app is running");
})

app.use(express.json());
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

app.post("/api/form_submit", async (req, res) => {
    console.log(req.body);
    const nameC = req.body.username;
    const emailC = req.body.email;
    const passwordC = req.body.password;

    const userObj = new userModel({
        username: nameC,
        email: emailC,
        password: passwordC
    })
    console.log(userObj);

    try {
        const userDb = await userObj.save();
        return res.send({
            status: 201,
            message: "user created successfully",
            data: userDb
        });
    } catch (error) {
        return res.send({
            status: 500,
            message: "Database error",
            error: error
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})

