const express = require("express");
const router = express.Router();

const {
   getAllBooks,
   getEditBookView,
   getAddBookView,
   addBook,
   editBook,
   deleteBook
} = require("../controllers/books");
const { acessMiddleware } = require("../middlewares");

router.get("/", getAllBooks);
router.get("/add", acessMiddleware, getAddBookView);
router.post("/add", acessMiddleware, addBook);
router.get("/edit/:id", acessMiddleware, getEditBookView);
router.post("/edit/:id", acessMiddleware, editBook);
router.get("/delete/:id", acessMiddleware, deleteBook);

module.exports = router