const express = require("express");
const router = express.Router();
const controller = require("../controllers/projectController");

router.post("/", controller.createProject);
router.get("/", controller.getProjects);

// Delete Project
router.delete("/:id", controller.deleteProject);

//update project
router.put("/:id", controller.updateProject);

module.exports = router;