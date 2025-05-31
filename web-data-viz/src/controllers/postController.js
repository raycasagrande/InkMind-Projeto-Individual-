var postModel = require("../models/postModel");

function publicarPostagem(req, res) {

  var comentario = req.body.caracteresServer;
  var idUsuario = req.body.fkUsuarioServer;

  postModel.publicarPostagem(comentario, idUsuario)
    .then((resultadoUsuarios) => {
      console.log("Resultado do banco: resultadoUsuários")
        res.json({
          idUsuario: resultadoUsuarios.insertId,
        });
    }
    ).catch(
      function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );

}

function buscarPostagem(req, res) {

  var idUsuario = req.body.fkUsuarioServer;

  postModel.buscarPostagem(idUsuario)
    .then((resultadosPostagem) => {
      console.log("Resultado do banco: resultadoUsuários")
        res.json({
          publicacoes: resultadosPostagem,
        });
    }
    ).catch(
      function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );

}

// function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  // var nome = req.body.nomeServer;
  // var nick = req.body.nickServer;
  // var email = req.body.emailServer;
  // var senha = req.body.senhaServer;

  // Faça as validações dos valores
  // if (nome == undefined) {
  //   res.status(400).send("Seu nome está undefined!");
  // } if (nick == undefined) {
  //   res.status(400).send("Seu nickname está undefined!");
  // } else if (email == undefined) {
  //   res.status(400).send("Seu email está undefined!");
  // } else if (senha == undefined) {
  //   res.status(400).send("Sua senha está undefined!");
  // } else {

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
//     usuarioModel.cadastrar(nome, nick, email, senha)
//       .then(
//         function (resultado) {
//           res.json(resultado);
//         }
//       ).catch(
//         function (erro) {
//           console.log(erro);
//           console.log(
//             "\nHouve um erro ao realizar o cadastro! Erro: ",
//             erro.sqlMessage
//           );
//           res.status(500).json(erro.sqlMessage);
//         }
//       );
//   }
// }

module.exports = {
  publicarPostagem,
  buscarPostagem
}