const Post = require('../models/postModel');

exports.criar = (req, res) => {
  const { userId, texto } = req.body;
  Post.criarPostagem(userId, texto, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ idPostagem: result.insertId, texto });
  });
};

exports.listar = (req, res) => {
  Post.listarPostagens((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.curtir = (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  Post.curtirPostagem(postId, userId, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ sucesso: true });
  });
};

exports.comentar = (req, res) => {
  const postId = req.params.id;
  const { userId, texto } = req.body;
  Post.comentarPostagem(postId, userId, texto, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ sucesso: true });
  });
};

exports.comentarios = (req, res) => {
  const postId = req.params.id;
  Post.listarComentarios(postId, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
