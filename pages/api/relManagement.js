import { query } from "@/db/db";
import { sendRes } from "@/utils/resHelper";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const result = await query({
        query: `SELECT t1.product_rel_id as id, t2.name as product, t6.shift_name as shift, t3.screen_name as screen, t4.instruction_img as opl, t7.instruction_img as opl2, t5.parts_name as parts FROM product_rel as t1 
            INNER JOIN products as t2 ON t1.product_id = t2.product_id
            INNER JOIN subproduct as t5 ON t5.subproduct_id = t1.subproduct_id
            INNER JOIN screens as t3 ON t1.screen_id = t3.screen_id
            INNER JOIN instructions as t4 ON t1.instruction_id = t4.instruction_id
            INNER JOIN shifts as t6 ON t1.shift_id = t6.shift_id
            INNER JOIN instructions as t7 ON t1.instruction_id2 = t7.instruction_id
        `,
        values: [],
      });
      if (result.length > 0) {
        sendRes(res, true, 200, "All OPL Management Data", result, null);
      } else {
        sendRes(res, false, 200, "No Record Found", result, null);
      }
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
  //   if (req.method === "POST") {
  //     const { productline_name } = req.body;

  //     try {
  //       let sql2 = "SELECT * FROM productline WHERE productline_name = ?";
  //       const checkDup = await query({
  //         query: sql2,
  //         values: [productline_name],
  //       });
  //       if (checkDup.length > 0) {
  //         sendRes(
  //           res,
  //           false,
  //           200,
  //           `${productline_name} is already added`,
  //           checkDup,
  //           null
  //         );
  //       } else {
  //         let sql = `INSERT INTO productline SET productline_name= ?`;
  //         const result = await query({
  //           query: sql,
  //           values: [productline_name],
  //         });
  //         sendRes(res, true, 200, "Data Added", result, null);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       sendRes(res, false, 400, "Error", error, null);
  //     }
  //   }

  //   if (req.method === "PUT") {
  //     const { productline_name, productline_id } = req.body;

  //     try {
  //       let sql = `UPDATE productline SET productline_name = ? WHERE productline_id = ?`;
  //       const result = await query({
  //         query: sql,
  //         values: [productline_name, productline_id],
  //       });
  //       sendRes(res, true, 200, "Data Updated", result, null);
  //     } catch (error) {
  //       console.log(error);
  //       sendRes(res, false, 400, "Error", error, null);
  //     }
  //   }
};

export default handler;
