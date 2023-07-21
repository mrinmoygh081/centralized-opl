import { query } from "@/db/db";
import { sendRes } from "@/utils/resHelper";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const result = await query({
        query: `SELECT t1.product_id, t1.name as product_name, t1.client_id, t2.name as client_name FROM products as t1
                INNER JOIN clients as t2 ON t1.client_id = t2.client_id`,
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
    const { name, client_id } = req.body;

    try {
      // let sql2 = "SELECT * FROM products WHERE name = ?";
      // const checkDup = await query({
      //   query: sql2,
      //   values: [name],
      // });
      // if (checkDup.length > 0) {
      //   sendRes(res, false, 200, `${name} is already added`, checkDup, null);
      // } else {
      let sql = `INSERT INTO products SET name= ?, client_id=?`;
      const result = await query({
        query: sql,
        values: [name, client_id],
      });
      sendRes(res, true, 200, "Data Added", result, null);
      // }
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }

  if (req.method === "PUT") {
    const { product_name, product_id, client_id } = req.body;

    try {
      let sql = `UPDATE products SET name = ?, client_id=? WHERE product_id = ?`;
      const result = await query({
        query: sql,
        values: [product_name, client_id, product_id],
      });
      sendRes(res, true, 200, "Data Updated", result, null);
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
};

export default handler;
