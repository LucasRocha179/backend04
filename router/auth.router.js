const router = require("express").Router();
const authController = require("../controller/auth.controller");

router.post("/login", authController.loginController);
router.post("/valida-token", authController.checkTokenController);

module.exports = router;