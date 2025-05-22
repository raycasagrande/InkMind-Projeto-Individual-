

var post = require('../models/postModel');

 console.log('Controller dando erro');

exports.criar = (req, res) => {

  var { userId, texto } = req.body;

  post.criarPostagem(userId, texto, (err, result) => {

    if (err) return res.status(500).json(err);

    res.json({ idPostagem: result.insertId, texto });

  });
};

exports.listar = (req, res) => {
 post.listarPostagens((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.curtir = (req, res) => {
  var postId = req.params.id;
  var { userId } = req.body;
  post.curtirPostagem(postId, userId, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ sucesso: true });
  });
};

exports.comentar = (req, res) => {
  const postId = req.params.id;
  const { userId, texto } = req.body;
  post.comentarPostagem(postId, userId, texto, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ sucesso: true });
  });
};

exports.comentarios = (req, res) => {
  const postId = req.params.id;
  post.listarComentarios(postId, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
