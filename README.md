# LabScore2

Projeto LabScore2 é um mini projeto básico desenvolvido em HTML e JavaScript. Este mini projeto, visa fornecer uma plataforma online para gestão de notas e alunos. Ela representa uma plataforma de acompanhamento de notas.

![Imagem da tela de cadastro](/img/Imagem1.png)
![Imagem da tela de dados do alunos](/img/Imagem2.png)

## Funcionalidades

- Cadastro de alunos com informações pessoais e acadêmicas.
- Busca de endereço através do CEP.
- Exibição de dados do aluno cadastrado.
- Adição de notas para diferentes matérias.
- Cálculo da média de notas por matéria.
- Cálculo da média geral das notas.
- Identificação da maior média entre as matérias.
- Exibição de mensagens personalizadas baseadas na média geral.
- Listagem de alunos a partir de um arquivo JSON.

## Como Executar

Para visualizar o LabScore localmente, siga estas etapas:

1. Clone este repositório para o seu ambiente local.
2. Abra o arquivo index.html em um navegador da web.


## Uso

- Cadastro do Aluno
1. Preencha os campos com as informações do aluno.
2. Utilize o botão "Buscar CEP" para preencher automaticamente os campos de endereço.
3. Clique em "Cadastrar" para salvar os dados no localStorage e redirecionar para a página de exibição.

- Exibição dos Dados do Aluno
1. A página home.html exibe os dados do aluno cadastrados.
2. É possível adicionar linhas de notas para diferentes matérias.
3. As médias das notas são calculadas e exibidas automaticamente.
4. A média geral do aluno e a maior média entre as matérias também são exibidas.

- Lista de Alunos
1. A lista de alunos é carregada a partir do arquivo alunos.json e exibida na página home.html.

## Tecnologias Utilizadas

- HTML
- CSS
- JavaScript
- Bootstrap 5
- API ViaCEP para busca de endereço

## Sobre

Este mini-projeto foi desenvolvido, como exercício prático, com intuito de aplicar os conhecimentos adquiridos do Módulo Front-End do Curso FullStack oferecido pelo Lab365 e SESI/SENAI.
