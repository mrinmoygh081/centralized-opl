import { query } from "@/db/db";
import { sendRes } from "@/utils/resHelper";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { current_img, current_product, current_shift, current_screen } =
      req.body;

    try {
      let sql2 = `DELETE FROM current WHERE current_screen=?`;
      const resu = await query({
        query: sql2,
        values: [current_screen],
      });
      try {
        let sql = `INSERT INTO current SET current_img= ?, current_product= ?, current_shift= ?, current_screen= ?`;
        const result = await query({
          query: sql,
          values: [current_img, current_product, current_shift, current_screen],
        });
        sendRes(res, true, 200, "Data Updated", result, null);
      } catch (error) {
        console.log(error);
        sendRes(res, false, 400, "Error", error, null);
      }
    } catch (e) {
      console.log(e);
      sendRes(res, false, 400, "Error in Truncate", error, null);
    }
  }
};

export default handler;
