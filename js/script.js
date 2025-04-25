let carrosselIndex = 0;
let produtosCarrossel = [];

// Carregar produtos do backend
async function exibirProdutos() {
    const secaoProdutos = document.getElementById("produtos");
    const loading = document.getElementById("loading");
    const carrosselItems = document.getElementById("carrossel-items");

    try {
        const response = await fetch("http://localhost:5000/produtos");
        if (!response.ok) throw new Error("Erro ao carregar produtos");
        const produtos = await response.json();

        // Carrossel com todos os produtos
        produtosCarrossel = produtos;
        carrosselItems.innerHTML = "";
        produtos.forEach(produto => {
            const divCarrossel = document.createElement("div");
            divCarrossel.classList.add("carrossel-item");
            divCarrossel.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}" onclick="window.location.href='produto.html?id=${produto.id}'">
                <h3>${produto.nome}</h3>
            `;
            carrosselItems.appendChild(divCarrossel);
        });

        // Lista de produtos
        loading.style.display = "none";
        secaoProdutos.innerHTML = "";
        produtos.forEach(produto => {
            const divProduto = document.createElement("div");
            divProduto.classList.add("produto");
            divProduto.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco.toFixed(2)}</p>
                <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
            `;
            secaoProdutos.appendChild(divProduto);
        });
    } catch (error) {
        loading.textContent = "Erro ao carregar produtos. Verifique o servidor.";
        console.error(error);
    }
}

// Mover carrossel
function moverCarrossel(direcao) {
    carrosselIndex += direcao;
    const carrosselItems = document.getElementById("carrossel-items");
    const totalItems = produtosCarrossel.length;

    if (carrosselIndex < 0) carrosselIndex = totalItems - 1;
    if (carrosselIndex >= totalItems) carrosselIndex = 0;

    const offset = -carrosselIndex * 100;
    carrosselItems.style.transform = `translateX(${offset}%)`;
}

// Gerenciar carrinho
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
function adicionarAoCarrinho(id) {
    fetch("http://localhost:5000/produtos")
        .then(res => res.json())
        .then(produtos => {
            const produto = produtos.find(p => p.id === id);
            if (produto) {
                carrinho.push(produto);
                localStorage.setItem("carrinho", JSON.stringify(carrinho));
                atualizarContadorCarrinho();
                alert(`Produto ${produto.nome} adicionado ao carrinho!`);
            }
        })
        .catch(err => console.error("Erro ao adicionar ao carrinho:", err));
}

// Atualizar contador do carrinho
function atualizarContadorCarrinho() {
    const contador = document.getElementById("carrinho-contador");
    if (contador) {
        contador.textContent = carrinho.length;
    }
}

// Carregar ao iniciar
window.onload = function() {
    exibirProdutos();
    atualizarContadorCarrinho();
};