var express = require('express'); // carrega o módulo express, framework para criar o servidor de rotas
var router = express.Router(); // define rotas específicas
var postController = require('../controllers/postController');

router.post('/publicar', function (req, res) {
    postController.publicar(req, res);
});

module.exports = router;