const UserMongo = require("../model/usuario");

const findUser = (id) => {
    return UserMongo.findById(id);
}

const findAllUser = () => {
    return UserMongo.find();
}

const createUser = (usuario) => {
    return UserMongo.create(usuario);
}

const updateUser = (id, usuario) => {
    return UserMongo.findByIdAndUpdate(id, usuario, {returnDocument: "after"});
}

const deleteUser = (id) => {
    return UserMongo.findByIdAndRemove(id, { returnDocument: "after" });
}

const addUserAddress = (id, endereco) => {

}

const removeUserAddress = (id) => {

}

const addUserFavProduct = (id, produto) => {
  
}

const removeUserFavProduct = (id) => {
    
}

module.exports = {
    findUser,
    findAllUser,
    createUser,
    updateUser,
    deleteUser,
    addUserAddress,
    removeUserAddress,
    addUserFavProduct,
    removeUserFavProduct
}