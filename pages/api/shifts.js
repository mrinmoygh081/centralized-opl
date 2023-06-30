import { query } from "@/db/db";
import { sendRes } from "@/utils/resHelper";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const result = await query({
        query: "SELECT * FROM shifts",
        values: [],
      });
      if (result.length > 0) {
        sendRes(res, true, 200, "shifts Data", result, null);
      } else {
        sendRes(res, false, 200, "No Record Found", result, null);
      }
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
  if (req.method === "POST") {
    const { shift_name } = req.body;
    try {
      let sql2 = "SELECT * FROM shifts WHERE shift_name = ?";
      const checkDup = await query({
        query: sql2,
        values: [shift_name],
      });
      if (checkDup.length > 0) {
        sendRes(
          res,
          false,
          200,
          `${shift_name} is already added`,
          checkDup,
          null
        );
      } else {
        let sql = `INSERT INTO shifts SET shift_name=?`;
        const result = await query({
          query: sql,
          values: [shift_name],
        });
        sendRes(res, true, 200, "Data Added", result, null);
      }
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }

  if (req.method === "PUT") {
    const { shift_name, shift_id } = req.body;

    try {
      let sql = `UPDATE shifts SET shift_name=? WHERE shift_id = ?`;
      const result = await query({
        query: sql,
        values: [shift_name, shift_id],
      });
      sendRes(res, true, 200, "Data Updated", result, null);
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
};

export default handler;
