// ==========================================
// CATÁLOGO DE PRODUTOS
// ==========================================

const lista = document.getElementById("lista-produtos");

// Mostra os produtos cadastrados.
function mostrarProdutos() {

    const busca = document.getElementById("busca").value.toLowerCase();

    const categoria = document.getElementById("filtro").value;

    const produtos = ASTRYX.ler("astrix_produtos", []);

    // Filtra os produtos pelo nome e categoria.
    const filtrados = produtos.filter(produto =>

        produto.nome.toLowerCase().includes(busca) &&
        (categoria === "todos" || produto.categoria === categoria)

    );

    // Cria os cards dos produtos.
    lista.innerHTML = filtrados.map(produto => `

        <article class="card produto">

            <div class="produto-arte">
                ${produto.simbolo || "✧"}
            </div>

            <div class="produto-info">

                <p class="sobretitulo">${produto.categoria}</p>

                <h3>${produto.nome}</h3>

                <p class="preco">
                    ${ASTRYX.moeda(produto.preco)}
                </p>

                <p>
                    ${produto.quantidade > 0
                        ? `${produto.quantidade} unidade(s) em estoque`
                        : "Produto indisponível"}
                </p>

                <button
                    class="botao"
                    ${produto.quantidade < 1 ? "disabled" : ""}
                    onclick="adicionarCarrinho(${produto.id})"
                >
                    Adicionar ao carrinho
                </button>

            </div>

        </article>

    `).join("") || "<p>Nenhum produto encontrado.</p>";

}

// Adiciona um produto ao carrinho.
function adicionarCarrinho(id) {

    const produtos = ASTRYX.ler("astrix_produtos", []);

    const produto = produtos.find(item => item.id === id);

    // Verifica se o produto está disponível.
    if (!produto || produto.quantidade < 1) {

        return;
    }

    const carrinho = ASTRYX.ler("astrix_carrinho", []);

    const item = carrinho.find(item => item.id === id);

    // Se o produto já estiver no carrinho, aumenta a quantidade.
    if (item) {

        if (item.quantidade >= produto.quantidade) {
            alert("Quantidade máxima disponível em estoque.");
            return;
        }

        item.quantidade += 1;

    } else {

        carrinho.push({

            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1

        });

    }

    // Salva o carrinho.
    ASTRYX.salvar("astrix_carrinho", carrinho);

    alert("Produto adicionado ao carrinho!");

}

// Pesquisa produtos pelo nome.
document.getElementById("busca").addEventListener("input", mostrarProdutos);

// Filtra produtos por categoria.
document.getElementById("filtro").addEventListener("change", mostrarProdutos);

// Exibe os produtos ao abrir a página.
mostrarProdutos();
