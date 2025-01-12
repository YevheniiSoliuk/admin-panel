const { authMiddleware, acessMiddleware } = require("../middlewares");
const authRoute = require("./auth");
const usersRoute = require("./users");
const booksRoute = require("./books");

module.exports = (app) => {
  app.use("/auth", authRoute);
  app.use("/users", authMiddleware, acessMiddleware, usersRoute);
  app.use("/books", authMiddleware, booksRoute);
  app.use("/", authMiddleware, booksRoute);

  app.use(function (req, res) {
    res.status(405).json({
      error: "Method Not Allowed",
    });
  });
};
