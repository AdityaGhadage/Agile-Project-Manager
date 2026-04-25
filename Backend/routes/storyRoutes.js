const express = require("express");
const router = express.Router();

const controller = require("../controllers/storyController");

// Create Story
router.post("/", controller.createStory);

// Get All Stories
router.get("/", controller.getStories);

// Update Story Status
router.put("/:id/status", controller.updateStoryStatus);

module.exports = router;