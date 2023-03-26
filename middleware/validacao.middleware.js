const objectId = require("mongoose").Types.ObjectId;

const validaPedido = (req, res, next) => {
    let erros = [];
    if(!req.body.produtos){
        erros.push("produtos")    
    }
    if(!req.body.precoTotal){
        erros.push("precoTotal")    
    }
    if(erros.length == 0){
        return next();
    } else {
        return res.status(400).send({message: `Campo(s) ${erros} não informado(s)`});   
    }
}

const validaEndereco = (req, res, next) => {
    let erros = [];
    let enderecos = [];
    enderecos.push(req.body);
    enderecos.map((value, key) => {
        if(!value.rua){
            erros.push(`'${key+1}' - rua`)    
        }
        if(!value.numero){
            erros.push(`'${key+1}' - numero`)    
        }
        if(!value.CEP){
            erros.push(`'${key+1}' - cep`)    
        }
    });

    if(erros.length == 0){
        return next();
    } else {
        return res.status(400).send({message: `Campo(s) ${erros} não informado(s)`});   
    }
}

const validaLogin = (req, res, next) => {
    let erros = [];
    if(!req.body.email){
        erros.push("email")    
    }
    if(!req.body.senha){
        erros.push("senha")    
    }
    if(erros.length == 0){
        return next();
    } else {
        return res.status(400).send({message: `Campo(s) ${erros} não informado(s)`});   
    }
}

const validaProdutos = (req, res, next) => {
    let erros = [];
    if(!req.body.nome){
        erros.push("nome")    
    }
    if(!req.body.descricao){
        erros.push("descricao")    
    }
    if(!req.body.precoUnitario){
        erros.push("precoUnitario")    
    }
    if(!req.body.codigoBarra){
        erros.push("codigoBarra")    
    }
    if(erros.length == 0){
        return next();
    } else {
        return res.status(400).send({message: `Campo(s) ${erros} não informado(s)`});   
    }
}

const validaId = (req, res, next) => {
    if(objectId.isValid(req.params.id)){
        return next();
    } else{
        return res.status(400).send({message: `Campo ID inválido`});   
    }
}

module.exports = {
    validaPedido,
    validaProdutos,
    validaEndereco,
    validaId,
    validaLogin,
}