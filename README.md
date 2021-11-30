# W08D03

## Folder work
1- The ability to create a special task for each user and modify it,

2-Delete the account and the task,

3-Display the tags,

4- Passcode encryption,

5- Giving the authority,

6- The property of passing admin owners,

7- Add a new skyma, the name of your task,

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

const user = new mongoose.Schema({ email: { type: String, required: true, unique: true }, password: { type: String, require: true }, role: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }], });

module.exports = mongoose.model("User", user);

routers-controllers-role
const rolemodel = require("../../db/models/role");

const newrolr =(req,res)=>{ const {role,permossion}=req.body;

const newrolr = new rolemodel({
    role,
    permossion,

});
newrolr
.save()
.then((result)=>{
    res.json(result);

})
.catch((err)=>{
   res.status(err)
})
}

const getrole = (req, res)=>{ rolemodel .find({}) .then(result=>{ res.json(result);

})
.catch((err)=>{
 res.json(err);
})
}

module.exports = {newrolr,getrole}

## routers-controllers-user
const usermodel = require("../../db/models/user");

const bcrypt = require("bcrypt"); const jwt = require("jsonwebtoken");

const salt =Number(process.env.SALT); const secret =process.env.SECRET;

const resgister =async (req, res, next) => { const {email,password,role } = req.body;

const savedEmail = email.toLowerCase(); const savedPassword = await bcrypt.hash(password, salt);

const newuser = new usermodel({ email: savedEmail, password: savedPassword, role, }); newuser .save() .then((result) => {

  res.json(result);
})
.catch((err) => {
  res.send(err);
});
}

const login = (req, res) => { const { email, password } = req.body; const savedEmail = email.toLowerCase();

usermodel
  .findOne({ email: savedEmail })
  .then(async (result) => {
    if (result) {
      if (result.email == email) {
        const savedPassword = await bcrypt.compare(password, result.password);
        const payload = {
          email,
        };
        if (savedPassword) {
          const token = jwt.sign(payload, secret);

          res.status(200).json({ result, token });
        } else {
          res.status(400).json("Wrong email or password");
        }
      } else {
        res.status(400).json("Wrong email or password");
      }
    } else {
      res.status(404).json("Email not exist");
    }
  })
  .catch((err) => {
    res.send(err);
  });
};

module.exports ={resgister,login,}

## routers-routes-role
const express = require('express');

const roleRouter =express.Router();

const {newrolr,getrole} =require("../controllers/role");

roleRouter.post("/role",newrolr); roleRouter.get("/read",getrole);

module.exports = roleRouter;

## routers-routes-user
const express = require("express"); const userRoute = express.Router();

const{resgister,login,}= require("./../controllers/user");

userRoute.post("/resgister",resgister); userRoute.post("/login",login);

module.exports = userRoute

 ## index
const express = require("express");

const dotenv = require("dotenv");

const cors = require("cors");

const app = express()

dotenv.config()

const db = require("./db/index"); app.use(express.json());

const roleRouter =require("./routers/routes/role"); const userRoute = require("./routers/routes/user");

app.use(roleRouter); app.use(userRoute);

const PORT = process.env.PORT||5000; app.use(cors())

app.listen(PORT, () => { console.log(server is running on port ${PORT}); });

## .env and gitignore
It contains sensitive and important data and it is not recommended to display it if the port is of great importance