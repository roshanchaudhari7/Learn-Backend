import express from 'express'
import watch from '../controllers/routeController.js';
const router = express.Router();

router.get('/', (req, res) => {
    return res.send("Hello World");
})

router.get("/login", (req, res) => {
    return res.send("This is a login page");
})

router.get('/roadmaps/:id', (req, res) => {
    const id = req.params.id;
    return res.send(`Hello ${id}`);
})

router.get("/watch", watch)

export default router;