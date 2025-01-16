import express from 'express'
import router from './routes/route.js'
import logMW from './middleware/logMiddleware.js';
const app = express();
const port = 5001;
app.use(express.json())

app.use(logMW)
app.use('/', router)

app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
})
