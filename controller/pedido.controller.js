const pedidoService = require("../services/pedido.service");

const findAll = async (req, res) => {
    console.log("LOG: requested findAllPedidos");
    try {
        return res.status(200).send(await pedidoService.findAllPedidos());
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
        console.log(`LOG: requested findPedido ${req.params.id}`);
        const pedido = await pedidoService.findPedido(id);
        if (pedido == null) {
            return res.status(404).send("Pedido não encontrada!");
        }
        return res.status(200).send(pedido);
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
        console.log(`LOG: novo pedido`);
        res.status(201).send(await pedidoService.createPedido(req.body));
    } catch (e) {
        return res.status(400).send({ message: e.message });
    }
};

const update = async (req, res) => {
    
    const id = req.params.id;
    const corpo = req.body;

    try {
        const pedido = await pedidoService.findPedido(id);
        if (pedido == null) {
            return res.status(500).send(`O pedido ${id} não existe na base!`);
        }

        try {
            res.status(201).send(
                await pedidoService.updatePedido(id, corpo).then(() => {
                    console.log(`LOG: pedido editado!`);
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

const updateStatus = async (req, res) => {
    
    const id = req.params.id;

    try {
        const pedido = await pedidoService.findPedido(id);
        if (pedido == null) {
            return res.status(500).send(`O pedido ${id} não existe na base!`);
        }

        try {
            res.status(201).send(
                await pedidoService.updateStatusPedido(id).then(() => {
                    console.log(`LOG: Status pedido editado!`);
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

const deletePedido = async (req, res) => {
    try {
        if (req.params.id == null) {
            return res.send({ message: "parametro vazio!" });
        }
        const id = req.params.id;

        const deletedPedido = await pedidoService.deletePedido(id);

        if (deletedPedido == null) {
            res.status(404).send({ message: "Pedido não encontrada, tente novamente!" });
        } else {
            res.status(200).send({ message: "Pedido excluída!" });
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
    deletePedido,
    updateStatus
};
