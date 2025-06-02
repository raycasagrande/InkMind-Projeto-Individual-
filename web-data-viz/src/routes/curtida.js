const express = require('express');
const router = express.Router();
const conexao = require('../database/conexao');

router.post('/registrar', (req, res) => {
  const { idUsuario, idPostagem } = req.body;

  const query = `INSERT INTO curtida (idUsuario, idPostagem) VALUES (?, ?)`;

  conexao.query(query, [idUsuario, idPostagem], (erro, resultado) => {
    if (erro) {
      console.error('Erro ao registrar curtida:', erro);
      res.status(500).json({ erro: 'Erro no servidor' });
    } else {
      res.json({ mensagem: 'Curtida registrada com sucesso' });
    }
  });
});

module.exports = router;
