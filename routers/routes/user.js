const express = require("express");
const { signup, signin,getalluser, deletuser} = require("../controllers/user");
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

userRouter.get("/getalluser",authentication,authorization, getalluser);
userRouter.delete("/userdelet/:_id",authentication,authorization, deletuser);

module.exports = userRouter;
