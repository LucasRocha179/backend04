const router = require("express").Router();
const carrinho = require("../controller/carrinho.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.get("/find/:id", authMiddleware, carrinho.find);
router.get("/findAll", authMiddleware, carrinho.findAll);

router.post("/create", authMiddleware, carrinho.create);

router.put("/update/:id", authMiddleware, carrinho.update);

router.delete("/remove/:id", authMiddleware, carrinho.deleteCarrinho);


module.exports = router;