const express = require("express");
require("dotenv").config();
const app = express();
// const request = require("request");

const connectToDatabase = require("./database/database");

const usuario = require("./router/usuario.router");
const auth = require("./router/auth.router");

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
    {message: "Seja bem-vindo a nossa pizzaria!"}
  );
});

app.use("/usuario", usuario);
app.use("/auth", auth);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
