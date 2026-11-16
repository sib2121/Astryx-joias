// ==========================================
// CONTROLE DE ESTOQUE
// ==========================================

const tabelaEstoque = document.getElementById("tabela-estoque");

// Atualiza a tabela de produtos.
function atualizarTabela() {

    const produtos = ASTRYX.ler("astrix_produtos", []);

    tabelaEstoque.innerHTML = `

        <table class="tabela">

            <thead>

                <tr>
                    <th>Produto</th>
                    <th>Categoria</th>
                    <th>Preço</th>
                    <th>Qtd.</th>
                    <th>Ação</th>
                </tr>

            </thead>

            <tbody>

                ${produtos.map(p => `

                    <tr>

                        <td>${p.nome}</td>

                        <td>${p.categoria}</td>

                        <td>${ASTRYX.moeda(p.preco)}</td>

                        <td>${p.quantidade}</td>

                        <td>

                            <button
                                class="botao pequeno secundario"
                                onclick="alterarEstoque(${p.id})"
                            >
                                Editar qtd.
                            </button>

                        </td>

                    </tr>

                `).join("")}

            </tbody>

        </table>

    `;

}

// Permite alterar a quantidade de um produto.
function alterarEstoque(id) {

    const produtos = ASTRYX.ler("astrix_produtos", []);

    const produto = produtos.find(p => p.id === id);

    const novaQuantidade = prompt(
        `Nova quantidade para ${produto.nome}:`,
        produto.quantidade
    );

    if (novaQuantidade === null) {
        return;
    }

    // Verifica se a quantidade é válida.
    if (
        !Number.isInteger(Number(novaQuantidade)) ||
        Number(novaQuantidade) < 0
    ) {

        alert("Digite uma quantidade inteira igual ou maior que zero.");

        return;
    }

    produto.quantidade = Number(novaQuantidade);

    ASTRYX.salvar("astrix_produtos", produtos);

    atualizarTabela();

}

// Cadastra um novo produto.
document.getElementById("form-produto").addEventListener("submit", (evento) => {

    evento.preventDefault();

    const produtos = ASTRYX.ler("astrix_produtos", []);

    const nome = document.getElementById("nome").value.trim();

    const categoria = document.getElementById("categoria").value;

    const preco = Number(document.getElementById("preco").value);

    const quantidade = Number(document.getElementById("quantidade").value);

    // Adiciona o produto à lista.
    produtos.push({

        id: Date.now(),
        nome,
        categoria,
        preco,
        quantidade,
        simbolo: "✧"

    });

    ASTRYX.salvar("astrix_produtos", produtos);

    evento.target.reset();

    document.getElementById("mensagem").textContent =
        "Produto adicionado ao estoque.";

    atualizarTabela();

});

// Exibe o estoque ao abrir a página.
atualizarTabela();
