var database = require("../database/config");

 console.log('Model dando erro');

function publicar(texto, idUsuario) {
    var instrucaoSql = `
        INSERT INTO postagem (caracteres, fkUsuario)
        VALUES ('${texto}', ${idUsuario});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    publicar
};