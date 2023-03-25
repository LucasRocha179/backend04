const jwt = require("jsonwebtoken");
const { findUser } = require("../services/usuario.service");
const authService = require("../services/auth.service");
const segredo = require("../utils/constants");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({ message: "O token não foi informado!" });
        }

        const parts = authHeader.split(" "); // ["Bearer, <token>"]

        if (parts.length !== 2) {
            return res.status(401).send({ message: "O token é inválido!" });
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).send({ message: "token mal formatado!" });
        }

        const decoded = authService.validateToken(token, segredo);

        const user = await findUser(decoded);

        if (!user || !user.id) {
            return res.status(401).send({ message: "Token inválido!" })
        }

        req.userId = decoded.id;

        return next();

    } catch (e) {
        return res.status(500).send({ message: "Erro interno, tente mais tarde!" });
    }
}