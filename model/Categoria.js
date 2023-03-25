const mongoose = require("mongoose");

const categoriaScheme = new mongoose.Schema(
    {
        nome: {type: String, unique: true, required: true},
    }
);

const Categoria = mongoose.model("categorias", categoriaScheme);
  
module.exports = Categoria;