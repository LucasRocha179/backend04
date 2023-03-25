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
    return Produto.findByIdAndUpdate(id, produto, {returnDocument: "after"});
}

const deleteProduto = (id) => {
    return Produto.findByIdAndRemove(id, { returnDocument: "after" });
}

module.exports = {
    findProduto,
    findAllProdutos,
    createProduto,
    updateProduto,
    deleteProduto
}