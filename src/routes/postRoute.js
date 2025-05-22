const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/', postController.criar);
router.get('/', postController.listar);
router.post('/:id/like', postController.curtir);
router.post('/:id/comment', postController.comentar);
router.get('/:id/comments', postController.comentarios);

module.exports = router;

console.log('Erro na route')