const Project = require("../models/Project");
const UserStory = require("../models/UserStory");
const Task = require("../models/Task");
const User = require("../models/User");

// Create Project
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Project name is required"
      });
    }

    const project = await Project.create({ name, description });

    res.status(201).json({
      message: "Project created successfully",
      data: project
    });

  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err.message
    });
  }
};

// Get Projects with hierarchy
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: {
        model: UserStory,
        include: [Task, User]
      }
    });

    res.status(200).json(projects);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    await Project.destroy({ where: { id } });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    project.name = name || project.name;
    project.description = description || project.description;

    await project.save();

    res.status(200).json({
      message: "Project updated successfully",
      data: project
    });

  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err.message
    });
  }
};