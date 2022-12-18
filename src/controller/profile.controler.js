require("dotenv").config();
const { response } = require("../helpers/common");
const { getProfile ,updateProfile} = require("../model/profile.model");
const { checkEmail } = require("../model/users.model");

const profileController = {
  getProfileID: async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const {
        rows: [data],
      } = await getProfile({ id });
      if (!data) {
        return response(res, 400, [], "Get Profile Failed");
      }
      delete data.password;
      response(res, 200, data, "Get Profile Success");
    } catch (error) {
      console.log(error);
    }
  },
  getProfile: async (req, res) => {
    try {
      const email = req.payload.email;
      console.log(email);
      const {
        rows: [data],
      } = await checkEmail(email);
      if (!data) {
        return response(res, 200, [], "get profile failed");
      }
      delete data.password;
      response(res, 200, data, "get profile success");
    } catch (error) {
      console.log(error);
    }
  },
  updateProfile: async (req, res) => {
    try {
      const data = {
        id: req.payload.id,
        fullname: req.body.fullname || null,
        bio: req.body.bio || null,
        photo: req.file?.path || null,
        email: req.body.email || null,
        phone: req.body.phone || null,
      };
      const { rowCount } = await updateProfile(data);
      if (!rowCount) {
        return response(res, null, 300, "update failed");
      }
      response(res, data, 200, "update success");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
};

exports.profileController = profileController;
