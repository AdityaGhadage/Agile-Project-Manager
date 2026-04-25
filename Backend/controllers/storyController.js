const UserStory = require("../models/UserStory");

//  Create Story
exports.createStory = async (req, res) => {
    try {
        const { title, description, status, ProjectId, UserId } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Story title is required"
            });
        }

        const story = await UserStory.create({
            title,
            description,
            status: status || "Todo",
            ProjectId,
            UserId
        });

        res.status(201).json({
            message: "Story created successfully",
            data: story
        });

    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};

// Get All Stories
exports.getStories = async (req, res) => {
    try {
        const stories = await UserStory.findAll();

        res.status(200).json(stories);

    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};

// Update Story Status
exports.updateStoryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validation
        if (!status) {
            return res.status(400).json({
                message: "Status is required"
            });
        }

        const validStatuses = ["Todo", "In Progress", "Completed"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status value"
            });
        }

        const story = await UserStory.findByPk(id);

        if (!story) {
            return res.status(404).json({
                message: "Story not found"
            });
        }

        story.status = status;
        await story.save();

        res.status(200).json({
            message: "Story status updated successfully",
            data: story
        });

    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};