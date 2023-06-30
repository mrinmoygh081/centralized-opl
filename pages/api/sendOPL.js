import { sendRes } from "@/utils/resHelper";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { image, screenId } = req.body;
    console.log(image, screenId);
    sendRes(res, true, 200, "Data Added", req.body, null);
  }
};

export default handler;
