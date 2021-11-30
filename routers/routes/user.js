const express = require("express");
const { signup, signin } = require("../controllers/user");
const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

userRouter.get("/allusers",authentication,authorization, getalluser);
userRouter.delete("/userdelet/:_id",authentication,authorization, deletuser);

module.exports = userRouter;