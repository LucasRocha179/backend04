const router = require("express").Router();
const produto = require("../controller/produto.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.get("/find/:id", authMiddleware, produto.find);
router.get("/findAll", authMiddleware, produto.findAll);

router.post("/create", authMiddleware, produto.create);

router.put("/update/:id", authMiddleware, produto.update);

router.delete("/remove/:id", authMiddleware, produto.deleteProduto);


module.exports = router;