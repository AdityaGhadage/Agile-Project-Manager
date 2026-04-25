const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// CREATE task
router.post("/", async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;