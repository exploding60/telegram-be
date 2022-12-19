const { response } = require("../helpers/common");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { generateToken } = require("../helpers/jwt");
// const email = require("../middlewares/email");
const ModelUsers = require("../model/users.model");

const userController = {
  register: async (req, res) => {
    let {
      rows: [users],
    } = await ModelUsers.checkEmail(req.body.email);
    if (users) {
      return response(res, 403, false, [], "EMAIL ALREADY BEEN REGISTERED");
    }
    ////CREATE DATA
    let password = bcrypt.hashSync(req.body.password);
    let data = {
      id: uuidv4(),
      email: req.body.email,
      password,
      username: req.body.username,
    };

    try {
      const result = await ModelUsers.createUsers(data);
      if (result) {
        console.log(result);
        response(res, 200, true, [], "register success,Please Login");
      }
    } catch (err) {
      response(res, 404, false, err, " register fail");
    }
  },
  login: async (req, res) => {
    try {
      const email = req.body.email;
      console.log(email, "email");
      let {
        rows: [users],
      } = await ModelUsers.checkEmail(email);
      if (!users) {
        return response(res, 404, false, null, " email not found");
      }
      if (users.auth == 0) {
        return response(res, 404, false, null, "email not verified");
      }
      const password = req.body.password;
      const validation = bcrypt.compareSync(password, users.password);
      if (!validation) {
        return response(res, 404, false, null, "wrong password");
      }
      const id = users.id;
      const username = users.username;
      const data = {
        id,
        username,
        email,
        token: await generateToken(email, id),
        // refreshToken: await generateRefreshToken(email, id),
      };
      res.cookie("user", data.token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
      });
      response(res, 200, true, data, "LOGIN SUCCESS");
    } catch (err) {
      return response(res, 404, false, err, "LOGIN FAILED");
    }
  },
};

exports.userController = userController;
