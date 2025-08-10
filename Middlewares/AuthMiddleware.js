
// const User = require("../model/UserModel.js");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");

// // module.exports.userVerification = (req, res) => {
// //   const token = req.cookies.token
// //   if (!token) {
// //     return res.json({ status: false })
// //   }
// //   jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
// //     if (err) {
// //      return res.json({ status: false })
// //     } else {
// //       const user = await User.findById(data.id)
// //       if (user) return res.json({ status: true, user: user.username })
// //       else return res.json({ status: false })
// //     }
// //   })
// // };

// module.exports.userVerification = async (req, res) => {
//   const token = req.cookies.token;
//   if (!token) return res.json({ status: false });

//   try {
//     const data = jwt.verify(token, process.env.TOKEN_KEY);
//     const user = await User.findById(data.id);
//     return res.json({ status: !!user, user: user?.username });
//   } catch (err) {
//     return res.json({ status: false });
//   }
// };



const User = require("../model/UserModel.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  // Accept either "token" or "_vercel_jwt"
  const token = req.cookies.token || req.cookies._vercel_jwt;

  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      try {
        const user = await User.findById(data.id);
        if (user) {
          return res.json({ status: true, user: user.username });
        } else {
          return res.json({ status: false });
        }
      } catch (dbErr) {
        console.error(dbErr);
        return res.json({ status: false });
      }
    }
  });
};
