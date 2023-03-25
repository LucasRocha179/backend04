const Produto = require("../model/Produto");

const findProduto = (id) => {
    return Produto.findById(id);
}

const findAllProdutos = () => {
    return Produto.find();
}

const createProduto = (produto) => {
    return Produto.create(produto);
}

const updateProduto = (id, produto) => {
    return Produto.findByIdAndUpdate(id, produto, { returnDocument: "after" });
}

const deleteProduto = (id) => {
    return Produto.findByIdAndRemove(id, { returnDocument: "after" });
}

const addCategoria = (id, categoria) => {
    return Produto.findOneAndUpdate(
        {
            _id: id
        },
        {
            $push: {
                categoria: {
                    _id: categoria.id,
                    creatAt: categoria.createdAt
                },
            },
        },
        {
            rawResult: true,
        }
    );
}

const removeCategoria = (categoria) => {
    return Produto.findOneAndUpdate(
        {
            _id: categoria.id
        },
        {
            $pull: {
                categoria: {
                    _id: categoria.idCategoria
                },
            },
        },
        {
            rawResult: true,
        }
    );
}

module.exports = {
    findProduto,
    findAllProdutos,
    createProduto,
    updateProduto,
    deleteProduto,
    addCategoria,
    removeCategoria
}