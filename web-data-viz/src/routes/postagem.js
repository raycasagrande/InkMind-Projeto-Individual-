const express = require('express');
const router = express.Router();

var postController = require("../controllers/postController");

// Rota para publicar

router.post("/publicarPostagem", function (req, res) {
    postController.publicarPostagem(req, res);
})

// Rota para buscar postagens

router.post("/buscarPostagem", function (req, res) {
    postController.buscarPostagem(req, res);
})

module.exports = router;



// var express = require('express'); // carrega o módulo express, framework para criar o servidor de rotas
// var router = express.Router(); // define rotas específicas
// var postController = require('../controllers/postController');

// router.post('/publicar', function (req, res){
//     postController.publicar(req, res);
// });


// const db = require('../database/config'); 

// router.post('/publicar', (req, res) => {
//   const { caracteres, fkUsuario } = req.body;
  
//   if (!caracteres || !fkUsuario) {
//     return res.status(400).json({ erro: 'Dados incompletos' });
//   }
  
//   console.log('Postagem recebida:', caracteres, fkUsuario);
  
//   const sql = 'INSERT INTO postagem (caracteres, fkUsuario) VALUES (?, ?)';
//   const valores = [caracteres,fkUsuario];
//   console.log('Erro ao inserir postagem', erro);

//   db.query(sql, [caracteres, fkUsuario, fkPostagem], (err, result) => {
//     if (err) {
//       console.error('Erro ao salvar comentário:', err);
//       return res.status(500).json({ erro: 'Erro ao salvar comentário' });
//     }
    
//     res.status(201).json({ mensagem: 'Comentário publicado com sucesso!' });
//   });
// });

// module.exports = router;

