import { sendRes } from "@/utils/resHelper";
import exec from "ssh-exec";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { user, host, password } = req.body;
    try {
      exec("sudo systemctl start oplclient", {
        user: user,
        host: host,
        key: "@/keys/id_rsa.pub",
        password: password,
      }).pipe(process.stdout, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
      sendRes(res, true, 200, "screens opened", null, null);
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
};

export default handler;
