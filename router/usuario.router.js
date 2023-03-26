const router = require("express").Router();
const usuario = require("../controller/usuario.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.get("/find/:id",authMiddleware, usuario.find);
router.get("/findAll", authMiddleware, usuario.findAll);

router.post("/create", usuario.create);
router.post("/addAddress/:id",authMiddleware, usuario.addUserAddress);
router.post("/addFavProdct/:id",authMiddleware, usuario.addUserFavProduct);

router.put("/update/:id",authMiddleware, usuario.update);

router.delete("/remove/:id",authMiddleware, usuario.deleteUser);
router.delete('/removeAddress',authMiddleware, usuario.removeUserAddress);
router.delete('/removeFavProduct/:id',authMiddleware, usuario.removeUserFavProduct);


module.exports = router;