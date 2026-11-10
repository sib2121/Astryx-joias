// ==========================================
// RASTREAMENTO DE PEDIDOS
// Demonstração com status armazenado no navegador.
// ==========================================

const formularioRastreio = document.getElementById("form-rastreio");

const resultado = document.getElementById("resultado-rastreio");

// Preenche o código automaticamente quando vem da página de pedidos.
const codigoUrl = new URLSearchParams(
    window.location.search
).get("codigo");

if (codigoUrl) {

    document.getElementById("codigo").value = codigoUrl;

}

// Consulta o pedido informado.
formularioRastreio.addEventListener("submit", (evento) => {

    evento.preventDefault();

    // Captura o código digitado.
    const codigo = document.getElementById("codigo")
        .value.trim().toUpperCase();

    // Recupera os pedidos salvos.
    const pedidos = ASTRYX.ler("astrix_pedidos", []);

    // Procura o pedido pelo código.
    const pedido = pedidos.find(p => p.codigo === codigo);

    // Verifica se o pedido existe.
    if (!pedido) {

        resultado.innerHTML = `
            <p>
                Pedido não encontrado.
                Confira o código informado.
            </p>
        `;

        return;
    }

    // Exibe as informações do pedido.
    resultado.innerHTML = `

        <h2>Pedido ${pedido.codigo}</h2>

        <p>
            <strong>Status atual:</strong>
            <span class="status">${pedido.status}</span>
        </p>

        <p>Data do pedido: ${pedido.data}</p>

        <p>Valor: ${ASTRYX.moeda(pedido.total)}</p>

        <p>
            Etapas:
            Pedido recebido → Preparação → Enviado → Entregue
        </p>

        <p>
            Nesta versão demonstrativa, o status não recebe
            atualizações de transportadora.
        </p>

    `;

});
