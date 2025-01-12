const jsonwebtoken = require("jsonwebtoken");
const { SECRET } = require("../config");

module.exports = (req, res, next) => {
   try {
      const token = req.session.token;

      if (!token) {
         return res.redirect("/auth/login");
      }

      const verifiedToken = jsonwebtoken.verify(token, SECRET);

      if (!verifiedToken) {
         return res.redirect("/auth/login");
      }

      next();
   } catch(error) {
      console.error(error.message);
      return res.redirect("/auth/login");
   }
};