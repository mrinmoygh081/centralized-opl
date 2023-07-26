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
    // console.log("query", req.query.name, result);
    fileName = result?.data[0]?.current_img || "1689667309274-1temp.png";
    // fileName = "1689667563657-3download.jpg";

    let fileExtension = fileName.replace(/^.*\./, "");
    let imgType;
    // console.log(fileExtension);
    if (fileExtension == "jpg") {
      imgType = "image/jpg";
    } else if (fileExtension == "jpeg") {
      imgType = "image/jpeg";
    } else if (fileExtension == "png") {
      imgType = "image/png";
    }

    res.setHeader("Content-Type", imgType);

    let filePath = await path.resolve("./public/uploads/", fileName);
    let imageBuffer = await fs.readFileSync(filePath);

    res.send(imageBuffer);
  }
};

export default handler;
