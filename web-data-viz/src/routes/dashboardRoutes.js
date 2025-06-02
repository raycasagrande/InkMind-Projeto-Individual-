const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Rota para KPIs diárias (curtidas e comentários do dia)
router.get('/kpis-diarias/:idUsuario', dashboardController.obterKpisDiarias);

// Rota para dados mensais (postagens e curtidas por mês)
router.get('/dados-mensais/:idUsuario', dashboardController.obterDadosMensais);

module.exports = router;
