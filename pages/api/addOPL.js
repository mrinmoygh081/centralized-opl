import { query } from "@/db/db";
import { sendRes } from "@/utils/resHelper";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { image, image2, parts, product, screens, shifts } = req.body;

    try {
      let sql = `
          INSERT INTO product_rel SET product_id= ?, subproduct_id=?, screen_id= ?, productline_id= ?, instruction_id=?, instruction_id2=?, shift_id=?
        `;

      const result = await query({
        query: sql,
        values: [product, parts, screens, 1, image, image2, shifts],
      });
      sendRes(res, true, 200, "Data Added", result, null);
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
  if (req.method === "PUT") {
    const { image, parts, product, screens, shifts, product_rel_id } = req.body;

    try {
      let sql = `
          UPDATE product_rel SET product_id = ?, subproduct_id=?, screen_id=?, productline_id=?, instruction_id=?, shift_id=? 
          WHERE product_rel_id = ?
        `;

      const result = await query({
        query: sql,
        values: [product, parts, screens, 1, image, shifts, product_rel_id],
      });
      sendRes(res, true, 200, "Data Updated", result, null);
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
};

export default handler;
