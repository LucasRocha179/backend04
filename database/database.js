const mongoose = require("mongoose");

function connectToDatabase() {
    mongoose.connect("mongodb://admin:XXXXXXXX@89.116.214.208:27017/usuarios?authSource=admin", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Mongo conectado!");
    }).catch((error) => {
        return console.log("Erro na conexão com o banco ",error);
    })
}

module.exports = connectToDatabase;