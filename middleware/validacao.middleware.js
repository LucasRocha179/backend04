const validaPedido = (req, res, next) => {
    if(!req.body.produtos){
        return res.status(400).send({message: `O campo produtos é obrigatório`})
    }
    if(!req.body.precoTotal){
        return res.status(400).send({message: `O campo precoTotal é obrigatório`})
    }
    return next();
}

module.exports = {
    validaPedido,
}