// Pegar do pug o botão e o conteúdo a ser duplicado
const botaoClicado = document.getElementById('addQuestionButton');
const caixaDePerguntas = document.getElementById('questionBox');
const botoesFixos = document.getElementById('submitButtons')
const deletarClicado = document.getElementById('deleteQuestionButton');

var codigoDuplicado; // Variável global para armazenar a cópia

// Event Listener vai "ouvir" os cliques do nosso botão e chamar a função funcaoNova()
botaoClicado.addEventListener('click', funcaoDuplicar);
deletarClicado.addEventListener('click', funcaoDeletar);

// Function to duplicate the code
function funcaoDuplicar() {
  // Clonar o node/parte do html que está em codParaCopiar e colocar em codigoDuplicado
  codigoDuplicado = caixaDePerguntas.cloneNode(true);
  codigoDuplicado.style.marginTop = '30px'; // Modifiquei mt para marginTop para corrigir o estilo

  // Adicionar evento de clique para o botão de deletar na cópia
  const deletarClicadoCopia = codigoDuplicado.querySelector('#deleteQuestionButton');

  // Remover o evento de clique existente antes de adicionar um novo evento
  deletarClicadoCopia.removeEventListener('click', funcaoDeletar);

  deletarClicadoCopia.addEventListener('click', funcaoDeletar);

  // Inserir a cópia antes da pergunta original
  caixaDePerguntas.parentNode.insertBefore(codigoDuplicado, caixaDePerguntas);

  // Adicionar novamente o evento de clique para o botão de deletar original
  deletarClicado.addEventListener('click', funcaoDeletar);
}

function funcaoDeletar() {
  if (codigoDuplicado) {
    codigoDuplicado.parentNode.removeChild(codigoDuplicado);
    codigoDuplicado = null; // Resetar a variável para null após a remoção
  }
}