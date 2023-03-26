const router = require("express").Router();
const carrinho = require("../controller/carrinho.controller");

const authMiddleware = require("../middleware/auth.middleware");
const {validaPedido, validaId} = require("../middleware/validacao.middleware");

router.get("/find/:id", validaId, authMiddleware, carrinho.find);
router.get("/findAll", authMiddleware, carrinho.findAll);

router.post("/create", validaPedido, authMiddleware, carrinho.create);

router.put("/update/:id", validaId, authMiddleware, carrinho.update);

router.delete("/remove/:id", validaId, authMiddleware, carrinho.deleteCarrinho);


module.exports = router;