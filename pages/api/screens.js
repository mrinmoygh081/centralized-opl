import { query } from "@/db/db";
import { sendRes } from "@/utils/resHelper";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const result = await query({
        query: "SELECT * FROM screens",
        values: [],
      });
      if (result.length > 0) {
        sendRes(res, true, 200, "screens Data", result, null);
      } else {
        sendRes(res, false, 200, "No Record Found", result, null);
      }
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
  if (req.method === "POST") {
    const { screen_ip, screen_name } = req.body;

    try {
      let sql2 = "SELECT * FROM screens WHERE screen_ip = ?";
      const checkDup = await query({
        query: sql2,
        values: [screen_ip],
      });
      if (checkDup.length > 0) {
        sendRes(
          res,
          false,
          200,
          `${screen_ip} is already added`,
          checkDup,
          null
        );
      } else {
        let sql = `INSERT INTO screens SET screen_ip= ?, screen_name=?`;
        const result = await query({
          query: sql,
          values: [screen_ip, screen_name],
        });
        sendRes(res, true, 200, "Data Added", result, null);
      }
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }

  if (req.method === "PUT") {
    const { screen_ip, screen_name, screen_id } = req.body;

    try {
      let sql = `UPDATE screens SET screen_ip = ?, screen_name=? WHERE screen_id = ?`;
      const result = await query({
        query: sql,
        values: [screen_ip, screen_name, screen_id],
      });
      sendRes(res, true, 200, "Data Updated", result, null);
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
};

export default handler;
