const express = require("express");
const router = express.Router();
const { getUsersView, getAddUserView, addUser } = require("../controllers/users");

router.get("/", getUsersView);
router.get("/add", getAddUserView);
router.post("/add", addUser);

module.exports = router;
