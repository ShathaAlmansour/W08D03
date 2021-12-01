const express = require("express");
const taskRouter = express.Router();
const {
  newtask,
  getTasks,
  deletTasks,
  updateTasks,
} = require("../controllers/task");

const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");

taskRouter.post("/task", authentication, newtask);
taskRouter.get("/tasks", authentication, getTasks);
taskRouter.delete("/taskdelet/:_id", authentication, deletTasks);
taskRouter.put("/tasksupdeta/:_id", authentication, authorization, updateTasks);

module.exports = taskRouter;
