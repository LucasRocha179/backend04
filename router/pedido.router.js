const router = require("express").Router();
const pedido = require("../controller/pedido.controller");

const authMiddleware = require("../middleware/auth.middleware");
const { validaPedido, validaId } = require("../middleware/validacao.middleware");
const paginacaoMiddleware = require("../middleware/paginacao.middleware");

router.get("/find/:id", validaId,  authMiddleware, pedido.find);
router.get("/findAll", paginacaoMiddleware, authMiddleware, pedido.findAll);

router.post("/create", validaPedido, authMiddleware, pedido.create);

router.put("/update/:id", validaId, authMiddleware, pedido.update);
router.patch("/updateStatus/:id", validaId , authMiddleware, pedido.updateStatus);

router.delete("/remove/:id", validaId,  authMiddleware, pedido.deletePedido);


module.exports = router;