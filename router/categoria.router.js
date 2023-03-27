const router = require("express").Router();
const categoria = require("../controller/categoria.controller");

const authMiddleware = require("../middleware/auth.middleware");
const {validaId} = require("../middleware/validacao.middleware");
const paginacaoMiddleware = require("../middleware/paginacao.middleware");

router.get("/find/:id", validaId, authMiddleware, categoria.find);
router.get("/findAll", paginacaoMiddleware, authMiddleware, categoria.findAll);

router.post("/create", authMiddleware, categoria.create);

router.put("/update/:id", validaId, authMiddleware, categoria.update);

router.delete("/remove/:id", validaId, authMiddleware, categoria.deleteCategoria);


module.exports = router;