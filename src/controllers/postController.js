var postModel = require('../models/postModel');
var post = require('../models/postModel');

 console.log('Controller dando erro');

function publicar(req, res) {

  var idUsuario = req.body.idUsuario;
  var texto = req.body.texto;

  postModel.publicar(texto, idUsuario)
  .then(function (resultado){
    res.json(resultado);
  })
  .catch(function (erro){
    console.log("Erro ao publicar comentário", erro);
    res.status(500).json(erro.sqlMenssage);
  });
}
module.exports = {
  publicar
};