// sessão
function validarSessao() {

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var id = sessionStorage.ID_USUARIO;

    var input_usuario = document.getElementById("input_usuario");

    if (email != null && nome != null) {
        input_usuario.innerHTML = nome;

        fetch("/usuario/buscar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emailServer: sessionStorage.EMAIL_USUARIO
            })
        }).then(function (resposta) {

            console.log("EU ESTOU ON THEN DO LOGIN.JS");
        });
    } else {
        window.location = "./feed.html";
    }

}

function limparSessao() {
    sessionStorage.clear();
    window.location = "./feed.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

function autenticar() {

    var emailVar = document.getElementById('input_usuario');
    var senhaVar = document.getElementById('input_senha');

    var erro_usuario = document.getElementById('erro_usuario');
    var erro_senha = document.getElementById('erro_senha');

    var erro = false;

    // Limpa as mensagens anteriores

    erro_usuario.innerHTML = "";
    erro_senha.innerHTML = "";
    erro_usuario.classList.add('hidden');
    erro_senha.classList.add('hidden');

    // Validação dos campos

    if (emailVar.value == "") {

        erro_usuario.innerHTML = "Por favor, preencha o e-mail";
        erro_usuario.classList.remove('hidden');
        erro = true;
    }

    console.log("Senha:", senhaVar.value);
    console.log("Erro atual:", erro);
    if (senhaVar.value == "") {

        erro_senha.innerHTML = "Por favor, preencha a senha";
        erro_senha.classList.remove('hidden');
        erro = true;

    }

    if (erro) {

        return false;
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/buscar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar.value,
            senhaServer: senhaVar.value
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                localStorage.setItem("idUsuario", json.id);
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;

                setTimeout(function () {

                    window.location = "feed.html";
                }, 1000);

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error("Erro no backend:", texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log("erro na requisição:", erro);
        finalizarAguardar("Erro ao tentar se comunicar com o servidor.")
    })

    return false;
}
