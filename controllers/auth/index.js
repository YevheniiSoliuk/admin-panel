const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const db = require("../../db");
const { tokenAge, SECRET } = require("../../config");
const { renderView } = require("../../helpers");

const getLoginView = (req, res) => {
   return renderView({
      pathToViewFile: "auth/login",
      documentTitle: "Panel logowania",
      res,
   });
};

const login = (req, res) => {
   const { login, password } = req.body;

   const sql = `SELECT * FROM users WHERE login=$1 LIMIT 1`;

   db.all(sql, [login], async (err, rows) => {
      if (err) return console.error("Błąd odczytu z bazy");

      if (rows.length === 0) {
         return renderView({
            pathToViewFile: "auth/login",
            documentTitle: "Panel logowania",
            message: "Użytkownik nie istnieje",
            res,
         });
      }

      const comparedPassword = await bcrypt.compare(password, rows[0].password);

      if (!comparedPassword) {
         return renderView({
            pathToViewFile: "auth/login",
            documentTitle: "Panel logowania",
            message: "Dane logowania są nieprawidłowe",
            res,
         });
      }

      req.session.admin = rows[0].isAdmin;

      const token = jsonwebtoken.sign(
         {
            login: login,
            isAdmin: rows[0].isAdmin,
         },
         SECRET,
         {
            expiresIn: tokenAge,
         }
      );

      req.session.token = token;
      res.redirect("/books");
   });
};

const logout = (req, res) => {
   req.session = null;
   res.redirect("/auth/login");
};

module.exports = {
   getLoginView,
   login,
   logout,
};