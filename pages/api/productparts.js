import { query } from "@/db/db";
import { sendRes } from "@/utils/resHelper";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const result = await query({
        query:
          "SELECT * FROM subproduct as t1 INNER JOIN products as t2 ON t1.product_id = t2.product_id",
        values: [],
      });
      if (result.length > 0) {
        sendRes(res, true, 200, "subproduct Data", result, null);
      } else {
        sendRes(res, false, 200, "No Record Found", result, null);
      }
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
  if (req.method === "POST") {
    const { parts_name, product_id } = req.body;
    console.log(parts_name, product_id);

    try {
      let sql2 = "SELECT * FROM subproduct WHERE parts_name = ?";
      const checkDup = await query({
        query: sql2,
        values: [parts_name],
      });
      if (checkDup.length > 0) {
        sendRes(
          res,
          false,
          200,
          `${parts_name} is already added`,
          checkDup,
          null
        );
      } else {
        let sql = `INSERT INTO subproduct SET parts_name= ?, product_id=?`;
        const result = await query({
          query: sql,
          values: [parts_name, product_id],
        });
        sendRes(res, true, 200, "Data Added", result, null);
      }
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }

  if (req.method === "PUT") {
    const { subproduct_id, parts_name, product_id } = req.body;

    try {
      let sql = `UPDATE subproduct SET parts_name = ?, product_id=? WHERE subproduct_id = ?`;
      const result = await query({
        query: sql,
        values: [parts_name, product_id, subproduct_id],
      });
      sendRes(res, true, 200, "Data Updated", result, null);
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
};

export default handler;
