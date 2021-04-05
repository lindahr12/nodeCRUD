const annonce = require("./controller");
const auth = require("../middleware/auth");
const router = require("express").Router();

var multer = require('multer');
var upload = multer({ dest: './upload/' });


router.get("/", annonce.find);
router.get("/:id", annonce.findById);

router.post("/", upload.fields([{ name: 'file', maxCount: 2 }, { name: 'image', maxCount: 8 }]), annonce.create);
router.put("/:id", annonce.update);
router.delete("/:id", annonce.delete);
module.exports = router;