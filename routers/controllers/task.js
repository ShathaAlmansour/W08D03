const taskmodel = require("../../db/models/task");
const newtask = (req, res) => {
  const { name, task } = req.body;

  const newtask = new taskmodel({
    name,
    user: req.token.id,
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
    .find({ user: req.token.id })
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
    .findByIdAndDelete(_id, { $set: { isDelete: true } })
    .then((result) => {
      if (result) {
        res.status(200).json("delettask");
      } else {
        res.status(404).json("user undefind");
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

const updateTasks = (req, res) => {
  const { name } = req.body;
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

module.exports = { newtask, getTasks, deletTasks, updateTasks };
