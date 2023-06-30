import { sendRes } from "@/utils/resHelper";
var amqp = require("amqplib/callback_api");

const handler = async (req, res) => {
  if (req.method === "GET") {
    amqp.connect("amqp://10.12.1.151", function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }

        var queue = "test";
        var msg = "H";

        channel.assertQueue(queue, {
          durable: false,
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
      });
      setTimeout(function () {
        connection.close();
      }, 500);
    });
    sendRes(res, true, 200, "Successfully Send", req.body, null);
  }
};

export default handler;
