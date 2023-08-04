import { query } from "@/db/db";
import { sendRes } from "@/utils/resHelper";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { current_screen } = req.body;
    // console.log(current_screen, "current_screen");
    try {
      const result = await query({
        query: `SELECT * FROM current WHERE current_screen = ?`,
        values: [current_screen],
      });
      if (result.length > 0) {
        sendRes(res, true, 200, "instructions Data", result, null);
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
