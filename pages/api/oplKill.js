import { sendRes } from "@/utils/resHelper";
var amqp = require("amqplib/callback_api");

const handler = async (req, res) => {
  if (req.method === "GET") {
    amqp.connect(
      process.env.NEXT_PUBLIC_RABBIT_API,
      function (error0, connection) {
        if (error0) {
          sendRes(res, false, 400, "Connection not established!", error0, null);
          throw error0;
        }
        connection.createChannel(function (error1, channel) {
          if (error1) {
            sendRes(
              res,
              false,
              400,
              "Connection not established!",
              error1,
              null
            );
            throw error1;
          }

          var queue = "test";
          var msg = "K";

          channel.assertQueue(queue, {
            durable: false,
          });
          channel.sendToQueue(queue, Buffer.from(msg));

          // console.log(" [x] Sent %s", msg);
        });
        setTimeout(function () {
          connection.close();
        }, 500);
        sendRes(res, true, 200, "OPL Stopped", req.body, null);
      }
    );
  }
};

export default handler;
