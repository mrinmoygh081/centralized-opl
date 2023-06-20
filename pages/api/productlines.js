import { query } from "@/db/db";
import { sendRes } from "@/utils/resHelper";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const result = await query({
        query: "SELECT * FROM productline",
        values: [],
      });
      if (result.length > 0) {
        sendRes(res, true, 200, "Productlines Data", result, null);
      } else {
        sendRes(res, false, 200, "No Record Found", result, null);
      }
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
  if (req.method === "POST") {
    const { productline_name } = req.body;

    try {
      let sql2 = "SELECT * FROM productline WHERE productline_name = ?";
      const checkDup = await query({
        query: sql2,
        values: [productline_name],
      });
      if (checkDup.length > 0) {
        sendRes(
          res,
          false,
          200,
          `${productline_name} is already added`,
          checkDup,
          null
        );
      } else {
        let sql = `INSERT INTO productline SET productline_name= ?`;
        const result = await query({
          query: sql,
          values: [productline_name],
        });
        sendRes(res, true, 200, "Data Added", result, null);
      }
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }

  if (req.method === "PUT") {
    const { productline_name, productline_id } = req.body;

    try {
      let sql = `UPDATE productline SET productline_name = ? WHERE productline_id = ?`;
      const result = await query({
        query: sql,
        values: [productline_name, productline_id],
      });
      sendRes(res, true, 200, "Data Updated", result, null);
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
};

export default handler;
