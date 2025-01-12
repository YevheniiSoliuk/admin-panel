const express = require("express");
const router = express.Router();

const { getLoginView, login, logout } = require("../controllers/auth");

router.get("/login", getLoginView);
router.post("/login", login);
router.get("/logout", logout);

 module.exports = router;