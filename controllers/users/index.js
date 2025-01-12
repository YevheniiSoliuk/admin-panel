const bcrypt = require("bcrypt");
const db = require("../../db");
const { renderView } = require("../../helpers");

const getUsersView = (req, res) => {
   const sql = "SELECT * FROM users";

   db.all(sql, [], (err, rows)=> {
      if(err) return console.error("Błąd przy próbie odczytu z bazy");

      return renderView({
        pathToViewFile: "admin/list",
        documentTitle: "Użytkownicy",
        data: rows,
        sessionToken: req.session.token,
        res,
      });
   })
}

const getAddUserView = (req, res) => {
  return renderView({
    pathToViewFile: "admin/add",
    documentTitle: "Dodawanie użytkownika",
    sessionToken: req.session.token,
    res,
  });
}

const addUser = (req, res) => {
   const { name, lastname, login, password, email, phone, isAdmin } = req.body;

   const sql = `SELECT * from users WHERE login=$1 LIMIT 1`;

   db.all(sql, [login], async (err, rows) => {
     if (err)
       return console.error(`Błąd przy próbie odczytu z bazy`, err.message);

     if (rows.length === 1) {
      return renderView({
        pathToViewFile: "admin/add",
        documentTitle: "Dodawanie użytkownika",
        message: "Użytkownik już istnieje",
        data: rows,
        sessionToken: req.session.token,
        res,
      });
     }

     const hashedPassword = await bcrypt.hash(password, 10);

     const sqlInsert = `INSERT INTO users(name, lastname, login, password, email, phone, isAdmin) VALUES($1, $2, $3, $4, $5, $6, $7)`;

     db.all(
       sqlInsert,
       [name, lastname, login, hashedPassword, email, phone, isAdmin],
       (err, rows) => {
          if (err) {
            console.log("Błąd przy próbie zapisu do bazy ", err.message);
            return renderView({
              pathToViewFile: "admin/add",
              documentTitle: "Dodawanie użytkownika",
              message: `Błąd przy próbie zapisu do bazy, ${err.message}`,
              data: rows,
              sessionToken: req.session.token,
              res,
            });
          }

          res.redirect("/users");
       }
     );
  });
}

module.exports = {
   getUsersView,
   getAddUserView,
   addUser,
};