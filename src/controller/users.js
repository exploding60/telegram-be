const { response } = require("../helpers/common");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { generateToken } = require("../helpers/jwt");
// const email = require("../middlewares/email");
const ModelUsers = require("../model/users");

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
      number: req.body.number,
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
      const fullname = users.fullname;

      const token = await generateToken(email, id);

      response(res, 200, true, { token, data: users }, "LOGIN SUCCESS");
    } catch (err) {
      return response(res, 404, false, err, "LOGIN FAILED");
    }
  },
  getAll: async (req, res) => {
    try {
      const result = await ModelUsers.getAll();
      if (result) {
        console.log(result);
        response(res, 200, true, result.rows, "register success,Please Login");
      }
    } catch (err) {
      response(res, 404, false, err, " register fail");
    }
  },
};

exports.userController = userController;
