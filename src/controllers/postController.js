const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// Conexão com o banco de dados
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'sua_senha',
//   database: 'inkmind'
// });

// Rota para publicar um comentário
router.post('/publicar', (req, res) => {
  const { texto, idUsuario } = req.body;

  if (!texto || !idUsuario) {
    return res.status(400).json({ erro: 'Texto ou ID do usuário ausente.' });
  }

  const sql = 'INSERT INTO postagem (caracteres, fkUsuario) VALUES (?, ?)';
  const valores = [texto, idUsuario];

  db.query(sql, valores, (erro, resultado) => {
    if (erro) {
      console.error('Erro ao inserir comentário:', erro);
      return res.status(500).json({ erro: 'Erro ao publicar o comentário.' });
    }

    console.log(`Comentário inserido: "${texto}" do usuário com ID ${idUsuario}`);
    res.status(200).json({ mensagem: 'Comentário publicado com sucesso!' });
  });
});

module.exports = router;
