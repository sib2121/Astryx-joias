// ==========================================
// LOGIN DE USUÁRIO
// A autenticação real será feita pelo Flask depois.
// ==========================================

document.getElementById("form-login").addEventListener("submit", (evento) => {

    // Impede o recarregamento da página.
    evento.preventDefault();

    // Captura os dados digitados.
    const email = document.getElementById("email").value.trim().toLowerCase();

    const senha = document.getElementById("senha").value;

    const mensagem = document.getElementById("mensagem");

    // Recupera os usuários cadastrados.
    const usuarios = ASTRYX.ler("astrix_usuarios", []);

    // Procura um usuário com os dados informados.
    const usuario = usuarios.find(item =>
        item.email === email && item.senha === senha
    );

    // Verifica se encontrou o usuário.
    if (!usuario) {

        mensagem.textContent = "E-mail ou senha incorretos. Confira seus dados ou cadastre-se.";

        return;
    }

    // Mantém a sessão local depois de atualizar ou fechar a página.
    ASTRYX.salvar("astrix_usuario_atual", {

        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email

    });

    mensagem.textContent = `Bem-vindo(a), ${usuario.nome}!`;

    // Direciona para a página inicial.
    setTimeout(() => {

        window.location.href = "index.html";

    }, 800);

});
