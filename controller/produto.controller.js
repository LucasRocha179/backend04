const produtoService = require("../services/produto.service");

const findAll = async (req, res) => {
    console.log("LOG: requested findAllProdutos");
    try {
        return res.status(200).send(await produtoService.findAllProdutos(req.query.limit, req.query.offset));
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
        console.log(`LOG: requested findProduto ${req.params.id}`);
        const produto = await produtoService.findProduto(id);
        if (produto == null) {
            return res.status(404).send("Produto não encontrado!");
        }
        return res.status(200).send(produto);
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
    if (req.body.nome == null) {
        return res.send({ message: "request body vazio!" });
    }
    try {
        const corpo = {
            ...req.body,
            userId: req.userId,
            createdAt: new Date(),
        }
        console.log(`LOG: novo produto ${req.body.nome}`);
        res.status(201).send(await produtoService.createProduto(corpo));
    } catch (e) {
        return res.status(400).send({ message: e.message });
    }
};

const update = async (req, res) => {
    if (req.params.id == null) {
        return res.send({ message: "parametro vazio!" });
    }
    const id = req.params.id;
    const product = req.body;

    try {
        const produto = await produtoService.findProduto(id);
        if (produto == null) {
            return res.status(500).send(`O produto ${id} não existe na base!`);
        }

        try {
            res.status(201).send(
                await produtoService.updateProduto(id, product).then(() => {
                    console.log(`LOG: ${product.nome} editado!`);
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

const deleteProduto = async (req, res) => {
    try {
        if (req.params.id == null) {
            return res.send({ message: "parametro vazio!" });
        }
        const id = req.params.id;

        const deletedProduto = await produtoService.deleteProduto(id);

        if (deletedProduto == null) {
            res.status(404).send({ message: "Produto não encontrato, tente novamente!" });
        } else {
            res.status(200).send({ message: "Produto excluído!" });
        }
    } catch (err) {
        return res
            .status(500)
            .send("Erro no servidor, tente novamente mais tarde!");
    }
};

const addCategoria = async (req, res) => {
    try {
        const id = req.params.id;
        const categoria = await produtoService.addCategoria(id, req.body);
        res.status(200).send(categoria);
    } catch (err) {
        return res
            .status(500)
            .send("Erro no servidor, tente novamente mais tarde!");
    }
};


const removeCategoria = async (req, res) => {
    try {
        const id = req.params.id;
        const categoria = await produtoService.removeCategoria(id, req.body);
        res.status(200).send(categoria);
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
    deleteProduto,
    addCategoria,
    removeCategoria,
};
