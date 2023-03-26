const carrinhoService = require("../services/carrinho.service");

const findAll = async (req, res) => {
    console.log("LOG: requested findAllCarrinhos");
    try {
        return res.status(200).send(await carrinhoService.findAllCarrinhos());
    } catch (err) {
        return res
            .status(500)
            .send("Erro no servidor, tente novamente mais tarde!");
    }
};

const find = async (req, res) => {
    try {
        const id = req.params.id;
        if (id == null) {
            return res.send({ message: "parametro vazio!" });
        }
        console.log(`LOG: requested findCarrinho ${req.params.id}`);
        const carrinho = await carrinhoService.findCarrinho(id);
        if (carrinho == null) {
            return res.status(404).send("Carrinho não encontrada!");
        }
        return res.status(200).send(carrinho);
    } catch (err) {
        if (err.kind == "ObjectId") {
            return res
                .status(400)
                .send("Id informado está incorreto, tente novamente!");
        }

        return res
            .status(500)
            .send("Erro no servidor, tente novamente mais tarde!");
    }
};

const create = async (req, res) => {
    try {
        console.log(`LOG: novo carrinho`);
        res.status(201).send(await carrinhoService.createCarrinho(req.body));
    } catch (e) {
        return res.status(400).send({ message: e.message });
    }
};

const update = async (req, res) => {
    
    const id = req.params.id;
    const corpo = req.body;

    try {
        const carrinho = await carrinhoService.findCarrinho(id);
        if (carrinho == null) {
            return res.status(500).send(`O carrinho ${id} não existe na base!`);
        }

        try {
            res.status(201).send(
                await carrinhoService.updateCarrinho(id, corpo).then(() => {
                    console.log(`LOG: carrinho editado!`);
                })
            );
        } catch (e) {
            return res.status(400).send({ message: e.message });
        }
    } catch (err) {
        return res
            .status(500)
            .send("Erro no servidor, tente novamente mais tarde!");
    }
};

const deleteCarrinho = async (req, res) => {
    try {
        if (req.params.id == null) {
            return res.send({ message: "parametro vazio!" });
        }
        const id = req.params.id;

        const deletedCarrinho = await carrinhoService.deleteCarrinho(id);

        if (deletedCarrinho == null) {
            res.status(404).send({ message: "Carrinho não encontrada, tente novamente!" });
        } else {
            res.status(200).send({ message: "Carrinho excluída!" });
        }
    } catch (err) {
        return res
            .status(500)
            .send("Erro no servidor, tente novamente mais tarde!");
    }
};

module.exports = {
    findAll,
    find,
    create,
    update,
    deleteCarrinho,
};
