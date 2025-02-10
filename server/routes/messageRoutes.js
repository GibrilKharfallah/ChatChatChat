import express from "express";
import Message from "../models/messageShema.js";
import connectDB from "../config/db.js"

const router = express.Router();

router.route("/").get((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    connectDB.then(db => {
        Message.find({}).then(msg => {
            res.json(msg);
        });
    });
});

export default router;