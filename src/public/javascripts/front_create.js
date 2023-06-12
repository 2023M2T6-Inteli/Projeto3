let editors = [];

function createRichTextEditor() {
    let id = editors.length.toString();

    let editor = document.createElement("div");
    editor.setAttribute("id", "div_editor_" + id);
    editor.setAttribute("class", "mb-4 p-4 rounded-2xl");
    document.getElementById("editors").appendChild(editor);

    editors.push(new RichTextEditor("#div_editor_" + id));
}

createRichTextEditor();
document.getElementById("btn_add_editor").addEventListener("click", createRichTextEditor);

//editor1.setHTMLCode("Use inline HTML or setHTMLCode to init the default content.");
