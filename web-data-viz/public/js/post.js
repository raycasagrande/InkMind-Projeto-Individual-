function publicarPostagem() {
  // 1. Pega o texto digitado no input
  var comentario = document.getElementById("input_comentario").value.trim();

  // 2. Pega o ID do usuário que está logado (salvo no sessionStorage)
  var idUsuario = sessionStorage.getItem("ID_USUARIO");

  // 3. Envia para o back-end com fetch
  fetch("/postagem/publicar", {
    method: "POST", // Tipo da requisição
    headers: {
      "Content-Type": "application/json" // Diz que o corpo será JSON
    },
    body: JSON.stringify({
      caracteresServer: comentario,      // texto do comentário
      fkUsuarioServer: idUsuario    // quem postou
    })
  })
    .then(resposta => {
      if (!resposta.ok) {
        throw new Error("Erro ao publicar.");
      }
      return resposta.json();
    })
    .then(data => {
      alert(data.mensagem || "Postagem publicada com sucesso!");
      document.getElementById("input_comentario").value = ""; // limpa o campo
    })
    .catch(erro => {
      console.error("Erro na requisição:", erro);
      alert("Erro ao publicar comentário.");
    });
}

function publicarComentario() {
  // 1. Pega o texto digitado no input
  var comentario = document.getElementById("input_comentario").value.trim();

  // 2. Pega o ID do usuário que está logado (salvo no sessionStorage)
  var idUsuario = sessionStorage.getItem("ID_USUARIO");

  // 3. Envia para o back-end com fetch
  fetch("/postagem/publicar", {
    method: "POST", // Tipo da requisição
    headers: {
      "Content-Type": "application/json" // Diz que o corpo será JSON
    },
    body: JSON.stringify({
      caracteres: comentario,      // texto do comentário
      fkUsuario: idUsuario    // quem postou
    })
  })
    .then(resposta => {
      if (!resposta.ok) {
        throw new Error("Erro ao publicar.");
      }
      return resposta.json();
    })
    .then(data => {
      alert(data.mensagem || "Postagem publicada com sucesso!");
      document.getElementById("input_comentario").value = ""; // limpa o campo
    })
    .catch(erro => {
      console.error("Erro na requisição:", erro);
      alert("Erro ao publicar comentário.");
    });
}

// Adiciona o listener ao botão após o carregamento da página
// document.getElementById("botaoPublicar").addEventListener("click", publicarComentario);