const mongoose = require("mongoose");

const pedidoScheme = new mongoose.Schema(
    {
        produtos: [{
            _id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "produtos"},
            quantidade: { type: Number, required: true }
        }],        
        createdAt: {type: Date, required: true, default: Date.now },
        precoTotal: { type: Number, required: true},
        frete: { type: Number, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "usuarios" }, 
        concluido: {type: Boolean, default: false, required: true},
        vinculaMesa: { type: Number, required: false },
        enderecoEntrega: {
            rua: {type: String, required: false},
            numero: {type: String, required: false},
            complemento: {type: String, required: false},
            CEP: {type: String, required: false}
        }
    }
);

const Pedido = mongoose.model("pedidos", pedidoScheme);
  
module.exports = Pedido;