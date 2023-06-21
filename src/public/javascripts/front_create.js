let editors = [];
let activityId = null;

createRichTextEditor();
document.getElementById("btn_add_editor").addEventListener("click", createRichTextEditor);
document.getElementById("btn_save").addEventListener("click", saveActivity);
document.getElementById("btn_home_page").addEventListener("click", () => { window.location.href = "/activities" });
document.getElementById("btn_print").addEventListener("click", saveAndPrint);


/**
 * Pega critérios da Base de Dados
 * @return {[Array]}     Array com critérios da BNCC
 */
async function criteria() {
    let response = await fetch("http://127.0.0.1:3000/criteria", {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    return await response.json();
}

/**
* Dropwdown com os critérios da BNCC
*/
async function criteriaDropdown(id) {
    let criteriaDropdown = document.createElement("select");
    criteriaDropdown.setAttribute("id", "select_criteria_" + id);
    criteriaDropdown.setAttribute("class", "mb-4 bg-gray-50 dark:bg-[#1F1F1F] border border-gray-300 text-[#16afb8] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500");

    var placeholder = document.createElement('option');
    placeholder.innerHTML = "Selecione um critério da BNCC";
    placeholder.setAttribute("disabled", "true");
    placeholder.setAttribute("selected", "true");
    criteriaDropdown.appendChild(placeholder);

    (await criteria()).forEach(criterium => {
        var opt = document.createElement('option');
        opt.value = criterium.id;
        opt.innerHTML = criterium.synthesis;
        criteriaDropdown.appendChild(opt);
    });

    return criteriaDropdown
}

/**
 * Caixa de texto para inserir a nota máxima da questão
 */
function gradeInput(id) {
    let grade_box = document.createElement("input");
    grade_box.setAttribute("id", "input_grade_" + id);
    grade_box.setAttribute("placeholder", "Máximo de Pontos");
    grade_box.setAttribute("type", "number");
    grade_box.setAttribute("min", "0");
    grade_box.setAttribute("class", "mr-4 w-1/3 bg-gray-50 dark:bg-[#1F1F1F] border border-gray-300 text-[#16afb8] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500");

    return grade_box
}

/**
 * Botão para remover a questão
 */
function removeQuestionButton(id) {
    let remove_editor = document.createElement("button");
    remove_editor.setAttribute("id", "button_remove_editor_" + id);
    remove_editor.setAttribute("class", "mr-auto font-medium shadow rounded-lg text-sm px-4 text-center bg-[#F0F0F0] sm:bg-[#16afb8] text-[#16AFB8] sm:text-[#F0F0F0] hover:bg-[#D9D9D9] sm:hover:bg-[#369398] sm:px-5 py-3.5");
    remove_editor.innerHTML = "Remover questão";
    remove_editor.addEventListener("click", () => { editors[id].deleted = true; document.getElementById("div_editor_container_" + id).remove() });

    return remove_editor
}

/**
* Cria um editor de texto
*/
async function createRichTextEditor() {
    let id = editors.length.toString();

    let editorContainer = document.createElement("div");
    editorContainer.setAttribute("id", "div_editor_container_" + id);
    editorContainer.setAttribute("class", "mb-4 p-4 rounded-2xl bg-white dark:bg-[#1F1F1F]");
    editorContainer.appendChild(await criteriaDropdown(id));

    // Editor de Texto
    let editor = document.createElement("div");
    editor.setAttribute("id", "div_editor_" + id);
    editorContainer.appendChild(editor);

    // Barra de ferramentas inferior
    let toolbar = document.createElement("div");
    toolbar.setAttribute("class", "flex mt-4 ");

    // Caixa com valor da questão
    toolbar.appendChild(gradeInput(id));

    // Botão de remover a questão
    toolbar.appendChild(removeQuestionButton(id));

    editorContainer.appendChild(toolbar);
    document.getElementById("editors").appendChild(editorContainer);
    editors.push({ deleted: false, editor: new RichTextEditor("div_editor_" + id) });
}

/**
* Salva a atividade no banco de dados
*/
async function saveActivity() {
    let title = document.getElementById("input_title").value;
    activityId = await createActivity(await title);

    editors.forEach((editor, index) => {
        createQuestion(activityId, editor.editor, index)
    });

    document.getElementById("saved_modal").classList.toggle("hidden");
}

/**
* Cria uma questão no banco de dados
*/
async function createQuestion(activityId, editor, index) {
    const response = await fetch("http://127.0.0.1:3000/questions/api", {
        method: "POST",
        body: JSON.stringify({
            activity_id: activityId,
            criterium_id: document.getElementById("select_criteria_" + index).value,
            max_grade_percent: document.getElementById("input_grade_" + index).value,
            content: editor.getHTMLCode()
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    if (response.ok) {
        // Show success modal
    }
    else {
        alert("Erro!")
        throw new Error("HTTP-Error: " + response.status);
    }
}

/**
* Cria uma atividade no banco de dados
*/
async function createActivity(title) {
    const response = await fetch("http://127.0.0.1:3000/activities/api", {
        method: "POST",
        body: JSON.stringify({
            // TODO: Remove these IDs
            user_id: 1,
            classroom_id: 1,
            name: title
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    if (response.ok) {
        const json = await response.json();
        return json.id;
    }
    else {
        alert("Erro!")
        throw new Error("HTTP-Error: " + response.status);
    }
}

/**
* Salva a atividade e redireciona para a página de impressão
*/
function saveAndPrint() {
    // Espera salvar a atividade e redireciona para a página de impressão
    saveActivity().then(() => {
        window.location.href = "/print?id=" + activityId;
    });
}
