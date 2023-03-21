const mongoose = require("mongoose");

const userScheme = new mongoose.Schema(
    {
        nome: {type: String, required: true},
        nascimento: {type: String, required: false},
        email: {type: String, unique: true, required: true},
        userID: {type: String, required: true},
        senha: {type: String, required: true},
        imagem: {type: String, required: true},
        enderecos: [{
            rua: {type: String, required: true},
            numero: {type: String, required: true},
            complemento: {type: String, required: false},
            CEP: {type: String, required: true},
            createdAt: {type: Date, required: true}
        }],
        // produtos_fav: [{
        //     _id: {type: mongoose.Schema.Types.ObjectId, required: true, unique: true, ref: "produtos"},
        //     createdAt: {type: Date, required: true}
        // }],
        datacadastro: {type: String, required: false},
        isAdmin: {type: Boolean, required: true, default: false}
    }
);

const UserMongo = mongoose.model("usuario", userScheme);
  
module.exports = UserMongo;