# W08D03


## The packages used
1- npm i express (To build a backend server)

1- npm i cors (The benefit in it when using Front End)

1- npm i dotenv (To hide some sensitive things)

1- npm i jsonwebtoken (It contains 3 items and can only be changed on paylad)

1- npm i mongoose (To create the database)

1- npm i bcrypt (Password encryption)

1- npm i nodmone (globe)

## models-roleSchema
const mongoose = require("mongoose");

const role = new mongoose.Schema({ role: { type: String,}, permossion: { type: Array },

});

module.exports = mongoose.model("Role", role);

## models-userSchema
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },

});

module.exports = mongoose.model("User", userSchema);

## routers-controllers-user

  const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  const { email, password, role } = req.body;

  const savedEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));

  const newUser = new userModel({
    email: savedEmail,
    password: hashedPassword,
    role,
  });

  newUser
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};
const signin = (req, res) => {
  const { email, password } = req.body;

  const savedEmail = email.toLowerCase();

  userModel
    .findOne({ email: savedEmail })
    .then(async (result) => {
      if (result) {
        if (result.email == savedEmail) {
          const checkedPassword = await bcrypt.compare(
            password,
            result.password
          );
          if (checkedPassword) {
            const payload = { role: result.role };
            const options = { expiresIn: "1h" };
            const secret = process.env.SECRET;
            const token = await jwt.sign(payload, secret, options);
            res.status(200).send({ result, token });
          } else {
            res.status(404).send("Invalid email or password");
          }
        } else {
          res.status(404).send("Invalid email or password");
        }
      } else {
        res.status(404).send("User doesn't exist");
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getalluser = (req, res) => {
  usermodel
  .find({})
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    res.json(err);
  });
};

const deletuser = (req, res) => {
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

module.exports = { signup, signin, getalluser, deletuser };


## routers-routes-role
const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role: { type: String, required: true },
  permission: { type: Array, required: true },
});

module.exports = mongoose.model("Role", roleSchema);

## routers-routes-user
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },

});

module.exports = mongoose.model("User", userSchema);

 ## index
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./db");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const roleRouter = require("./routers/routes/role");
app.use(roleRouter);

const userRouter = require("./routers/routes/user");
app.use(userRouter);

const taskRouter = require("./routers/routes/task");
app.use(taskRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});

## .env and gitignore
It contains sensitive and important data and it is not recommended to display it if the port is of great importance