const db = require("../../db");
const { renderView } = require("../../helpers");

const getAllBooks = (req, res) => {
   const sql = "SELECT * FROM books";

   db.all(sql, [], (err, rows)=> {
      if(err) return console.error("Błąd przy próbie odczytu z bazy");

      return renderView({
         pathToViewFile: "books/list",
         documentTitle: "Nasze książki",
         data: rows,
         sessionToken: req.session.token,
         res,
      });
   });
};

const getAddBookView = (req, res) => {
   return renderView({
      pathToViewFile: "books/add",
      documentTitle: "Dodawanie danych",
      sessionToken: req.session.token,
      res,
   });
}

const addBook = (req, res) => {
   const { title, author_name, author_lastname, publish_year, about } = req.body;
   const addBookQuery = `
      INSERT INTO books(title, author_name, author_lastname, first_publish_year, about)
      VALUES ($1, $2, $3, $4, $5)
   `;

   db.all(addBookQuery, [title, author_name, author_lastname, publish_year, about], (err, rows)=>{
      if (err) {
         console.error(`Błąd przy próbie zapisu do bazy`, err.message);

         return renderView({
            pathToViewFile: "books/edit",
            documentTitle: "Edycja danych",
            message: `Błąd przy próbie zapisu do bazy, ${err.message}`,
            data: rows,
            sessionToken: req.session.token,
            res,
         });
      }

      res.redirect("/books");
   });
}


const getEditBookView = (req, res) => {
   const { id } = req.params;
   const sql = "SELECT * FROM books WHERE id=$1";

   db.all(sql, [id], (err, rows) => {
      if(err) return console.error({ message: "Błąd przy próbie odczytu z bazy" });

      return renderView({
         pathToViewFile: "books/edit",
         documentTitle: "Edycja danych",
         data: rows,
         sessionToken: req.session.token,
         res,
      });
   })
};

const editBook = (req, res) => {
   const { title, author_name, author_lastname, publish_year, about } = req.body;
   const  { id } = req.params;

   const sqlUpdate = `
      UPDATE books
      SET title=$1, author_name=$2, author_lastname=$3, first_publish_year=$4, about=$5
      WHERE id=$6
   `;

   db.all(sqlUpdate, [title, author_name, author_lastname, publish_year, about, id], (err, rows)=>{
      if (err) {
         console.error(`Błąd przy próbie zapisu do bazy`, err.message);

         return renderView({
            pathToViewFile: "books/edit",
            documentTitle: "Edycja danych",
            message: `Błąd przy próbie zapisu do bazy, ${err.message}`,
            data: rows,
            sessionToken: req.session.token,
            res,
         });
      }

      res.redirect("/books");
   });
};

const deleteBook = (req, res) => {
   const  { id } = req.params;
   const deleteBookQuery = "DELETE FROM books WHERE id=$1"

   db.all(deleteBookQuery, [id], (err, rows)=>{
      if (err) {
         console.error(`Błąd przy próbie usunięcia książki z bazy`, err.message);

         return renderView({
            pathToViewFile: "books/list",
            documentTitle: "Nasze książki",
            message: `Błąd przy próbie usunięcia książki z bazy, ${err.message}`,
            data: rows,
            sessionToken: req.session.token,
            res,
         });
      }

      res.redirect("/books");
   });
}

module.exports = {
   getAllBooks,
   getAddBookView,
   getEditBookView,
   addBook,
   editBook,
   deleteBook,
};