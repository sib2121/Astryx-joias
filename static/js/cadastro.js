// ==========================================
// CADASTRO DE USUÁRIO
// Protótipo local: não usar para senhas reais.
// ==========================================

document.getElementById("form-cadastro").addEventListener("submit", (evento) => {

    // Impede o recarregamento da página.
    evento.preventDefault();

    // Captura os dados digitados pelo usuário.
    const nome = document.getElementById("nome").value.trim();

    const email = document.getElementById("email").value.trim().toLowerCase();

    const senha = document.getElementById("senha").value;

    const confirmar = document.getElementById("confirmar-senha").value;

    const mensagem = document.getElementById("mensagem");

    // Verifica se as senhas são iguais.
    if (senha !== confirmar) {

        mensagem.textContent = "As senhas não são iguais.";

        return;
    }

    // Recupera os usuários cadastrados.
    const usuarios = ASTRYX.ler("astrix_usuarios", []);

    // Verifica se o e-mail já existe.
    if (usuarios.some(usuario => usuario.email === email)) {

        mensagem.textContent = "Este e-mail já está cadastrado.";

        return;
    }

    // Armazenamento provisório para demonstração.
    usuarios.push({

        id: Date.now(),
        nome,
        email,
        senha

    });

    // Salva o novo usuário.
    ASTRYX.salvar("astrix_usuarios", usuarios);

    mensagem.textContent = "Cadastro realizado! Você será direcionado ao login.";

    evento.target.reset();

    // Direciona o usuário para o login.
    setTimeout(() => {

        window.location.href = "login.html";

    }, 1200);

});
