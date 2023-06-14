let editors = [];

function createRichTextEditor() {
    let id = editors.length.toString();

    let editor = document.createElement("div");
    editor.setAttribute("id", "div_editor_" + id);
    editor.setAttribute("class", "mb-4 p-4 rounded-2xl");
    document.getElementById("editors").appendChild(editor);

    editors.push(new RichTextEditor("#div_editor_" + id));
}

function saveActivity() {
    let activityId = createActivity(title);

    editors.forEach(editor => {
        createQuestion(activityId)
    });
}

function createQuestion(activityId) {
    alert("Created question with Activity ID: " + activityId);
}

function createActivity(title) {
    return 1
}

createRichTextEditor();
document.getElementById("btn_add_editor").addEventListener("click", createRichTextEditor);
document.getElementById("btn_save").addEventListener("click", saveActivity);

//editor1.setHTMLCode("Use inline HTML or setHTMLCode to init the default content.");
