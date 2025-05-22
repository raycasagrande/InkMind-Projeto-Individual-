var database = require("../database/config");

 console.log('Model dando erro');

module.exports = {
 
  criarPostagem: (userId, texto, callback) => {
    return database.executar(
      'INSERT INTO postagem (caracteres, fkUsuario) VALUES (?, ?)',
      [texto, userId],
      callback
    );
   
  },
  

  listarPostagens: (callback) => {
    return database.executar(
      `SELECT p.idPostagem, p.caracteres, p.dataPostagem, u.nick 
       FROM postagem p JOIN usuario u ON p.fkUsuario = u.idUsuario 
       ORDER BY p.dataPostagem DESC`,
      callback
    );
    
  },

  curtirPostagem: (postId, userId, callback) => {
    return database.executar(
      'INSERT IGNORE INTO curtida (dataCurtida, fkUsuario, fkPostagem) VALUES (NOW(), ?, ?)',
      [userId, postId],
      callback
    );
  },
  

  comentarPostagem: (postId, userId, texto, callback) => {
    return database.executar(
      'INSERT INTO comentario (conteudo, fkUsuario, fkPostagem) VALUES (?, ?, ?)',
      [texto, userId, postId],
      callback
    );
  },

  listarComentarios: (postId, callback) => {
    return database.executar(
      `SELECT c.conteudo, u.nick 
       FROM comentario c JOIN usuario u ON c.fkUsuario = u.idUsuario 
       WHERE fkPostagem = ? ORDER BY c.dataComentario`,
      [postId],
      callback
    );
  }
};
