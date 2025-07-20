const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./userModel");
const session = require("express-session");
const mongoDbSession = require("connect-mongodb-session")(session);
require("dotenv").config();
const PORT = process.env.PORT || 5001;
const app = express();

const store = new mongoDbSession({
    uri: process.env.MONGO_URI,
    collection: "sessions",
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: "This is a session Authentication",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Mongodb connected successfully");
    }).catch((err) => {
        console.log(err);
    })

app.get("/", (req, res) => {
    return res.send("Server is running");
})

app.get("/register", (req, res) => {
    return res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
            </head>
            <body>
                <h2>Registration Form</h2>
                <form action="/register" method="POST">
                    <div>
                        <label for="name">Your Name: </label>
                        <input type="text" name="name" />
                    </div>
                    <div>
                        <label for="email">Your Email: </label>
                        <input type="text" name="email" />
                    </div>
                    <div>
                        <label for="password">Password: </label>
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

app.post("/register", async (req, res) => {
    console.log(req.body);

    const nameU = req.body.name;
    const emailU = req.body.email;
    const passwordU = req.body.password;

    const userObj = new userModel({
        name: nameU,
        email: emailU,
        password: passwordU
    })

    try {
        const userDb = await userObj.save();
        return res.send({
            status: 201,
            message: "user created successfully",
            data: userDb,
        });
    } catch (error) {
        return res.send({
            status: 500,
            message: "Database error",
            error: error,
        });
    }
})

app.get('/login', (req, res) => {
    return res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
            </head>
            <body>
                <h2>Login Form</h2>
                <form action="/login" method="POST">
                    <div>
                        <label for="email">Your Email: </label>
                        <input type="text" name="email" />
                    </div>
                    <div>
                        <label for="password">Password: </label>
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

app.post('/login', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
        const userDb = await userModel.findOne({ email: email });

        if (!userDb) {
            return res.send("User not found, please register first");
        }

        if (password !== userDb.password) {
            return res.send("Password does not matched");
        }

        console.log(userDb);
        console.log(req.session);
        req.session.isAuth = true;
        console.log(req.session);

        return res.send({
            status: 200,
            message: "Login Successfull",
        });
    } catch (error) {
        return res.send({
            status: 500,
            message: "Database error",
            error: error,
        });
    }

})

app.get('/products', (req, res) => {
    console.log(req.session);
    if (req.session.isAuth) {
        return res.send("All Products List");
    } else {
        return res.send("Session expired, please login again");
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
})