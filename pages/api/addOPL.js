import { query } from "@/db/db";
import { sendRes } from "@/utils/resHelper";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { image, parts, product, screens } = req.body;
    console.log("req.body", req.body);
    try {
      let sql = `
          INSERT INTO product_rel SET product_id= ?, subproduct_id=?, screen_id= ?, productline_id= ?, instruction_id=?
        `;

      const result = await query({
        query: sql,
        values: [product, parts, screens, 1, image],
      });
      sendRes(res, true, 200, "Data Added", result, null);
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
};

export default handler;
