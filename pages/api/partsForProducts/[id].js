import { query } from "@/db/db";
import { sendRes } from "@/utils/resHelper";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;

    try {
      const result = await query({
        query: `SELECT * FROM subproduct
          WHERE product_id = ?`,
        values: [id],
      });
      if (result.length > 0) {
        sendRes(res, true, 200, "subproduct Data", result, null);
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
