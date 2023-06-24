const router = require("express").Router();
const {getUsers, addUser} = require("../controller/users");

router.route("/").get(getUsers).post(addUser);

module.exports = router;