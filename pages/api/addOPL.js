import { query } from "@/db/db";
import { sendRes } from "@/utils/resHelper";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { image, client, parts, product, screens, shifts } = req.body;

    console.log(image, client, parts, product, screens, shifts);
    try {
      let sql = `
          INSERT INTO product_rel SET client_id=?, product_id= ?, subproduct_id=?, screen_id= ?, productline_id= ?, instruction_id=?, shift_id=?
        `;

      const result = await query({
        query: sql,
        values: [client, product, parts, screens, 1, image, shifts],
      });
      sendRes(res, true, 200, "Data Added", result, null);
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
  if (req.method === "PUT") {
    const {
      client_id,
      product_id,
      shift_id,
      parts_id,
      screen_ip,
      opl_id,
      product_rel_id,
    } = req.body;

    try {
      let sql = `
          UPDATE product_rel SET client_id=?, product_id = ?, subproduct_id=?, screen_id=?, productline_id=?, instruction_id=?, shift_id=? 
          WHERE product_rel_id = ?
        `;

      const result = await query({
        query: sql,
        values: [
          client_id,
          product_id,
          parts_id,
          screen_ip,
          1,
          opl_id,
          shift_id,
          product_rel_id,
        ],
      });
      sendRes(res, true, 200, "Data Updated", result, null);
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      let sql = `DELETE FROM product_rel WHERE product_rel_id = ?`;

      const result = await query({
        query: sql,
        values: [id],
      });
      console.log(result);
      sendRes(res, true, 200, "Data Deleted", result, null);
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
};

export default handler;
