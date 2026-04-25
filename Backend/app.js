const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");


require("./models/models");

const projectRoutes = require("./routes/projectRoutes");
const storyRoutes = require("./routes/storyRoutes");
const taskRoutes = require("./routes/taskRoutes");

require("./jobs/reminderJob");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/users", require("./routes/userRoutes"));
app.use("/projects", projectRoutes);
app.use("/stories", storyRoutes);
app.use("/tasks", taskRoutes);

// DB Sync
sequelize.sync().then(() => {
  app.listen(5000, () => console.log("Server running on port 5000"));
});