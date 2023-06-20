import { sendRes } from "@/utils/resHelper";

const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { loginToken } = req.body;
    try {
      const verified = await jwt.verify(loginToken, process.env.SECRECT_KEY);
      if (verified) {
        sendRes(res, true, 200, "Valid Token", null, null);
      } else {
        sendRes(res, false, 200, "Invalid Token", null, null);
      }
    } catch (e) {
      console.error(e);
      sendRes(res, false, 200, "Invalid Token", null, null);
    }
  }
};

export default handler;
