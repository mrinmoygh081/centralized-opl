import { query } from "@/db/db";
import { sendRes } from "@/utils/resHelper";
import path from "path";
const slugify = require("slugify");
const formidable = require("formidable-serverless");

export const config = {
  api: {
    bodyParser: false,
  },
};

const isFileValid = (file) => {
  const type = file.type.split("/").pop();
  const validTypes = ["jpg", "jpeg", "png"];
  if (validTypes.indexOf(type) === -1) {
    return false;
  }
  return true;
};

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const result = await query({
        query: "SELECT * FROM instructions",
        values: [],
      });
      if (result.length > 0) {
        sendRes(res, true, 200, "products Data", result, null);
      } else {
        sendRes(res, false, 200, "No Record Found", result, null);
      }
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
  if (req.method === "POST") {
    try {
      const data = await new Promise((resolve, reject) => {
        var form = new formidable.IncomingForm();

        form.multiples = true;
        form.uploadDir = "/uploads";
        form.keepExtension = true;
        form.keepFileName = true;
        form.maxFileSize = 50 * 1024 * 1024;

        form.on("fileBegin", (name, file) => {
          const isValid = isFileValid(file);

          if (!isValid) {
            return sendRes(
              res,
              false,
              400,
              "The file type is not a valid type",
              null,
              null
            );
          }

          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          file.name = uniqueSuffix + slugify(file.name);
          file.path = path.join("public/uploads", slugify(file.name));
        });

        form.parse(req, (err, fields, files) => {
          if (err) {
            sendRes(
              res,
              false,
              400,
              "There was an error parsing the files",
              err,
              null
            );
            return reject(err);
          }
          resolve(files);
        });
      });

      let sql = "INSERT INTO instructions SET instruction_img=?";
      let r = await data?.file.map(async (item, i) => {
        return await query({
          query: sql,
          values: [item.name],
        });
      });
      sendRes(res, true, 200, "Uploaded", data, null);
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }

  if (req.method === "PUT") {
    try {
      const data = await new Promise((resolve, reject) => {
        var form = new formidable.IncomingForm();

        form.multiples = true;
        form.uploadDir = "/uploads";
        form.keepExtension = true;
        form.keepFileName = true;
        form.maxFileSize = 50 * 1024 * 1024;

        form.on("fileBegin", (name, file) => {
          const isValid = isFileValid(file);

          if (!isValid) {
            return sendRes(
              res,
              false,
              400,
              "The file type is not a valid type",
              null,
              null
            );
          }

          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          file.name = uniqueSuffix + slugify(file.name);
          file.path = path.join("public/uploads", slugify(file.name));
        });

        form.parse(req, (err, fields, files) => {
          if (err) {
            sendRes(
              res,
              false,
              400,
              "There was an error parsing the files",
              err,
              null
            );
            return reject(err);
          }
          resolve(files);
        });
      });

      let sql = "INSERT INTO instructions SET instruction_img=?";
      let r = await data?.file.map(async (item, i) => {
        return await query({
          query: sql,
          values: [item.name],
        });
      });
      sendRes(res, true, 200, "Uploaded", data, null);
    } catch (error) {
      console.log(error);
      sendRes(res, false, 400, "Error", error, null);
    }
  }
};
export default handler;
