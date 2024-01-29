// Função para exibir o formulário de cadastro e ocultar o formulário de login
function showCadastroForm() {
    // Oculta o formulário de login
    document.getElementById('loginForm').style.display = 'none';

    // Exibe o formulário de cadastro
    document.getElementById('cadastroForm').style.display = 'block';
}


function realizarLogin() {
    // Obtendo os valores digitados pelo usuário no formulário de login
    var emailLogin = document.forms["formLogin"]["emailLogin"].value;
    var senhaLogin = document.forms["formLogin"]["senhaLogin"].value;

    // Obtendo as credenciais armazenadas no localStorage
    var storedEmail = localStorage.getItem("emailCd"); 
    var storedSenha = localStorage.getItem("senhaCd"); 

    // Verificando se as credenciais armazenadas existem e as comparando com as digitadas pelo usuário
    if (storedEmail && storedSenha && emailLogin.toLowerCase() === storedEmail.toLowerCase() && senhaLogin === storedSenha) {
        // Caso as credenciais coincidam, exibir mensagem de login bem-sucedido
        alert("Login bem-sucedido!");
        window.location.href = "../GT Grifes/index.html";
    } else {
        // Caso as credenciais não coincidam, exibir mensagem de credenciais inválidas
        alert("Credenciais inválidas. Verifique seu email e senha.");
    }

    // Retornando false para evitar que o formulário seja enviado
    return false;
}

