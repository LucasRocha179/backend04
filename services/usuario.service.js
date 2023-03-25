const UserMongo = require("../model/Usuario");

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
    return UserMongo.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $push:{
                enderecos: endereco,
            }
        },
        {
            rawresult: true,
        }
    );
}

const removeUserAddress = (id, addressId) => {
    return UserMongo.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $pull:{
                enderecos: {
                    _id: addressId,
                },
            }
        },
        {
            rawresult: true,
        }
    );
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