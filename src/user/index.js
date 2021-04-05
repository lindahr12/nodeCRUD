const user = require("./controller");
const router = require("express").Router();
const authMid = require("../middleware/auth")
const admin = require("../middleware/admin")
const auth = require("./auth")
router.post("/", user.create);
router.get("/:id", user.findById);
router.get("/", user.find);
router.put("/:id", user.update);
router.delete("/:id", user.delete);
router.post("/login", auth.login);
router.post("/current", auth.currentUser)
module.exports = router;