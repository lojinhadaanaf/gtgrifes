
// Variavel para armazenar os itens no carrinho.
let carrinho = []

// Função para adicionar o produto ao carrinho e chamar a função atualizarCarrinho()
function adicionarProduto(nome, preco, cod, img) {
    carrinho.push({ nome, preco, cod, img })
    atualizarCarrinho()
}

// Função para remover o produto do carrinho pelo índice e chamar a função atualizarCarrinho()
function removerProduto(index) {
    carrinho.splice(index, 1)
    atualizarCarrinho()
}

// Função para atualizar o carrinho
function atualizarCarrinho() {
    const listaCarrinho = document.getElementById("lista-carrinho")
    listaCarrinho.innerHTML = "";

    // Se não houver itens no carrinho, oculta o carrinho
    if (carrinho.length === 0) {
        const carrinhoDiv = document.getElementById('carrinho');
        carrinhoDiv.style.display = 'none';
        return;
    }

    // Percorre o carrinho e cria a lista de produtos
    carrinho.forEach((produto, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
        </br>
        <img src="${produto.img}">
        </br>
        <span>${produto.nome}</span>
        </br>
        <span>Preço Unitário R$ ${produto.preco}.00</span>
        </br>
        <span>Código Produto: ${produto.cod}</span>
        </br></br>
        <button onclick="removerProduto(${index})">Remover</button>
        </br>
        `;
        listaCarrinho.appendChild(li);
    });

    // Atualiza o valor total do carrinho
    const totalCarrinho = document.getElementById("total-carrinho");
    const total = carrinho.reduce((total, produto) => total + produto.preco, 0);
    totalCarrinho.innerHTML = total.toFixed(2);

    const carrinhoDiv = document.getElementById('carrinho');
    carrinhoDiv.style.display = 'block'; // Torna o carrinho visível automaticamente
}
// Função para alternar a visibilidade do carrinho
function toggleCarrinho() {
    const carrinhoDiv = document.getElementById('carrinho');
    carrinhoDiv.style.display = carrinhoDiv.style.display === 'block' || carrinhoDiv.style.display === 'flex' ? 'none' : 'block';
}

// Função para fechar o carrinho
function fecharCarrinho() {
    const carrinhoDiv = document.getElementById('carrinho');
    carrinhoDiv.style.display = 'none';
}

// Função para verificar o estado de login
function verificarLogin() {
    var usuarioLogado = localStorage.getItem("emailCd");
    return usuarioLogado !== null && usuarioLogado !== undefined && usuarioLogado.trim() !== "";
}

// Função para atualizar a visibilidade dos links com base no estado de login
function atualizarVisibilidadeLinks() {
    // Obter referências aos elementos HTML
    var entrarLi = document.getElementById("entrarLi");
    var logoutLi = document.getElementById("logoutLi");

    // Verificar o estado de login
    if (verificarLogin()) {
        // Se estiver logado, ocultar "ENTRAR" e exibir "LOGOUT"
        entrarLi.style.display = "none";
        logoutLi.style.display = "block";
    } else {
        // Se não estiver logado, exibir "ENTRAR" e ocultar "LOGOUT"
        entrarLi.style.display = "block";
        logoutLi.style.display = "none";
    }
}

// Chamar a função quando a página for totalmente carregada
window.onload = function() {
    atualizarVisibilidadeLinks();
}

// Função de logout
function logout() {
    localStorage.removeItem("emailCd");
    localStorage.removeItem("senhaCd");
    alert("Usuário Desconectado!")
    window.location.href = "login.html";
    atualizarVisibilidadeLinks();
}

// Função para inicializar os botões do PayPal
(function () {

    paypal.Buttons({
        createOrder: function (data, actions) {

            return actions.order.create({
                purchase_units: [{

                    amount: {
                        currency_code: 'USD',
                        value: carrinho.reduce((total, produto) => total + produto.preco, 0)
                  
                    }
                }]
            });
        },
        onApprove: function (data, actions){

            return actions.order.capture().then(function(details){
               
                alert("Pagamento realizado com sucesso!");
                console.log(details);
                carrinho = [];
                atualizarCarrinho();
            });
        },

        onError: function (err) {
        
            alert("Ocorreu um erro durante o pagamento. Por favor, tente novamente.", err);
        }


    }).render('#paypal-button-container');
})();