// IMPORTAÇÃO DIRETA: Carrega o Supabase direto pelo JavaScript
import { createClient } from 'https://jsdelivr.net';

// MENSAGEM DE BOAS-VINDAS
window.onload = function() {
    console.log("Site minimalista carregado com sucesso!");
};

// Configuração de conexão com o Supabase
const SUPABASE_URL = "https://supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdibm13cmJzc3F2dXh5ZWtvZmd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0NjUxMjAsImV4cCI6MjA5OTA0MTEyMH0.UtOP3VWwmUpbp3632m22w9H4Amg4DNJYsOPXOsqijUo"; 

// CORRIGIDO: Chama a função importada diretamente sem o "window."
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// MANIPULAÇÃO DO DOM E EVENTOS DE CLIQUE
const logo = document.querySelector('header h1');
if (logo) {
    logo.addEventListener('click', function() {
        alert("Você clicou no logo da Tech Solutions!");
        logo.textContent = "Tech Solutions - Líder em TI"; 
        logo.style.color = "#00adb5"; 
    });
}

// VALIDAÇÃO E ENVIO DO FORMULÁRIO
const formulario = document.getElementById('formContato');

if (formulario) {
    formulario.addEventListener('submit', async function(evento) {
        evento.preventDefault();

        // Captura e limpa espaços extras digitados pelo usuário
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const assunto = document.getElementById('assunto').value;
        const mensagem = document.getElementById('mensagem').value.trim();

        // Validação local básica
        if (!nome || !email || !telefone || !assunto || !mensagem) {
            alert("Por favor, preencha todos os campos obrigatórios!");
            return; 
        }

        try {
            // Envia os dados para a tabela 'contatos' no Supabase
            const { error } = await supabase
                .from('contatos') 
                .insert([
                    { 
                        nome: nome, 
                        email: email, 
                        telefone: telefone, 
                        assunto: assunto, 
                        mensagem: mensagem 
                    }
                ]);

            if (error) throw error; 

            // Se der tudo certo:
            alert(`Olá, ${nome}! Seus dados foram salvos no Supabase com sucesso!`);
            formulario.reset();

        } catch (erro) {
            console.error("Erro ao salvar no Supabase:", erro);
            alert("Ocorreu um erro ao enviar sua mensagem. Verifique a conexão ou tente novamente mais tarde.");
        }
    });
}
