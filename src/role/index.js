const role = require("./controller");
const auth = require("../middleware/auth");
const router = require("express").Router();
router.get("/", role.find);
router.get("/:id", role.findById);
router.post("/", role.create);
router.put("/:id", role.update);
router.delete("/:id", role.delete);

module.exports = router;