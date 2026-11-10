// ==========================================
// CONSULTA DE PEDIDOS
// ==========================================

const areaPedidos = document.getElementById("lista-pedidos");

const usuarioPedido = ASTRYX.usuarioAtual();

// Mostra os pedidos realizados pelo usuário.
function mostrarPedidos() {

    // Verifica se o usuário está conectado.
    if (!usuarioPedido) {

        areaPedidos.innerHTML = `
            <p>
                Faça <a href="login.html">login</a>
                para consultar seus pedidos.
            </p>
        `;

        return;
    }

    // Busca somente os pedidos do usuário atual.
    const pedidos = ASTRYX.ler("astrix_pedidos", [])
        .filter(p => p.usuarioId === usuarioPedido.id)
        .reverse();

    if (pedidos.length > 0) {

        areaPedidos.innerHTML = pedidos.map(p => `

            <article class="card" style="margin-bottom: 14px">

                <h3>Pedido ${p.codigo}</h3>

                <p>Data: ${p.data}</p>

                <p>
                    Itens:
                    ${p.itens.map(i =>
                        `${i.nome} (${i.quantidade})`
                    ).join(", ")}
                </p>

                <p class="preco">
                    Total: ${ASTRYX.moeda(p.total)}
                </p>

                <p>
                    Status:
                    <span class="status">${p.status}</span>
                </p>

                <a
                    class="botao pequeno"
                    href="rastreamento.html?codigo=${p.codigo}"
                >
                    Rastrear pedido
                </a>

            </article>

        `).join("");

    } else {

        areaPedidos.innerHTML =
            "<p>Você ainda não realizou pedidos.</p>";

    }

}

// Executa a consulta ao abrir a página.
mostrarPedidos();
