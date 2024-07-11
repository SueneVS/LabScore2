document.addEventListener('DOMContentLoaded', function() {
    const buscarCepBtn = document.getElementById('buscarCepBtn');

    buscarCepBtn.addEventListener('click', function() {
        const cepInput = document.getElementById('cep').value;
        buscarCep(cepInput);
    });
});

async function buscarCep(cep) {
    if (cep.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (!data.erro) {
                document.getElementById('rua').value = data.logradouro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
            } else {
                alert('CEP não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao buscar o CEP:', error);
            alert('Erro ao buscar o CEP. Tente novamente.');
        }
    } else {
        alert('Digite um CEP válido com 8 dígitos.');
    }

    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Obter os valores dos campos do formulário
        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const serie = document.getElementById('serie').value;
        const escola = document.getElementById('escola').value;
        const materia = document.getElementById('materia').value;
        const cep = document.getElementById('cep').value;

        // Verificar se o CEP foi buscado e preenchido antes de salvar
        const rua = document.getElementById('rua').value;
        const cidade = document.getElementById('cidade').value;
        const estado = document.getElementById('estado').value;

        // Validar se todos os campos foram preenchidos
        if (nome && idade && serie && escola && materia && cep && rua && cidade && estado) {
            // Criar objeto com os dados do aluno
            const aluno = {
                nome: nome,
                idade: idade,
                serie: serie,
                escola: escola,
                materia: materia,
                endereco: {
                    rua: rua,
                    cidade: cidade,
                    estado: estado
                }
            };

            // Salvar dados no localStorage
            localStorage.setItem('aluno', JSON.stringify(aluno));

            // Redirecionar para a tela de home do aluno
            window.location.href = 'home.html';
        } else {
            alert('Preencha todos os campos antes de cadastrar.');
        }
    });

    
}