let editors = [];

createRichTextEditor();
document.getElementById("btn_add_editor").addEventListener("click", createRichTextEditor);
document.getElementById("btn_save").addEventListener("click", saveActivity);
document.getElementById("btn_home_page").addEventListener("click", () => {window.location.href = "/activities"});

function createRichTextEditor() {
    let id = editors.length.toString();

    let editor = document.createElement("div");
    editor.setAttribute("id", "div_editor_" + id);
    editor.setAttribute("class", "mb-4 p-4 rounded-2xl");
    document.getElementById("editors").appendChild(editor);

    editors.push(new RichTextEditor("#div_editor_" + id));
}

async function saveActivity() {
    let title = document.getElementById("input_title").value;
    let activityId = await createActivity(title);

    editors.forEach(editor => {
        createQuestion(activityId, editor)
    });

    document.getElementById("saved_modal").classList.toggle("hidden");
}

async function createQuestion(activityId, editor) {
    const response = await fetch("http://127.0.0.1:3000/questions/api", {
        method: "POST",
        body: JSON.stringify({
            // TODO: Remove static params
            activity_id: activityId,
            criterium_id: 1,
            max_grade_percent: 50,
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

async function createActivity(title) {
    const response = await fetch("http://127.0.0.1:3000/activities/api", {
        method: "POST",
        body: JSON.stringify({
            // TODO: Remove these IDs
            user_id: 1,
            classroom_id: 1,
            title: title
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
