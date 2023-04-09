const express = require("express");
require("dotenv").config();
const app = express();
// const request = require("request");

const connectToDatabase = require("./database/database");

const usuario = require("./router/usuario.router");
const produto = require("./router/produto.router");
const categoria = require("./router/categoria.router");
const carrinho = require("./router/carrinho.router");
const pedido = require("./router/pedido.router");
const auth = require("./router/auth.router");

const docs = require("./router/docs.router");

const port = 3000;

app.use(express.json());

connectToDatabase();

app.get("/", (req, res) => {
  // const url = req.body.url;

  // request(url, function(error, response, body){
  //   console.log('statusCode: ', response && response.statusCode);

  //   const resposta = JSON.parse(body);

  //   res.send(resposta);
  // })
  res.send(
    { message: "Seja bem-vindo a nossa pizzaria!" }
  );
});

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use("/usuario", usuario);
app.use("/produto", produto);
app.use("/categoria", categoria);
app.use("/carrinho", carrinho);
app.use("/pedido", pedido);
app.use("/docs", docs);
app.use("/auth", auth);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
