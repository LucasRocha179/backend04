const Carrinho = require("../model/Carrinho");

const findCarrinho = (id) => {
    return Carrinho.findById(id);
}

const findAllCarrinhos = (limit, offset) => {
    return Carrinho.find().limit(limit).skip(offset);
}

const createCarrinho = (carrinho) => {
    return Carrinho.create(carrinho);
}

const updateCarrinho = (id, carrinho) => {
    return Carrinho.findByIdAndUpdate(id, carrinho, {returnDocument: "after"});
}

const deleteCarrinho = (id) => {
    return Carrinho.findByIdAndRemove(id, { returnDocument: "after" });
}

module.exports = {
    findCarrinho,
    findAllCarrinhos,
    createCarrinho,
    updateCarrinho,
    deleteCarrinho
}