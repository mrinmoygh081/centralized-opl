import { sendRes } from "@/utils/resHelper";
import path from "path";
import fs from "fs";
import { postAPI } from "@/utils/fetchAPIs";

const handler = async (req, res) => {
  if (req.method === "GET") {
    let fileName;

    let result = await postAPI(
      "oplGetInstruction",
      { current_screen: req.query.name },
      null
    );
    // console.log(result, "fdsa2", req.query.name);
    // if (req?.query?.name == 1) {
    //   fileName = result?.data[0]?.current_img || "2.png";
    // }
    // if (req?.query?.name == 2) {
    //   fileName = "2.png";
    // }
    fileName = result?.data[0]?.current_img || "1688110888764-1temp.png";
    let filePath = await path.resolve("./public/uploads/", fileName);
    let imageBuffer = await fs.readFileSync(filePath);

    res.setHeader("Content-Type", "image/png");
    res.send(imageBuffer);
  }
};

export default handler;
