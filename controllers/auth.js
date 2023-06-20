// import { executeQuery } from "@/db/config";
// import { sendRes } from "@/utils/resHelper";

// const adminAuthLogin = async (req, res) => {
//   try {
//     // const errors = validator(req);
//     // console.log(errors, "errors");
//     // if (Object.keys(errors).length !== 0) {
//     //   sendRes(res, false, 422, "Validation failed!", errors, null);
//     // } else {
//     // const formData = {
//     //   phone: req.body.phone,
//     //   password: req.body.password,
//     // };
//     // res.send(pool);
//     //   console.log("formData", formData);
//     //   // Check requeted user is exist or not
//     // sql = "SELECT * FROM users";
//     // let user = await executeQuery(sql, []);
//     // console.log("user", user);
//     res.send("hello");
//     //   if (user.length > 0) {
//     //     const userRow = JSON.parse(JSON.stringify(user))[0];
//     //     if (userRow.is_active != "n") {
//     //       const comparison = await bcryptjs.compare(
//     //         req.body.password,
//     //         userRow.password
//     //       );
//     //       if (comparison) {
//     //         sendRes(res, true, 200, "Logged in successfully", data, token);
//     //       } else {
//     //         sendRes(res, false, 200, "Password is incorrect!", errors, null);
//     //       }
//     //     } else {
//     //       sendRes(
//     //         res,
//     //         false,
//     //         200,
//     //         "Your account is not yet active",
//     //         errors,
//     //         null
//     //       );
//     //     }
//     //   } else {
//     //     sendRes(res, false, 200, "Email does not exist!", errors, null);
//     //   }
//     // }
//   } catch (error) {
//     sendRes(res, false, 500, "Server error!", error, null);
//   }
// };

// export { adminAuthLogin };
