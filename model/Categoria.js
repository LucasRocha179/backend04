const mongoose = require("mongoose");

const categoriaScheme = new mongoose.Schema(
    {
        nome: {type: String, unique: true, required: true},
        createdAt: {type: Date, required: true, default: Date.now},
    }
);

const Categoria = mongoose.model("categorias", categoriaScheme);
  
module.exports = Categoria;