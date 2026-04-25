const Project = require("./Project");
const UserStory = require("./UserStory");
const Task = require("./Task");
const User = require("./User");

// Project → UserStory
Project.hasMany(UserStory);
UserStory.belongsTo(Project);

// UserStory → Task
UserStory.hasMany(Task);
Task.belongsTo(UserStory);

// User → UserStory (Assignment)
User.hasMany(UserStory);
UserStory.belongsTo(User);

module.exports = {
  Project,
  UserStory,
  Task,
  User
};