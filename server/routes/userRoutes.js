import express from "express";

const User = require("../models/userSchema.js");
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username } = req.body;
    try {
        const user = await User.create({ username });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: "Erreur lors de la création d'un utilisateur ", error: err.message});
    }
});

module.exports = router;