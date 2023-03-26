const router = require("express").Router();
const produto = require("../controller/produto.controller");

const authMiddleware = require("../middleware/auth.middleware");
const paginacaoMiddleware = require("../middleware/paginacao.middleware");

const { validaProdutos, validaId } = require("../middleware/validacao.middleware");

router.get("/find/:id", validaId,  authMiddleware, produto.find);
router.get("/findAll", paginacaoMiddleware, authMiddleware, produto.findAll);

router.post("/create", validaProdutos, authMiddleware, produto.create);
router.post("/addCategoria/:id", validaId, authMiddleware, produto.addCategoria);

router.put("/update/:id", validaId,  authMiddleware, produto.update);

router.delete("/remove/:id", validaId, authMiddleware, produto.deleteProduto);
router.delete("/removeCategoria/:id", validaId, authMiddleware, produto.removeCategoria);

module.exports = router;