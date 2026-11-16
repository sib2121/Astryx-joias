// ==========================================
// ASTRYX - ARMAZENAMENTO COMPARTILHADO
// Guarda os dados desta demonstração no navegador.
// ==========================================

const ASTRYX = {

    // Lê uma informação salva ou devolve um valor padrão.
    ler(chave, padrao = []) {

        try {
            return JSON.parse(localStorage.getItem(chave)) ?? padrao;

        } catch {
            return padrao;
        }
    },

    // Salva uma informação no navegador.
    salvar(chave, valor) {

        localStorage.setItem(chave, JSON.stringify(valor));
    },

    // Retorna o usuário que está conectado.
    usuarioAtual() {

        return this.ler("astrix_usuario_atual", null);
    },

    // Formata os valores em reais.
    moeda(valor) {

        return Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    },

    // Cria os produtos de exemplo somente na primeira visita.
    iniciarProdutos() {

        if (!localStorage.getItem("astrix_produtos")) {

            this.salvar("astrix_produtos", [

                {
                    id: 1,
                    nome: "Anel Nebulosa",
                    categoria: "Anéis",
                    preco: 289.90,
                    quantidade: 8,
                    simbolo: "✧"
                },

                {
                    id: 2,
                    nome: "Colar Órbita",
                    categoria: "Colares",
                    preco: 359.90,
                    quantidade: 5,
                    simbolo: "◇"
                },

                {
                    id: 3,
                    nome: "Pulseira Eclipse",
                    categoria: "Pulseiras",
                    preco: 199.90,
                    quantidade: 12,
                    simbolo: "☾"
                },

                {
                    id: 4,
                    nome: "Anel Galáxia",
                    categoria: "Anéis",
                    preco: 429.90,
                    quantidade: 3,
                    simbolo: "✦"
                }

            ]);
        }
    }
};

// Inicializa os produtos de demonstração.
ASTRYX.iniciarProdutos();

// Atualiza o ano do rodapé.
document.addEventListener("DOMContentLoaded", () => {

    const ano = document.getElementById("ano");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }

});
