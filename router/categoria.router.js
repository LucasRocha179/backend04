const router = require("express").Router();
const categoria = require("../controller/categoria.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.get("/find/:id", authMiddleware, categoria.find);
router.get("/findAll", authMiddleware, categoria.findAll);

router.post("/create", authMiddleware, categoria.create);

router.put("/update/:id", authMiddleware, categoria.update);

router.delete("/remove/:id", authMiddleware, categoria.deleteCategoria);


module.exports = router;