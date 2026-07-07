// MENSAGEM DE BOAS-VINDAS

window.onload = function() {
    console.log("Site minimalista carregado com sucesso!");
};

// Configuração de conexão com o Supabase

const SUPABASE_URL = "https://supabase.co";
const SUPABASE_KEY = "sua-chave-anonima-publica-aqui";

// Inicializa o cliente Supabase global
const supabase = supabase.createClient(https://ybpkkbendnlzectbmnaj.supabase.co, sb_publishable_DfOMmh5vZ8N7DYYYvzyUwA_fKmpNqGb);



// MANIPULAÇÃO DO DOM E EVENTOS DE CLIQUE

const logo = document.querySelector('header h1');
logo.addEventListener('click', function() {
    alert("Você clicou no logo da Tech Solutions!");
    logo.textContent = "Tech Solutions - Líder em TI"; 
    
    // ATUALIZADO: Agora muda para o ciano elétrico minimalista
    logo.style.color = "#00adb5"; 
});


// VALIDAÇÃO SIMPLES DE FORMULÁRIO

const formulario = document.getElementById('formContato');

if (formulario) {
    // Transformamos a função em ASYNC para permitir requisições ao servidor
    formulario.addEventListener('submit', async function(evento) {
        evento.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const assunto = document.getElementById('assunto').value;
        const mensagem = document.getElementById('mensagem').value;

        // Validação local básica
        if (nome === "" || email === "" || telefone === "" || assunto === "" || mensagem === "") {
            alert("Por favor, preencha todos os campos obrigatórios!");
            return; // Para a execução aqui
        }

        try {
            // Envia os dados para a tabela 'contatos' no Supabase
            const { data, error } = await supabase
                .from('contatos') // Nome exato da tabela no banco
                .insert([
                    { 
                        nome: nome, 
                        email: email, 
                        telefone: telefone, 
                        assunto: assunto, 
                        mensagem: mensagem 
                    }
                ]);

            if (error) {
                throw error; // Se o servidor retornar erro, dispara para o catch
            }

            // Se der tudo certo:
            alert(`Olá, ${nome}! Seus dados foram salvos no Supabase com sucesso!`);
            formulario.reset();

        } catch (erro) {
            console.error("Erro ao salvar no Supabase:", erro.message);
            alert("Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.");
        }
    });
}
