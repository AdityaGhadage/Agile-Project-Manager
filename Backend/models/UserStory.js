const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Project = require("./Project");

const UserStory = sequelize.define("UserStory", {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  status: DataTypes.STRING
});

Project.hasMany(UserStory);
UserStory.belongsTo(Project);

UserId: {
  type: DataTypes.INTEGER
}
module.exports = UserStory;