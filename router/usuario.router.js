const router = require("express").Router();
const usuario = require("../controller/usuario.controller");

const authMiddleware = require("../middleware/auth.middleware");
const { validaId } = require("../middleware/validacao.middleware");

router.get("/find/:id", validaId,authMiddleware, usuario.find);
router.get("/findAll", authMiddleware, usuario.findAll);

router.post("/create", usuario.create);
router.post("/addAddress/:id", validaId,authMiddleware, usuario.addUserAddress);
router.post("/addFavProdct/:id", validaId, authMiddleware, usuario.addUserFavProduct);

router.put("/update/:id",validaId, authMiddleware, usuario.update);

router.delete("/remove/:id",validaId, authMiddleware, usuario.deleteUser);
router.delete('/removeAddress',authMiddleware, usuario.removeUserAddress);
router.delete('/removeFavProduct/:id',validaId, authMiddleware, usuario.removeUserFavProduct);

module.exports = router;