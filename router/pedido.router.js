const router = require("express").Router();
const pedido = require("../controller/pedido.controller");

const authMiddleware = require("../middleware/auth.middleware");
const { validaPedido } = require("../middleware/validacao.middleware");

router.get("/find/:id", authMiddleware, pedido.find);
router.get("/findAll", authMiddleware, pedido.findAll);

router.post("/create", validaPedido, authMiddleware, pedido.create);

router.put("/update/:id", authMiddleware, pedido.update);
router.patch("/updateStatus/:id", authMiddleware, pedido.updateStatus);

router.delete("/remove/:id", authMiddleware, pedido.deletePedido);


module.exports = router;