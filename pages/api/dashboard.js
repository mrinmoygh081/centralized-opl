import { query } from "@/db/db";
import { sendRes } from "@/utils/resHelper";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { product_id } = req.body;
      const result = await query({
        query: `SELECT t2.name as product, t3.screen_name as screen, t4.instruction_img as opl, t5.parts_name as parts FROM product_rel as t1 
        INNER JOIN products as t2 ON t1.product_id = t2.product_id
        INNER JOIN subproduct as t5 ON t5.subproduct_id = t1.subproduct_id
        INNER JOIN screens as t3 ON t1.screen_id = t3.screen_id
        INNER JOIN instructions as t4 ON t1.instruction_id = t4.instruction_id
        WHERE T1.product_id = ?
    `,
        values: [product_id],
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
