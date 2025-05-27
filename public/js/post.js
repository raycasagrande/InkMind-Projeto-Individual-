function publicarComentario() {
  // 1. Pega o texto digitado no input
  var comentario = document.getElementById("input_comentario").value;

  // 2. Pega o ID do usuário que está logado (salvo no sessionStorage)
  var idUsuario = sessionStorage.ID_USUARIO;

  // 3. Envia para o back-end com fetch
  fetch("/comentario/publicar", {
    method: "POST", // Tipo da requisição
    headers: {
      "Content-Type": "application/json" // Diz que o corpo será JSON
    },
    body: JSON.stringify({
      texto: comentario,      // texto do comentário
      idUsuario: idUsuario    // quem postou
    })
  })
  .then(function (resposta) {
    if (resposta.ok) {
      alert("Comentário publicado com sucesso!");
    } else {
      alert("Erro ao publicar.");
    }
  })
  .catch(function (erro) {
    console.error("Erro na requisição:", erro);
  });
}
