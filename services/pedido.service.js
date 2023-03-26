const Pedido = require("../model/Pedido");

const findPedido = (id) => {
    return Pedido.findById(id);
}

const findAllPedidos = () => {
    return Pedido.find();
}

const createPedido = (pedido) => {
    return Pedido.create(pedido);
}

const updatePedido = (id, pedido) => {
    return Pedido.findByIdAndUpdate(id, pedido, {returnDocument: "after"});
}

const updateStatusPedido = (id) => {
    return Pedido.findOneAndUpdate({ _id: id },{ $set: { concluido: true }});
}

const deletePedido = (id) => {
    return Pedido.findByIdAndRemove(id, { returnDocument: "after" });
}

module.exports = {
    findPedido,
    findAllPedidos,
    createPedido,
    updatePedido,
    deletePedido,
    updateStatusPedido
}