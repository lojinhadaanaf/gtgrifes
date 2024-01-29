function validarFormularioCd() {
    // Puxando as variáveis pelo formulário
    var nomeCd = document.forms["formCd"]["nomeCd"].value;
    var emailCd = document.forms["formCd"]["emailCd"].value;
    var senhaCd = document.forms["formCd"]["senhaCd"].value;

    // Verificando o campo nome
    if (nomeCd == "") {
        alert("Por favor, informe o seu Nome.");
        return false;
    } else if (!validarNome(nomeCd)) {
        alert("Seu nome deve ter no mínimo 3 caracteres.");
        return false;
    }

    // Verificando o campo email
    if (emailCd == "") {
        alert("Por favor, informe o seu e-mail.");
        return false;
    } else if (!validarEmailCd(emailCd)) {
        alert("Por favor, informe um e-mail válido.");
        return false;
    }

    // Verificando o campo senha
    if (senhaCd == "") {
        alert("Por favor, informe a sua senha.");
        return false;
    } else if (!validarSenhaCd(senhaCd)) {
        alert("A senha deve conter pelo menos 8 caracteres, incluindo pelo menos um número, uma letra minúscula e uma letra maiúscula.");
        return false;
    }

    // Armazenando no localStorage
    localStorage.setItem("nomeCd", nomeCd);
    localStorage.setItem("emailCd", emailCd);
    localStorage.setItem("senhaCd", senhaCd);

    // Retornando uma mensagem se o cadastro for efetuado
    alert("Cadastro efetuado com sucesso!");
    return true;
}

// Validando o campo Email
function validarEmailCd(email) {
    return email.includes("@") && email.includes(".");
}

// Validando o campo nome
function validarNome(nome) {
    return nome.length >= 3;
}

// Validando o campo senha
function validarSenhaCd(senha) {
    return senha.length >= 8 && /\d/.test(senha) && /[a-z]/.test(senha) && /[A-Z]/.test(senha);
}
