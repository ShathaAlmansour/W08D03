const express = require("express");
const taskRouter = express.Router();
const {
  newtask,
  gettasks,
  delettasks,
  updetatasks,
} = require("../controllers/task");
const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");
taskRouter.post("/task", authentication, newtask);
taskRouter.get("/tasks", authentication, gettasks);
taskRouter.delete("/taskdelet/:_id", authentication, delettasks);
taskRouter.put("/tasksupdeta/:_id", updetatasks);
module.exports = taskRouter;
