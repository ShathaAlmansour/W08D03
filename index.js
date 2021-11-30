const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./db")


const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const roleRouter = require("./routers/routes/role");
app.use(roleRouter);

const PORT = process.env.PORT || 4000;
app.use(cors());

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
  });
  