const router = require("express").Router();
const usuario = require("../controller/usuario.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.get("/find/:id", usuario.find);
router.get("/findAll", authMiddleware, usuario.findAll);

router.post("/create", usuario.create);
router.post("/addAddress/:id", usuario.addUserAddress);
router.post("/addFavProdct/:id", usuario.addUserFavProduct);

router.put("/update/:id", usuario.update);

router.delete("/remove/:id", usuario.deleteUser);
router.delete('/removeAddress', usuario.removeUserAddress);
router.delete('/removeFavProduct', usuario.removeUserFavProduct);


module.exports = router;