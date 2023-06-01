// Pegar do pug o botão e o conteúdo a ser duplicado
const botaoClicado = document.getElementById('addQuestionButton');
const caixaDePerguntas = document.getElementById('questionBox');
const botoesFixos = document.getElementById('submitButtons')
const deletarClicado = document.getElementById('deleteQuestionButton');

var codigoDuplicado; // Variável global para armazenar a cópia

// Event Listener vai "ouvir" os cliques do nosso botão e chamar a função funcaoNova()
botaoClicado.addEventListener('click', funcaoDuplicar);
deletarClicado.addEventListener('click', funcaoDeletar);

// Função para duplicar a caixa de perguntas
function funcaoDuplicar() {
  // Clonar o node/parte do html que está em codParaCopiar e colocar em codigoDuplicado
  codigoDuplicado = caixaDePerguntas.cloneNode(true);
  codigoDuplicado.style.marginTop = '20px'; // Modifiquei mt para marginTop para corrigir o estilo

  // Inserir a cópia antes da pergunta original
  caixaDePerguntas.parentNode.insertBefore(codigoDuplicado, botoesFixos);

}

