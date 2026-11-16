// ==========================================
// RESERVAS DE PRODUTOS
// ==========================================

const seletorProduto = document.getElementById("produto");

const usuario = ASTRYX.usuarioAtual();

// Carrega os produtos disponíveis no seletor.
function carregarProdutos() {

    const produtos = ASTRYX.ler("astrix_produtos", []);

    seletorProduto.innerHTML = produtos.map(p => `

        <option value="${p.id}">
            ${p.nome} — ${ASTRYX.moeda(p.preco)}
        </option>

    `).join("");

}

// Mostra as reservas do usuário conectado.
function mostrarReservas() {

    const reservas = ASTRYX.ler("astrix_reservas", []);

    const minhas = usuario
        ? reservas.filter(r => r.usuarioId === usuario.id)
        : [];

    document.getElementById("lista-reservas").innerHTML = minhas.length

        ? minhas.map(r => `

            <div class="item-linha">

                <div>

                    <strong>${r.produtoNome}</strong>

                    <p>Data desejada: ${r.data}</p>

                    <p>${r.observacoes || "Sem observações"}</p>

                </div>

                <span class="status">${r.status}</span>

            </div>

        `).join("")

        : "<p>Você ainda não possui reservas. Faça login para salvar uma reserva.</p>";

}

// Registra uma nova reserva.
document.getElementById("form-reserva").addEventListener("submit", (evento) => {

    evento.preventDefault();

    const mensagem = document.getElementById("mensagem");

    const usuarioAtual = ASTRYX.usuarioAtual();

    // Verifica se o usuário está conectado.
    if (!usuarioAtual) {

        mensagem.textContent =
            "Faça login antes de solicitar uma reserva.";

        return;
    }

    const produtos = ASTRYX.ler("astrix_produtos", []);

    const produto = produtos.find(p =>
        p.id === Number(seletorProduto.value)
    );

    if (!produto) {

        mensagem.textContent = "Selecione um produto válido.";

        return;
    }

    const reservas = ASTRYX.ler("astrix_reservas", []);

    // Guarda os dados da reserva.
    reservas.push({

        id: Date.now(),
        usuarioId: usuarioAtual.id,
        produtoId: produto.id,
        produtoNome: produto.nome,
        data: document.getElementById("data").value,
        observacoes: document.getElementById("observacoes").value.trim(),
        status: "Solicitada"

    });

    ASTRYX.salvar("astrix_reservas", reservas);

    evento.target.reset();

    mensagem.textContent = "Reserva registrada com sucesso.";

    mostrarReservas();

});

// Inicializa a página.
carregarProdutos();

mostrarReservas();
