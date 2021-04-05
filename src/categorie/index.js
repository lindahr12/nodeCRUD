const categorie = require("./controller");
const auth = require("../middleware/auth");
const router = require("express").Router();
router.get("/", categorie.find);
router.get("/:id", categorie.findById);
router.post("/", categorie.create);
router.put("/:id", categorie.update);
router.delete("/:id", categorie.delete);
module.exports = router;