const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const UserStory = require("./UserStory");

const Task = sequelize.define("Task", {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  status: DataTypes.STRING,
  dueDate: DataTypes.DATE
});

UserStory.hasMany(Task);
Task.belongsTo(UserStory);

module.exports = Task;