let activitiesSelect = document.getElementById("activities_select");
let questions_div = document.getElementById("questions_div");

// Carregamento das Perguntas
async function fetchQuestion() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });

    const response = await fetch('/activities/api/' + params.id);
    return await response.json();
}

async function loadActivity() {
    questions_div.innerHTML = ""; // Limpa as perguntas

    // Exibe as perguntas na tela
    const questions = await fetchQuestion()
    for (const question of questions) {
        let question_ui = document.createElement("div");
        question_ui.setAttribute("id", "div_question_" + question.id);
        question_ui.classList.add("mb-4", "p-4", "rounded-2xl", "border");
        question_ui.style.paddingBottom = "20%";
        question_ui.innerHTML = question.content;
        questions_div.appendChild(question_ui);
    }
}

loadActivity().then(() => {window.print();});
