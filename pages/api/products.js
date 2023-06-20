import { query } from "@/db/db";
import { sendRes } from "@/utils/resHelper";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const result = await query({
        query: "SELECT * FROM products",
        values: [],
      });
      if (result.length > 0) {
        sendRes(res, true, 200, "products Data", result, null);
      } else {
        sendRes(res, false, 200, "No Record Found", result, null);
      }
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
  if (req.method === "POST") {
    const { name } = req.body;

    try {
      let sql2 = "SELECT * FROM products WHERE name = ?";
      const checkDup = await query({
        query: sql2,
        values: [name],
      });
      if (checkDup.length > 0) {
        sendRes(res, false, 200, `${name} is already added`, checkDup, null);
      } else {
        let sql = `INSERT INTO products SET name= ?`;
        const result = await query({
          query: sql,
          values: [name],
        });
        sendRes(res, true, 200, "Data Added", result, null);
      }
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }

  if (req.method === "PUT") {
    const { name, product_id } = req.body;

    try {
      let sql = `UPDATE products SET name = ? WHERE product_id = ?`;
      const result = await query({
        query: sql,
        values: [name, product_id],
      });
      sendRes(res, true, 200, "Data Updated", result, null);
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
};

export default handler;
