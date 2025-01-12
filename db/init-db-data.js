const db = require("./index");
const bcrypt = require("bcrypt");
const { initialUsersData, initialBooksData } = require("./initial-data");
const { saltRounds } = require("../config");

function initUsers() {
   const getUsersQuery = `SELECT * FROM users`;

   db.all(getUsersQuery, async (err, rows) => {
      if (err) {
         console.error("Bład podczas pobierania użytkowników!", err.message);
      }

      if (!rows || (rows && !rows.length)) {
         const insertUsersQuery = `
            INSERT INTO users(name, lastname, login, password, email, isAdmin)
            VALUES($1, $2, $3, $4, $5, $6)
         `;

         for (const initUserData of initialUsersData) {
            const hashedPassword = await bcrypt.hash(initUserData.password, Number(saltRounds));
            initUserData.password = hashedPassword;

            db.all(
               insertUsersQuery,
               Object.values(initUserData),
               (err, rows) => {
                  if (err) {
                     console.error("Błąd przy próbie zapisu użytkowników do bazy ", err.message);
                  }

                  if (rows && rows.length) {
                     console.log("Użytkowników pomyślnie dodano do bazy");
                  }
               }
            );
         }
      }
   });
}

function initBooks() {
   const getBooksQuery = `SELECT * FROM books`;

   db.all(getBooksQuery, async (err, rows) => {
      if (err) {
         console.error("Bład podczas pobierania ksiązek!", err.message);
      }

      if (!rows || (rows && !rows.length)) {
         const insertBooksQuery = `
            INSERT INTO books(title, author_name, author_lastname, first_publish_year, about)
            VALUES($1, $2, $3, $4, $5)
         `;

         initialBooksData.forEach((initBookData) => {
            db.all(
               insertBooksQuery,
               Object.values(initBookData),
               (err, rows) => {
                  if (err) {
                     console.error("Błąd przy próbie zapisu ksiązek do bazy ", err.message);
                  }

                  if (rows && rows.length) {
                     console.log("Książki pomyślnie dodano do bazy");
                  }
               }
            );
         });
      }
   });
}

function initDBData() {
   initUsers();
   initBooks();
}

module.exports = initDBData;