const categoriaService = require("../services/categoria.service");

const findAll = async (req, res) => {
    console.log("LOG: requested findAllCategorias");
    try {
        return res.status(200).send(await categoriaService.findAllCategorias());
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
        console.log(`LOG: requested findCategoria ${req.params.id}`);
        const categoria = await categoriaService.findCategoria(id);
        if (categoria == null) {
            return res.status(404).send("Categoria não encontrada!");
        }
        return res.status(200).send(categoria);
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
        console.log(`LOG: novo categoria ${req.body.nome}`);
        res.status(201).send(await categoriaService.createCategoria(corpo));
    } catch (e) {
        return res.status(400).send({ message: e.message });
    }
};

const update = async (req, res) => {
    if (req.params.id == null) {
        return res.send({ message: "parametro vazio!" });
    }
    const id = req.params.id;
    const category = req.body;

    try {
        const categoria = await categoriaService.findCategoria(id);
        if (categoria == null) {
            return res.status(500).send(`O categoria ${id} não existe na base!`);
        }

        try {
            res.status(201).send(
                await categoriaService.updateCategoria(id, category).then(() => {
                    console.log(`LOG: ${category.nome} editado!`);
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

const deleteCategoria = async (req, res) => {
    try {
        if (req.params.id == null) {
            return res.send({ message: "parametro vazio!" });
        }
        const id = req.params.id;

        const deletedCategoria = await categoriaService.deleteCategoria(id);

        if (deletedCategoria == null) {
            res.status(404).send({ message: "Categoria não encontrada, tente novamente!" });
        } else {
            res.status(200).send({ message: "Categoria excluída!" });
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
    deleteCategoria,
};
