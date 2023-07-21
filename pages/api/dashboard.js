import { query } from "@/db/db";
import { sendRes } from "@/utils/resHelper";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { product_id, shift_id, client_id } = req.body;
      const result = await query({
        query: `SELECT t2.name as product, t2.product_id as product_id, t3.screen_name as screen, t3.screen_id as screen_id, t3.screen_ip as screen_ip, t4.instruction_img as opl, t5.parts_name as parts, t6.shift_name as shift, t6.shift_id as shift_id, t7.client_id FROM product_rel as t1 
        INNER JOIN products as t2 ON t1.product_id = t2.product_id
        INNER JOIN screens as t3 ON t1.screen_id = t3.screen_id
        INNER JOIN instructions as t4 ON t1.instruction_id = t4.instruction_id
        INNER JOIN subproduct as t5 ON t5.subproduct_id = t1.subproduct_id
        INNER JOIN shifts as t6 ON t1.shift_id = t6.shift_id
        INNER JOIN clients as t7 ON t1.client_id = t7.client_id
        WHERE t1.product_id = ? AND t1.shift_id=? AND t1.client_id = ?
    `,
        values: [product_id, shift_id, client_id],
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
};

export default handler;
