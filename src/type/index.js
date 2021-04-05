const type = require("./controller");
const auth = require("../middleware/auth");
const router = require("express").Router();
router.get("/", type.find);
router.get("/:id", type.findById);
router.post("/", type.create);
router.put("/:id", type.update);
router.delete("/:id", type.delete);
module.exports = router;