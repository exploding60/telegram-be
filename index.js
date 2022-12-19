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
const socketIO = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let users = [];
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
  });
  //////////////////////////
  socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));

  socket.on("newUser", (data) => {
    users.push(data);
    socketIO.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  });
});

app.get("/", (req, res, next) => {
  res.status(200).json({ status: "success", statusCode: 200 });
});

httpServer.listen(PORT, () => {
  console.log(`app running on ${PORT}`);
});
