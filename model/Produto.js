const mongoose = require("mongoose");

const produtoScheme = new mongoose.Schema(
    {
        nome: {type: String, unique: true, required: true},
        descricao: {type: String, required: true},
        precoUnitario: {type: Number, required: true},
        imagem: {type: String, required: true},
        codigoBarra: {type: Number, unique: true, required: true},
        categoria: [{
            _id: {type: mongoose.Schema.Types.ObjectId, required: true, unique: true, ref: "categorias"},
            createdAt: {type: Date, required: true}
        }],        
        createdAt: {type: Date, required: true},
    }
);

const Produto = mongoose.model("produtos", produtoScheme);
  
module.exports = Produto;