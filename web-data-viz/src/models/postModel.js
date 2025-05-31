var database = require("../database/config")

 function cadastrarFavorito(NomeFavorito, TipoFavorito, DescricaoFavorito, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarFavorito():", NomeFavorito, TipoFavorito, DescricaoFavorito, id);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO favoritos (Nome, Estilo, Descrição, FkUsuario) VALUES ('${NomeFavorito}', '${TipoFavorito}', '${DescricaoFavorito}', '${id}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function BuscarFavorito(id){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function BuscarFavorito():", id);

    var instrucaoSql = `
        SELECT idFavorito, Nome, Estilo, Descrição FROM favoritos WHERE FkUsuario = '${id}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function apagarFavorito(idFavorito){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function BuscarFavorito():", idFavorito);

    var instrucaoSql = `
        DELETE FROM favoritos WHERE idFavorito = '${idFavorito}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function publicarPostagem(texto, idUsuario) {
    console.log("Esntou na função publicar")
    var instrucaoSql = `
        INSERT INTO postagem (caracteres, fkUsuario)
        VALUES ('${texto}', ${idUsuario});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPostagem(idUsuario) {
    console.log("Estou na função buscar")
    var instrucaoSql = `
        select * from postagem where fkUsuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarPostagem,
    publicarPostagem,
    cadastrarFavorito,
    // BuscarFavorito,
    // apagarFavorito
};