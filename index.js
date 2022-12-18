require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const morgan = require("morgan");
const { Server } = require("socket.io");
const userRouter = require("./src/routes/users");
const profileRouter = require("./src/routes/profile");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { response } = require("./src/helpers/common");

const cors = require("cors");
const httpServer = createServer(app);
const PORT = process.env.PORT;
const xss = require("xss-clean");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(xss());
app.use(morgan("dev"));

//ROUTE
app.use("/auth", userRouter);
app.use("/profile", profileRouter);
//
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const users = {};
io.on(
  "connection",
  (socket) => {
    console.log("device connect with id = " + socket.id);
    socket.on("sendMessage", (data) => {
      console.log(data);
      io.emit("incoming", data);
    });
    socket.on("present", (data) => {
      users[socket.id] = data;
      console.log(users);
      io.emit("online", users);
    });
    socket.on("close", () => {
      socket.disconnect();
    });
    socket.on("disconnect", () => {
      delete users[socket.id];
      io.emit("online", users);
      console.log("device disconnect");
      console.log(users);
    });
  },
  []
);

app.get("/", (req, res, next) => {
  res.status(200).json({ status: "success", statusCode: 200 });
});

httpServer.listen(PORT, () => {
  console.log(`app running on ${PORT}`);
});
