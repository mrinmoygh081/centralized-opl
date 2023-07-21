import { query } from "@/db/db";
import { sendRes } from "@/utils/resHelper";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { client_id } = req.body;

    try {
      const result = await query({
        query: `SELECT t1.name as product_name, t1.product_id, t2.name as client_name FROM products as t1 
          INNER JOIN clients as t2 ON t1.client_id = t2.client_id
          WHERE t1.client_id = ?`,
        values: [client_id],
      });
      if (result.length > 0) {
        sendRes(res, true, 200, "Product Data by client", result, null);
      } else {
        sendRes(res, false, 200, "No Record Found", result, null);
      }
    } catch (error) {
      sendRes(res, false, 400, "Error", error, null);
    }
  }
  //   if (req.method === "POST") {
  //     const { parts_name, product_id } = req.body;

  //     let sql = `INSERT INTO subproduct SET parts_name= ?, product_id=?`;
  //     const result = await query({
  //       query: sql,
  //       values: [parts_name, product_id],
  //     });
  //     sendRes(res, true, 200, "Data Added", result, null);
  //   }

  //   if (req.method === "PUT") {
  //     const { subproduct_id, parts_name, product_id } = req.body;

  //     try {
  //       let sql = `UPDATE subproduct SET parts_name = ?, product_id=? WHERE subproduct_id = ?`;
  //       const result = await query({
  //         query: sql,
  //         values: [parts_name, product_id, subproduct_id],
  //       });
  //       sendRes(res, true, 200, "Data Updated", result, null);
  //     } catch (error) {
  //       console.log(error);
  //       sendRes(res, false, 400, "Error", error, null);
  //     }
  //   }
};

export default handler;
