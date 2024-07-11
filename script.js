document.addEventListener('DOMContentLoaded', function() {
  // Verificar se há dados de aluno no localStorage
  const alunoSalvo = localStorage.getItem('aluno');

  if (alunoSalvo) {
    // Converter o JSON do aluno de volta para um objeto JavaScript
    const aluno = JSON.parse(alunoSalvo);

    // Preencher os campos na página HTML com os dados do aluno
    document.getElementById('nomeAluno').textContent = aluno.nome;
    document.getElementById('idadeAluno').textContent = aluno.idade + ' anos';
    document.getElementById('serieAluno').textContent = aluno.serie;
    document.getElementById('nomeEscola').textContent = aluno.escola;
    document.getElementById('materiaFavorita').textContent = aluno.materia;
    document.getElementById('ruaAluno').textContent = aluno.endereco.rua;
    document.getElementById('cidadeAluno').textContent = aluno.endereco.cidade;
    document.getElementById('estadoAluno').textContent = aluno.endereco.estado;
  } else {
    alert('Nenhum aluno encontrado no localStorage.');
  }

  // Array para armazenar todas as notas adicionadas
  let notasAdicionadas = JSON.parse(localStorage.getItem('notasAdicionadas')) || [];

  // Função para calcular a média das notas
  function calcularMedia(notas) {
    let soma = 0;
    for (let i = 0; i < notas.length; i++) {
      soma += notas[i];
    }
    return soma / notas.length;
  }

  // Array para armazenar todas as médias calculadas
  let mediasCalculadas = notasAdicionadas.map(nota => calcularMedia([nota.nota1, nota.nota2, nota.nota3, nota.nota4]));

  // Função para adicionar uma nova linha na tabela de notas
  function adicionarLinha() {
    let nomeMateria = prompt("Digite o nome da matéria:");
    let notas = [];
    let i = 0;
    while (i < 4) {
      let nota = parseFloat(prompt(`Digite a nota ${i + 1}:`));
      notas.push(nota);
      i++;
    }

    let media = calcularMedia(notas);

    // Adiciona a média ao array de médias calculadas
    mediasCalculadas.push(media);

    // Adiciona as notas ao array de notas adicionadas
    let novaNota = {
      nome: nomeMateria,
      nota1: notas[0],
      nota2: notas[1],
      nota3: notas[2],
      nota4: notas[3],
      media: media.toFixed(2)
    };
    notasAdicionadas.push(novaNota);
    // Atualiza o localStorage
    localStorage.setItem('notasAdicionadas', JSON.stringify(notasAdicionadas));

    renderizarTabelaNotas(notasAdicionadas);
    atualizarMediaGeral();
    atualizarMaiorMedia();
  }

  // Função para renderizar a tabela de notas
  function renderizarTabelaNotas(notas) {
    let tbody = document.querySelector("#tabela-notas tbody");
    tbody.innerHTML = ""; // Limpar a tabela

    notas.forEach(nota => {
      let newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${nota.nome}</td>
        <td>${nota.nota1}</td>
        <td>${nota.nota2}</td>
        <td>${nota.nota3}</td>
        <td>${nota.nota4}</td>
        <td>${nota.media}</td>
      `;
      tbody.appendChild(newRow);
    });

    atualizarMediaGeral();
    atualizarMaiorMedia();
  }

  // Função para calcular a média geral de todas as notas adicionadas
  function calcularMediaGeral() {
    if (notasAdicionadas.length === 0) {
      return 0; // Retorna 0 se não houver notas adicionadas
    }

    let soma = 0;
    for (let i = 0; i < notasAdicionadas.length; i++) {
      soma += parseFloat(notasAdicionadas[i].nota1) + parseFloat(notasAdicionadas[i].nota2) + parseFloat(notasAdicionadas[i].nota3) + parseFloat(notasAdicionadas[i].nota4);
    }
    return soma / (notasAdicionadas.length * 4);
  }

  // Função para atualizar a média geral na interface
  function atualizarMediaGeral() {
    let mediaGeral = calcularMediaGeral();
    document.querySelector("#media-geral").textContent = `A média geral do aluno é ${mediaGeral.toFixed(2)}`;

    let mensagem = mediaGeral >= 7 ? 
          `Parabéns, você passou! Sua média foi: ${mediaGeral.toFixed(2)}` : 
          `Infelizmente, você está de recuperação. Sua média foi: ${mediaGeral.toFixed(2)}`;
    document.querySelector("#mensagem").textContent = mensagem;
  }

  // Função auxiliar para encontrar o maior número em um array
  function maiorNumero(arr) {
    let maior = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > maior) {
        maior = arr[i];
      }
    }
    return maior;
  }

  // Função para atualizar a maior média na interface
  function atualizarMaiorMedia() {
    if (mediasCalculadas.length > 0) {
      let maiorMedia = maiorNumero(mediasCalculadas);
      document.getElementById("maior-media").textContent = `A maior média entre as matérias é ${maiorMedia.toFixed(2)}`;
    }
  }

  // Adicionar evento ao botão "Adicionar Linha"
  let addLinhaButton = document.getElementById("add-linha");
  addLinhaButton.addEventListener("click", adicionarLinha);

  // Função para carregar a lista de alunos do arquivo alunos.json
  async function carregarListaAlunos() {
    try {
      const response = await fetch("alunos.json");
      const alunos = await response.json();
      const listaAlunos = document.querySelector("#alunos");

      alunos.forEach((aluno) => {
        const li = document.createElement("li");
        li.textContent = aluno.nome;
        listaAlunos.appendChild(li);
      });
    } catch (error) {
      alert("Erro ao carregar a lista de alunos.");
      console.error(error);
    }
  }

  // Chamar a função para carregar a lista de alunos
  carregarListaAlunos();

  // Renderizar as notas salvas no localStorage ao carregar a página
  renderizarTabelaNotas(notasAdicionadas);
  atualizarMediaGeral();
  atualizarMaiorMedia();
});
