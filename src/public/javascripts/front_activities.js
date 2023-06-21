// Drop-down de atividades
async function activities() {
    const response = await fetch('/activities/api');
    const data = await response.json();
    return data;
}

let activitiesSelect = document.getElementById("activities_select");
let questions_div = document.getElementById("questions_div");

activities().then(data => {
    data.forEach(activity => {
        let option = document.createElement("option");
        option.value = activity.id;
        option.text = activity.name;
        activitiesSelect.appendChild(option);
    });
});

// Carregamento das Perguntas
async function fetchQuestion() {
    const response = await fetch('/activities/api/' + activitiesSelect.value);
    return await response.json();
}

async function loadActivity() {
    questions_div.innerHTML = ""; // Limpa as perguntas

    // Exibe as perguntas na tela
    const questions = await fetchQuestion()
    for (const question of questions) {
        let question_ui = document.createElement("div");
        question_ui.setAttribute("id", "div_question_" + question.id);
        question_ui.classList.add("mb-4", "p-4", "rounded-2xl", "bg-white");
        question_ui.innerHTML = question.content;
        questions_div.appendChild(question_ui);
    }
}

document.getElementById("btn_view").addEventListener("click", loadActivity);
