const cron = require("node-cron");
const Task = require("../models/Task");

cron.schedule("* * * * *", async () => {
  const tasks = await Task.findAll();

  tasks.forEach(task => {
    if (task.dueDate && new Date(task.dueDate) < new Date()) {
      console.log(`Reminder: Task "${task.title}" is overdue`);
    }
  });
});