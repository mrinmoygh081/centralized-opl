import { screensData } from "@/data/ScreensData";
import { sendRes } from "@/utils/resHelper";
import exec from "ssh-exec";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      screensData.map((item, index) => {
        exec("sudo systemctl stop oplclient", {
          user: item?.user,
          host: item?.host,
          key: "@/keys/id_rsa.pub",
          password: item?.password,
        }).pipe(process.stdout, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
      });
      sendRes(res, true, 200, "screens opened", null, null);
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
};

export default handler;
