const router = require("express").Router();
const authController = require("../controller/auth.controller");
const {validaLogin} = require("../middleware/validacao.middleware");

router.post("/login",validaLogin, authController.loginController);
router.post("/valida-token", authController.checkTokenController);

module.exports = router;