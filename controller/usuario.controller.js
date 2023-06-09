const userService = require("../services/usuario.service");
const authService = require("../services/auth.service");
class Usuario {
  constructor(nome, nascimento, email, senha, isAdmin = true, imagem = "undefined") {
    this.nome = this.validarNome(nome);
    this.nascimento = this.validarData(nascimento);
    this.email = this.validarEmail(email);
    this.userID = this.criaUserID(email);
    this.senha = this.validarSenha(senha);
    this.datacadastro = this.getData();
    this.isAdmin = isAdmin;
    this.imagem = imagem;
  }

  validarNome(nome) {
    if (!nome) {
      throw new Error("Campo nome é obrigatório");
    }
    return nome;
  }

  validarData(data) {
    if (!this.isDataValida(data)) {
      throw new Error("Data de nascimento inválida. Use o formato DD/MM/AAAA.");
    }
    return data;
  }

  isDataValida(data) {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(data)) {
      return false;
    }
    const [dia, mes, ano] = data.split("/");
    const dataObj = new Date(ano, mes - 1, dia);
    const dataValida =
      dataObj.getFullYear() == ano &&
      dataObj.getMonth() == mes - 1 &&
      dataObj.getDate() == dia;
    return dataValida;
  }

  criaUserID(email) {
    const encodedEmail = Buffer.from(email).toString("base64");
    return encodedEmail;
  }

  validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      throw new Error("Endereço de email inválido.");
    }
    return email;
  }

  validarSenha(senha) {
    if (!senha) {
      throw new Error("Campo senha é obrigatório!");
    }
    return senha;
  }

  getData() {
    const date = new Date();
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "numeric",
    });
  }
}

const findAll = async (req, res) => {
  console.log("LOG: requested findAllUsers");
  try {
    return res.status(200).send(await userService.findAllUser());
  } catch (err) {
    return res
      .status(500)
      .send("Erro no servidor, tente novamente mais tarde!");
  }
};

const find = async (req, res) => {
  try {
    const id = req.params.id;
    if (id == null) {
      return res.send({ message: "parametro vazio!" });
    }
    console.log(`LOG: requested findUser ${req.params.id}`);
    const usuario = await userService.findUser(id);
    if (usuario == null) {
      return res.status(404).send("Usuário não encontrado!");
    }
    return res.status(200).send(usuario);
  } catch (err) {
    if(err.kind == "ObjectId"){
      return res
      .status(400)
      .send("Id informado está incorreto, tente novamente!");
    }

    return res
      .status(500)
      .send("Erro no servidor, tente novamente mais tarde!");
  }
};

const create = async (req, res) => {
  if (req.body.nome == null) {
    return res.send({ message: "request body vazio!" });
  }
  const test = await authService.loginService(req.body.email);
  if(test){
    return res.status(400).send({ message: "Email já cadastrado!" });
  }
  try {
    const user = req.body;
    const usuario = new Usuario(
      user.nome,
      user.nascimento,
      user.email,
      user.senha,
      true,
      user.imagem
    );
    console.log(`LOG: ${usuario.datacadastro} novo usuário ${usuario.userID}`);
    res.status(201).send(await userService.createUser(usuario));
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};

const update = async (req, res) => {
  if (req.params.id == null) {
    return res.send({ message: "parametro vazio!" });
  }
  const id = req.params.id;
  const user = req.body;

  try {
    const usuario = await userService.findUser(id);
    if (usuario == null) {
      return res.status(500).send(`O usuário ${id} não existe na base!`);
    }

    try {
      const usuarioEdit = new Usuario(
        user.nome,
        user.nascimento,
        user.email,
        user.senha
      );
      res.status(201).send(
        await userService.updateUser(id, usuarioEdit).then(() => {
          console.log(`LOG: ${usuarioEdit.nome} editado!`);
        })
      );
    } catch (e) {
      return res.status(400).send({ message: e.message });
    }
  } catch (err) {
    return res
      .status(500)
      .send("Erro no servidor, tente novamente mais tarde!");
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.params.id == null) {
      return res.send({ message: "parametro vazio!" });
    }
    const id = req.params.id;

    const deletedUser = await userService.deleteUser(id);

    if(deletedUser == null){
      res.status(404).send({message: "Usuário não encontrato, tente novamente!"});
    } else {
      res.status(200).send({message: "Usuário excluído!"});
    }
  } catch (err) {
    return res
      .status(500)
      .send("Erro no servidor, tente novamente mais tarde!");
  }
};

const addUserAddress = async (req, res) => {
  try {
    req.body.createdAt = new Date();
    const endereco = await userService.addUserAddress(req.params.id, req.body);

    if (endereco) {
      return res
      .status(201)
      .send("Novo endereço cadastrado com sucesso!");  
    } else {
      return res
      .status(400)
      .send("Não inserido, tente novamente mais tarde!");  
    }    
  } catch (err) {
    return res
      .status(500)
      .send("Erro no servidor, tente novamente mais tarde!");
  }
};

const removeUserAddress = async (req, res) => {
  try {
    const endereco = await userService.removeUserAddress(req.body.id, req.body.addressId);
    let found = false;

    endereco.enderecos.map((valor, chave) => {
      if(valor._id == req.body.addressId){
        found = true;
      }
    })

    if (found){
      return res
      .status(200)
      .send("Endereço removido com sucesso!");  
    } else {
      return res
      .status(400)
      .send("Não removido, tente novamente mais tarde!");  
    }
  } catch (err) {
    return res
      .status(500)
      .send("Erro no servidor, tente novamente mais tarde!");
  }
};

const addUserFavProduct = async (req, res) => {
  try {
    return res
    .status(201)
    .send(await userService.addUserFavProduct(req.params.id, req.body)); 
  } catch (err) {
    return res
      .status(500)
      .send("Erro no servidor, tente novamente mais tarde!");
  }
};

const removeUserFavProduct = async (req, res) => {
  try {
    return res
    .status(201)
    .send(await userService.removeUserFavProduct(req.params.id, req.body)); 
  } catch (err) {
    return res
      .status(500)
      .send("Erro no servidor, tente novamente mais tarde!");
  }
};

module.exports = {
  findAll,
  find,
  create,
  update,
  deleteUser,
  addUserAddress,
  removeUserAddress,
  addUserFavProduct,
  removeUserFavProduct,
};
