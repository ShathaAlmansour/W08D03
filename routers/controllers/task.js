const taskmodel = require("../../db/models/task");
const newtask = (req, res) => {
  const { name, task,isDelete } = req.body;

  const newtask = new taskmodel({
    name,
    task,
    isDelete,
  });
  
  newtask
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err);
    });
};

const getTasks = (req, res) => {
    taskmodel
    .find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

const deletTasks = (req, res) => {
    const { _id } = req.params;
    taskmodel
    .findByIdAndDelete({_id})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

const updateTasks = (req, res) => {
    const {name} =req.body;
    const { _id } = req.params;
    taskmodel
    .findByIdAndUpdate(_id, { $set: { name: name } })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = { newtask, getTasks,deletTasks,updateTasks };