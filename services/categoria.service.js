const Categoria = require("../model/Categoria");

const findCategoria = (id) => {
    return Categoria.findById(id);
}

const findAllCategorias = () => {
    return Categoria.find();
}

const createCategoria = (categoria) => {
    return Categoria.create(categoria);
}

const updateCategoria = (id, categoria) => {
    return Categoria.findByIdAndUpdate(id, categoria, {returnDocument: "after"});
}

const deleteCategoria = (id) => {
    return Categoria.findByIdAndRemove(id, { returnDocument: "after" });
}

module.exports = {
    findCategoria,
    findAllCategorias,
    createCategoria,
    updateCategoria,
    deleteCategoria
}