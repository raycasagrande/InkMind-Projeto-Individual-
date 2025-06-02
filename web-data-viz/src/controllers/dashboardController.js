var database = require('../database/config');

function obterKpisDiarias(req, res) {
    var idUsuario = req.params.idUsuario;
    console.log("ID recebido:", idUsuario);

    var instrucaoCurtidas = `
        SELECT COUNT(*) AS total 
        FROM curtida 
        WHERE DATE(dataCurtida) = CURDATE() 
        AND fkUsuario = ${idUsuario};
    `;

    var instrucaoComentarios = `
        SELECT COUNT(*) AS total 
        FROM comentario 
        WHERE DATE(dataComentario) = CURDATE() 
        AND fkUsuario = ${idUsuario};
    `;

    database.executar(instrucaoCurtidas).then(function (resultadoCurtidas) {
        var totalCurtidas = resultadoCurtidas[0].total;

        database.executar(instrucaoComentarios).then(function (resultadoComentarios) {
            var totalComentarios = resultadoComentarios[0].total;

            res.status(200).json({
                curtidas: totalCurtidas,
                comentarios: totalComentarios
            });
        }).catch(function (erro) {
            console.error("Erro ao buscar comentários:", erro);
            res.status(500).json({ erro: "Erro ao buscar comentários" });
        });

    }).catch(function (erro) {
        console.error("Erro ao buscar curtidas:", erro);
        res.status(500).json({ erro: "Erro ao buscar curtidas" });
    });
}

function obterDadosMensais(req, res) {
    var idUsuario = req.params.idUsuario;

    var instrucaoPostagens = `
        SELECT MONTH(dataPostagem) AS mes, COUNT(*) AS total
        FROM postagem
        WHERE YEAR(dataPostagem) = YEAR(CURDATE()) 
        AND fkUsuario = ${idUsuario}
        GROUP BY mes;
    `;

    var instrucaoCurtidas = `
        SELECT MONTH(dataCurtida) AS mes, COUNT(*) AS total
        FROM curtida
        WHERE YEAR(dataCurtida) = YEAR(CURDATE()) 
        AND fkUsuario = ${idUsuario}
        GROUP BY mes;
    `;

    database.executar(instrucaoPostagens).then(function (resultadoPostagens) {
        database.executar(instrucaoCurtidas).then(function (resultadoCurtidas) {
            res.status(200).json({
                postagens: resultadoPostagens,
                curtidas: resultadoCurtidas
            });
        }).catch(function (erro) {
            console.error("Erro ao buscar curtidas mensais:", erro);
            res.status(500).json({ erro: "Erro ao buscar curtidas mensais" });
        });
    }).catch(function (erro) {
        console.error("Erro ao buscar postagens mensais:", erro);
        res.status(500).json({ erro: "Erro ao buscar postagens mensais" });
    });
}

module.exports = {
    obterKpisDiarias,
    obterDadosMensais
};



// const conexao = require('../database/config');

// function obterKpisDiarias(req, res) {

//     const { idUsuario } = req.params;
//      console.log("ID recebido:", idUsuario);

//     conexao.execute(
//         'SELECT COUNT(*) AS total FROM curtida WHERE DATE(dataCurtida) = CURDATE() AND fkUsuario = ?',
//         [idUsuario]
//     ).then(([curtidas]) => {
//         conexao.execute(
//             'SELECT COUNT(*) AS total FROM comentario WHERE DATE(dataComentario) = CURDATE() AND fkUsuario = ?',
//             [idUsuario]
//         ).then(([comentarios]) => {
//             res.json({
//                 curtidas: curtidas[0].total,
//                 comentarios: comentarios[0].total
//             });
//         }).catch(erro => {
//             console.error('Erro ao buscar comentários:', erro);
//             res.status(500).json({ erro: 'Erro ao buscar comentários' });
//         });
//     }).catch(erro => {
//         console.error('Erro ao buscar curtidas:', erro);
//         res.status(500).json({ erro: 'Erro ao buscar curtidas' });
//     });
// }

// function obterDadosMensais(req, res) {
//     const { idUsuario } = req.params;

//     conexao.execute(`
//         SELECT MONTH(dataPostagem) AS mes, COUNT(*) AS total
//         FROM postagem
//         WHERE YEAR(dataPostagem) = YEAR(CURDATE()) AND fkUsuario = ?
//         GROUP BY mes
//     `, [idUsuario]).then(([postagens]) => {
//         conexao.execute(`
//             SELECT MONTH(dataCurtida) AS mes, COUNT(*) AS total
//             FROM curtida
//             WHERE YEAR(dataCurtida) = YEAR(CURDATE()) AND fkUsuario = ?
//             GROUP BY mes
//         `, [idUsuario]).then(([curtidas]) => {
//             res.json({ postagens, curtidas });
//         }).catch(erro => {
//             console.error('Erro ao buscar curtidas mensais:', erro);
//             res.status(500).json({ erro: 'Erro ao buscar curtidas mensais' });
//         });
//     }).catch(erro => {
//         console.error('Erro ao buscar postagens mensais:', erro);
//         res.status(500).json({ erro: 'Erro ao buscar postagens mensais' });
//     });
// }

// module.exports = {
//     obterKpisDiarias,
//     obterDadosMensais
// };
