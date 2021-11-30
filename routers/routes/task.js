const express = require("express");
const taskRouter = express.Router();

const { newtask, getTasks,deletTasks,updateTasks } = require("../controllers/task");

const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");

taskRouter.post("/task",authentication,authorization, newtask);
taskRouter.get("/tasks", getTasks);

taskRouter.delete("/taskdelete/:_id",authentication,authorization, deletTasks);
taskRouter.put("/tasksupdate/:_id",authentication,authorization, updateTasks);

module.exports = taskRouter;