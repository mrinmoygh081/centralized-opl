import { sendRes } from "@/utils/resHelper";
import exec from "ssh-exec";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { user, host, password } = req.body;
    try {
      let screenStatus = 0;
      await exec(
        "sudo systemctl status oplclient | grep active",
        {
          user: user,
          host: host,
          key: "@/keys/id_rsa.pub",
          password: password,
        },
        async function (err, stdout, stderr) {
          if (err) {
            console.log("err", err);
          } else {
            let wordAc = "ACTIVE";
            let wordIn = "INACTIVE";
            let sentence = await stdout.toUpperCase();

            let lis = await sentence.split(" ");
            // checking if word is present
            if (lis.indexOf(wordAc) != -1) {
              screenStatus = true;
            }
            if (lis.indexOf(wordIn) != -1) {
              screenStatus = false;
            }
          }
          if (screenStatus) {
            sendRes(res, true, 200, "screens status", screenStatus, null);
          } else {
            sendRes(res, false, 200, "screens status", screenStatus, null);
          }
        }
      ).pipe(process.stdout);
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
};

export default handler;
