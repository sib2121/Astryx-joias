// ==========================================
// CARRINHO DE COMPRAS
// ==========================================

const areaCarrinho = document.getElementById("itens-carrinho");

// Mostra os produtos adicionados ao carrinho.
function mostrarCarrinho() {

    const carrinho = ASTRYX.ler("astrix_carrinho", []);

    if (carrinho.length > 0) {

        areaCarrinho.innerHTML = carrinho.map(item => `

            <div class="item-linha">

                <div>

                    <strong>${item.nome}</strong>

                    <p>${ASTRYX.moeda(item.preco)} cada</p>

                </div>

                <div>

                    <button
                        class="botao pequeno secundario"
                        onclick="mudarQuantidade(${item.id}, -1)"
                    >
                        −
                    </button>

                    <strong> ${item.quantidade} </strong>

                    <button
                        class="botao pequeno secundario"
                        onclick="mudarQuantidade(${item.id}, 1)"
                    >
                        +
                    </button>

                    <button
                        class="botao pequeno perigo"
                        onclick="removerItem(${item.id})"
                    >
                        Remover
                    </button>

                </div>

            </div>

        `).join("");

    } else {

        areaCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";

    }

    // Calcula o valor total.
    const total = carrinho.reduce((soma, item) => {

        return soma + item.preco * item.quantidade;

    }, 0);

    document.getElementById("total").textContent = ASTRYX.moeda(total);

}

// Altera a quantidade de um produto.
function mudarQuantidade(id, variacao) {

    const carrinho = ASTRYX.ler("astrix_carrinho", []);

    const produtos = ASTRYX.ler("astrix_produtos", []);

    const item = carrinho.find(p => p.id === id);

    const produto = produtos.find(p => p.id === id);

    if (!item) {
        return;
    }

    const novaQtd = item.quantidade + variacao;

    if (novaQtd < 1) {

        return removerItem(id);

    }

    // Verifica se existe estoque suficiente.
    if (novaQtd > produto.quantidade) {

        alert("Não há estoque suficiente.");

        return;
    }

    item.quantidade = novaQtd;

    ASTRYX.salvar("astrix_carrinho", carrinho);

    mostrarCarrinho();

}

// Remove um produto do carrinho.
function removerItem(id) {

    const carrinho = ASTRYX.ler("astrix_carrinho", []);

    const novaLista = carrinho.filter(item => item.id !== id);

    ASTRYX.salvar("astrix_carrinho", novaLista);

    mostrarCarrinho();

}

// Finaliza o pedido.
document.getElementById("finalizar").addEventListener("click", () => {

    const usuario = ASTRYX.usuarioAtual();

    const carrinho = ASTRYX.ler("astrix_carrinho", []);

    const produtos = ASTRYX.ler("astrix_produtos", []);

    const mensagem = document.getElementById("mensagem");

    // Verifica se o usuário está conectado.
    if (!usuario) {

        mensagem.textContent =
            "Entre na sua conta antes de finalizar o pedido.";

        return;
    }

    // Verifica se o carrinho possui produtos.
    if (!carrinho.length) {

        mensagem.textContent =
            "Adicione produtos ao carrinho primeiro.";

        return;
    }

    // Confere o estoque antes de registrar o pedido.
    for (const item of carrinho) {

        const produto = produtos.find(p => p.id === item.id);

        if (!produto || produto.quantidade < item.quantidade) {

            mensagem.textContent =
                `Estoque insuficiente para ${item.nome}.`;

            return;
        }
    }

    // Atualiza as quantidades do estoque.
    carrinho.forEach(item => {

        const produto = produtos.find(p => p.id === item.id);

        produto.quantidade -= item.quantidade;

    });

    const pedidos = ASTRYX.ler("astrix_pedidos", []);

    // Gera um código para o pedido.
    const codigo = "AST-" + Math.floor(
        100000 + Math.random() * 900000
    );

    // Calcula o valor total.
    const total = carrinho.reduce((soma, item) => {

        return soma + item.preco * item.quantidade;

    }, 0);

    // Registra o pedido.
    pedidos.push({

        codigo,
        usuarioId: usuario.id,
        usuarioNome: usuario.nome,
        itens: carrinho,
        total,
        data: new Date().toLocaleString("pt-BR"),
        status: "Pedido recebido"

    });

    // Salva as alterações.
    ASTRYX.salvar("astrix_produtos", produtos);

    ASTRYX.salvar("astrix_pedidos", pedidos);

    ASTRYX.salvar("astrix_carrinho", []);

    mensagem.textContent =
        `Pedido ${codigo} registrado! Consulte a página Pedidos.`;

    mostrarCarrinho();

});

// Exibe o carrinho ao abrir a página.
mostrarCarrinho();
