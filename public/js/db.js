var mysql = require("mysql2");

var conexao;

if (process.env.AMBIENTE_PROCESSO === "producao") {
    conexao = mysql.createConnection({
        host: process.env.MYSQL_HOST_PROD,
        user: process.env.MYSQL_USER_PROD,
        password: process.env.MYSQL_PASSWORD_PROD,
        database: process.env.MYSQL_DATABASE_PROD
    });
} else if (process.env.AMBIENTE_PROCESSO === "desenvolvimento") {
    conexao = mysql.createConnection({
        host: process.env.MYSQL_HOST_DEV,
        user: process.env.MYSQL_USER_DEV,
        password: process.env.MYSQL_PASSWORD_DEV,
        database: process.env.MYSQL_DATABASE_DEV
    });
} else {
    console.log("ERRO: Ambiente não definido corretamente no .env!");
}

conexao.connect((erro) => {
    if (erro) {
        console.log("Erro ao conectar no MySQL: ", erro.message);
    } else {
        console.log(`Conectado com sucesso ao banco [${process.env.AMBIENTE_PROCESSO}]!`);
    }
});

module.exports = conexao;
