const { getIsAdmin } = require("../helpers");

module.exports = (req, res, next) => {
   const isAdmin = getIsAdmin(req.session.token, res);

   if (!isAdmin) {
      res.redirect("/books");
   }

   next();
}