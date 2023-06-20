import { query } from "@/db/db";
import { sendRes } from "@/utils/resHelper";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRECT_KEY, {
    expiresIn: "1d",
  });
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { username, password } = req.body;
      const result = await query({
        query: "SELECT * FROM users where username = ? AND password = ?",
        values: [username, password],
      });
      if (result.length > 0) {
        const token = generateToken(result.user_id);
        sendRes(res, true, 200, "Successfully LoggedIn", result, token);
      } else {
        sendRes(
          res,
          false,
          200,
          "Please provide correct username and password",
          result,
          null
        );
      }
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error logging in", error, null);
    }
  }
};

export default handler;
