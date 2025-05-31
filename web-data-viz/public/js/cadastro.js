// Array para armazenar empresas cadastradas para validação de código de ativação 
  let listaEmpresasCadastradas = [];

  function cadastrar() {
  
    var nomeVar = input_nome.value;
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;
    var confirmacaoSenhaVar = input_confirmacao.value;
    
    // Verificando se há algum campo em branco
    if (
      nomeVar == "" ||
      emailVar == "" ||
      senhaVar == "" ||
      confirmacaoSenhaVar == ""
      
    ) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "(Mensagem de erro para todos os campos em branco)";

      finalizarAguardar();
      return false;
    } else {
      setInterval(sumirMensagem, 5000);
    }

    // Verificando se o código de ativação é de alguma empresa cadastrada
   
    if(nomeVar.lenght <=1){

         cardErro.style.display = "block";
        mensagem_erro.innerHTML = "(Insira o nome completo)";
       finalizarAguardar();
       return false;

    }else if (emailVar.indexOf("@")== -1 || emailVar.indexOf(".")== -1){

        cardErro.style.display = "block";
        mensagem_erro.innerHTML = "(Insira um e-mail válido)";
        finalizarAguardar();
        return false;

    }else if (senhaVar.lenght < 6) {

        cardErro.style.display = "block";
        mensagem_erro.innerHTML = "(Insira uma senha com 6 caracteres)";
        finalizarAguardar();
        return false;

    }else if (confirmacaoSenhaVar != senhaVar) {

        cardErro.style.display = "block";
        mensagem_erro.innerHTML = "(Insira uma senha com 6 caracteres)";
        finalizarAguardar();
        return false;

    }


    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar,
      
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          cardErro.style.display = "block";

          mensagem_erro.innerHTML =
            "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

          setTimeout(() => {
            window.location = "login.html";
          }, "2000");

          limparFormulario();
          finalizarAguardar();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
      });

    return false;
  }

  // Listando empresas cadastradas 
  function listar() {
    fetch("/empresas/listar", {
      method: "GET",
    })
      .then(function (resposta) {
        resposta.json().then((empresas) => {
          empresas.forEach((empresa) => {
            listaEmpresasCadastradas.push(empresa);

            console.log("listaEmpresasCadastradas")
            console.log(listaEmpresasCadastradas[0].codigo_ativacao)
          });
        });
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
  }

  function sumirMensagem() {
    cardErro.style.display = "none";
  }