const router = require("express").Router();
const usuario = require("../controller/usuario.controller");

const authMiddleware = require("../middleware/auth.middleware");
const { validaId, validaEndereco} = require("../middleware/validacao.middleware");
const paginacaoMiddleware = require("../middleware/paginacao.middleware");

router.get("/find/:id", validaId,authMiddleware, usuario.find);
router.get("/findAll", paginacaoMiddleware, authMiddleware, usuario.findAll);

router.post("/create", usuario.create);
router.post("/addAddress/:id", validaId, validaEndereco, authMiddleware, usuario.addUserAddress);
router.post("/addFavProdct/:id", validaId, authMiddleware, usuario.addUserFavProduct);

router.put("/update/:id",validaId, authMiddleware, usuario.update);

router.delete("/remove/:id",validaId, authMiddleware, usuario.deleteUser);
router.delete('/removeAddress',authMiddleware, usuario.removeUserAddress);
router.delete('/removeFavProduct/:id',validaId, authMiddleware, usuario.removeUserFavProduct);

module.exports = router;