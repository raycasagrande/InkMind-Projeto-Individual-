function publicarPostagem() {

  // 1. Pega o texto digitado no input

  var comentario = document.getElementById("input_comentario").value.trim();

  // 2. Pega o ID do usuário que está logado (salvo no sessionStorage)

  var idUsuario = sessionStorage.getItem("ID_USUARIO");

  // 3. Envia para o back-end com fetch

  fetch("/postagem/publicarPostagem", {
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

      buscarPostagem();
    })
    .catch(erro => {
      console.error("Erro na requisição:", erro);
      alert("Erro ao publicar comentário.");
    });
}

function buscarPostagem() {

  var idUsuario = sessionStorage.getItem("ID_USUARIO");

  // 3. Envia para o back-end com fetch

  fetch("/postagem/buscarPostagem", {
    method: "POST", // Tipo da requisição
    headers: {
      "Content-Type": "application/json" // Diz que o corpo será JSON
    },
    body: JSON.stringify({
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
     sessionStorage.setItem("POSTAGENS_USUARIO",JSON.stringify(data.publicacoes))

     exibirPostagens();
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

// Pegando a div postagem, crianod uma var post, e no json está pegando todos os campos/arrays
 
function exibirPostagens() {
    document.getElementById("div_feed").innerHTML = ' ';
    var post = ' ';

    JSON.parse(sessionStorage.POSTAGENS_USUARIO).forEach(item => {
         post += `  <div class="post">
            <div class="post-header">
              <div class="post-header">
                <img class="avatar" src="./assets/icon/icon2 (1).jpg" alt="Avatar">
                <span class="username">${sessionStorage.NOME_USUARIO}</span>
              </div>

            </div>
            <div class="post-content">
              ${item.caracteres}
            </div>
            <br>
            <div class="post-actions">
              <button class="like-btn">❤️ Curtir</button>
            </div>
            <div class="comments">
              <div class="comment">@misterclassic: A lealdade entre Harry, Rony e Hermione sempre me emociona. Uma
                amizade construída na coragem e confiança! </div>
              <div class="comment">@fantasy.witch: A cena em que Hermione escolhe ficar com Harry em vez de ir pra casa
                no primeiro livro… </div>
              <div class="comment">@poetry.soul: “Eles enfrentaram tudo juntos: trolls, dementadores e até a morte. O
                trio é o coração de Hogwarts</div>
            </div>
            <div class="comment-box">
              <input class="comment-input" type="text" placeholder="Escreva um comentário...">
            </div>
          </div>`
        ;
    });
    document.getElementById("div_feed").innerHTML = post;
  }