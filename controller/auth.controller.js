const authService = require("../services/auth.service");
const bcrypt = require("bcrypt");
const segredo = require("../utils/constants");

const loginController = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const user = await authService.loginService(email);

        if (!user) {
            return res.status(400).send({ message: "Usuário não encontrado!" });
        }

        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            return res.status(400).send({ message: "Senha inválida!" });
        }

        const token = authService.generateToken(user.id, segredo);

        res.status(200).send({
            email,
            token
        })
    } catch (err) {
        console.log(`erro: ${err}`);
    }
}

const checkTokenController = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(400).send({ message: "O Token não foi informado!" });
        }

        const parts = authHeader.split(" ");

        if (parts.length !== 2) {
            return res.status(401).send({ message: "token inválido!" });
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).send({ message: "token mal formatado!" });
        }

        const verify = authService.validateToken(token, segredo);

        if (verify) {
            return res.status(200).send(verify);
        }
    } catch (e) {
        console.log(`erro: ${err}`);
        return res
            .status(500)
            .send({ message: "Erro interno! Tente novamente mais tarde!" });
    }
}

module.exports = { loginController, checkTokenController };