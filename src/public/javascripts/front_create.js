// Pegar do pug o botão, posições e o conteúdo a ser duplicado
const addQuestionButton = document.getElementById('addQuestionButton');
const questionBox = document.getElementById('questionBox');
const submitButtons = document.getElementById('submitButtons');

// Event Listener vai "ouvir" os cliques do nosso botão e chamar a função duplicate()
addQuestionButton.addEventListener('click', duplicate);

//define a posição da caixa de perguntas duplicada
function duplicate() {
  const duplicatedQuestionBox = cloneQuestionBox();
  duplicatedQuestionBox.style.marginTop = '20px';
  //define a posição da questionBox original para ficar no topo, antes da duplicado e dos botões imprimir e adicionar pergunta
  questionBox.parentNode.insertBefore(duplicatedQuestionBox, submitButtons);
}

// Function to clone the question box
function cloneQuestionBox() {
  //cahama a função de id 
  const newId = generateUniqueId();
  const clonedQuestionBox = questionBox.cloneNode(true);
  // atribui um id único para a questionBox duplicada, sem este id ao excluir uma as cópias de questionBox o botão de deletar das outras para de funcionar
  clonedQuestionBox.setAttribute('id', 'questionBox' + newId);
  clonedQuestionBox.classList.add('cloned-element');
  // Adicionar evento de clique para o botão de deletar na cópia
  const deletarClicadoCopia = clonedQuestionBox.querySelector('#deleteQuestionButton');
  // adiciona um id único para o deleteQuestionButton duplicado, para quee ele funcione mesmo que outras cópias sejam excluidas
  deletarClicadoCopia.setAttribute('id', 'deleteQuestionButton' + newId);
  deletarClicadoCopia.addEventListener('click', functionDelete);
  return clonedQuestionBox;
}

// Função para deletar a question box que o botão está inserido
function functionDelete(event) {
  const deleteButton = event.target;
  const questionBox = deleteButton.closest('.cloned-element');
  if (questionBox) {
    questionBox.remove();
  }
}

// Gera um id único para que os elementos duplicados do código não conflitam entre si
function generateUniqueId() {
  return 'cloned-element-' + Math.random().toString(36).substr(2, 9);
}
