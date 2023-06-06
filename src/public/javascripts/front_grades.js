//"has the page already loaded?" variable and number of students variable
let page_loaded = 0;
let student_num = 1;

//variable that stores the DOM students list element
const students_list = document.getElementById('studentsList');

//auxiliary variables to remove elements
let modal_list = []
//or create unique ids / elements
let radio_group = 0;
let radio_num = 0;
let cancel_num = 0;

//variable that stores the DOM activities select element
const actvSelect = document.getElementById('activities');

//variable that stores the DOM classrooms select element
const classSelect = document.getElementById('classrooms');

//changing the page content when the user selects a classroom
classSelect.addEventListener('change', function(){
    getClassData(parseInt(classSelect.value));
    getModalData(parseInt(actvSelect.value), parseInt(classSelect.value));
});

//changing the page content when the user selects a activity
actvSelect.addEventListener('change', function(){
    getModalData(parseInt(actvSelect.value), parseInt(classSelect.value));
});

//executes once the page is loaded
window.addEventListener('load', getData);

//auxiliary function to render data on pageload
function getData(){
    getSelectActvData();
    getClassData(0);
};


//gets the data to write the modals' content
function getModalData(actv_id, class_id){
    let request = new XMLHttpRequest;
    request.open('GET', `grades/modal?actvId=${actv_id}&classId=${class_id}`, true); 
    request.send();
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            let requestData = request.responseText;
            requestData = JSON.parse(requestData);
            buildModalData(requestData, actv_id);
        };
    };
};


//gets the data to write the activity select's data
function getSelectActvData(){
    let request = new XMLHttpRequest;
    request.open('GET', 'grades/selectactv', true); 
    request.send();
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            let requestData = request.responseText;
            requestData = JSON.parse(requestData);
            buildSelectActivities(requestData);

        };
    };
};


//gets the data to write the classroom select's data
function getClassData(class_id){
    let request = new XMLHttpRequest;
    request.open('GET', 'grades/selectclass', true);
    request.send();
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            let requestData = request.responseText
            requestData = JSON.parse(requestData);
            buildClassroomsData(requestData, class_id);
        };
    };
};


//filters and organizes the data used to construct the modals' content 
function buildModalData(data, actv_id){
    dataArray = [[],[],[],[]];

    let stdIds = dataArray[0];
    let stdNames = dataArray[1];
    let questIds = dataArray[2];
    let questMaxGs = dataArray[3];
    let stdIndex = 0;

    for(let i = 0; i < data.length; i++){
        if(i > 0 && data[i].std_id != data[i-1].std_id){
            stdIds.push(data[i].std_id);
            stdNames.push(data[i].std_name);
            stdIndex = i;
        }
        else if(i > 0 && data[i].std_id === data[i-1].std_id && stdIndex === 0){
            questIds.push(data[i].quest_id);
            questMaxGs.push(data[i].quest_max_grade);
        }
        else if(i === 0 && stdIndex === 0){
            stdIds.push(data[i].std_id);
            stdNames.push(data[i].std_name);
            questIds.push(data[i].quest_id);
            questMaxGs.push(data[i].quest_max_grade);
        };
    };

    //creating the possible grade values
    let possible_grades = [];
    for(let i = 0; i < questMaxGs.length; i++){
        let max = questMaxGs[i];
        possible_grades.push(calculateGrades(max));
    };

    if(page_loaded === 0){
        for(let i = 0; i < stdIds.length; i++){
            let stdId = stdIds[i];
            let stdName = stdNames[i];
            buildModal(stdId, stdName, questIds, possible_grades);
        };
    }
    else{
        deleteModals();
        for(let i = 0; i < stdIds.length; i++){
            let stdId = stdIds[i];
            let stdName = stdNames[i];
            buildModal(stdId, stdName, questIds, possible_grades);
        };
    };
};


//calculating the possible grade values and the intervals
function calculateGrades(num){
    let grades_array = []
    let interval = 0;
    if(num < 7 && num > 0){
        interval = num / (4 * num);
        for(let i = 0; i <= num; i = i + interval){
            grades_array.push(i);
        };
    }
    else if(num > 6 && num < 21){
        interval = num / num;
        for(let i = 0; i <= num; i = i + interval){
            grades_array.push(i);
        };
    }
    else if(num > 20 && num < 41){
        interval = (num / num) * 2;
        for(let i = 0; i <= num; i = i + interval){
            grades_array.push(i);
        };
    }
    else if(num > 40 && num < 500){
        interval = num / (num / 10);
        for(let i = 0; i <= num; i = i + interval){
            grades_array.push(i);
        };
    }
    else{
        interval = num / 100;
        for(let i = 0; i <= num; i = i + interval){
            grades_array.push(i);
        };
    };
    return grades_array;
};


//builds the activity select's content
function buildSelectActivities(data){

    dataArray = [[],[]];

    let actvIds = dataArray[0];
    let actvNames = dataArray[1];
    for(let i = 0; i < data.length; i++){
        actvIds.push(data[i].actv_id);
        actvNames.push(data[i].actv_name);
    };

    for(let i = 0; i < actvIds.length; i++){
        let actv_id = actvIds[i];
        let actv_name = actvNames[i];
        buildSelect(actv_id, actv_name, actvSelect);
    };
};


//builds the page's content related to the selected classroom
function buildClassroomsData(data, classroom_id){
 
    dataArray = [[],[],[],[]];

    let classIds = dataArray[0];
    let classNames = dataArray[1];
    let stdIds = dataArray[2];
    let stdNames = dataArray[3];
    let stdIndex = 0;

    for(let i = 0; i < data.length; i++){
        if(i > 0 && data[i].class_id === data[i - 1].class_id){
            stdIds[stdIndex].push(data[i].std_id);
            stdNames[stdIndex].push(data[i].std_name);
        }
        else if(i > 0 && data[i].class_id != data[i - 1].class_id){
            stdIndex++;
            classIds.push(data[i].class_id);
            classNames.push(data[i].class_name);
            stdIds.push([data[i].std_id]);
            stdNames.push([data[i].std_name]);
        }
        else{
            classIds.push(data[i].class_id);
            classNames.push(data[i].class_name);
            stdIds.push([data[i].std_id]);
            stdNames.push([data[i].std_name]);
        };
    };

    if(page_loaded != 0){
        deleteNames(students_list)
    }
    else{
        for(let i = 0; i < classIds.length; i++){
            let class_id = classIds[i];
            let class_name = classNames[i];
            buildSelect(class_id, class_name, classSelect);
        };
    }
    page_loaded++

    //getting the students from the selected classroom
    stdIndex = classIds.indexOf(classroom_id);

    student_num = 1;
    for(let i = 0; i < stdIds[stdIndex].length; i++){
        let std_id = stdIds[stdIndex][i];
        let std_name = stdNames[stdIndex][i];
        createListElem(std_id, std_name, students_list);
    };
};


//builds the selects' content
function buildSelect(id, name, element){
    let option = document.createElement('option');
    option.innerHTML = `${name}`;
    option.value = id;

    element.appendChild(option);
};


//writes the students list
function createListElem(id, name, list){

    let li = document.createElement('li');
    let button = document.createElement('button');

    if(student_num != 1){
        li.classList.add('mt-2');
    };

    button.classList.add("sm:pr-[60%]", 'text-left', "pr-[37%]", "hover:bg-[#D9D9D9]", "dark:hover:bg-[#333333]", "bg-transparent", "rounded-md", "pl-2", "py-1");
    button.addEventListener("click", function(){
        const modal = document.getElementById(`student-${id}-modal`);
        modal.classList.toggle("hidden");
    })
    button.innerHTML = `${student_num}. ${name}`;
    student_num++

    li.appendChild(button)
    list.appendChild(li)
};

//destroys the students list when the user selects another classroom
function deleteNames(list){
    while(list.hasChildNodes()){
        list.removeChild(list.firstChild)
    };
};


//destroys the existing modals when the user selects another activity or classroom
function deleteModals(){
    for(let i = 0; i < modal_list.length; i++){
        const modal = document.getElementById(modal_list[i]);
        modal.remove();
    };
    modal_list = [];
};


//builds the modals' content
function buildModal(std_id, std_name, questions, questions_grades){
    let question_num = 1;

    let modal = document.createElement('div');
    modal.classList.add("fixed", "top-0","right-0","left-0", "z-50", "hidden", "w-9/12", "overflow-x-hidden", "overflow-y-auto", "max-h-screen", 'items-center', "mx-auto", "md:inset-0", "h-[calc(100%-1rem)]");
    modal.setAttribute("id", `student-${std_id}-modal`);
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("aria-hidden", "true")
    modal_list.push(modal.id)

    let modal_container = document.createElement('div');
    modal_container.classList.add("w-fit","p-6", "mx-auto", "max-h-full", "max-w-[85%]");

    let modal_body = document.createElement('div');
    modal_body.classList.add("rounded-lg", "shadow", "bg-[#16AFB8]", "dark:shadow-[#7A7A7A]");

    let modal_upper_body = document.createElement('div');
    modal_upper_body.classList.add("flex", "items-center", "justify-between", "p-5", "border-b", "rounded-t");

    let modal_title = document.createElement("h3");
    modal_title.classList.add("text-xl", "font-medium", "pt-6", "pl-6", "text-[#F0F0F0]");
    modal_title.innerHTML = `${std_name}`

    let radios_div = document.createElement("div");
    radios_div.classList.add("p-6", "space-y-6");
    
    let rd1_list = [];
    for(let i = 0; i < questions.length; i++){
        let rdiv_frstcomponent = document.createElement("div");
        rdiv_frstcomponent.classList.add("rounded-lg", "bg-[#F0F0F0]", "dark:bg-[#1F1F1F]", "shadow", "dark:shadow-[#7A7A7A]", "w-full");

        let paragraph = document.createElement("p");
        paragraph.classList.add("ml-2", "py-2", "text-[#16afb8]")
        paragraph.innerHTML = `Questão ${question_num}:`
        question_num++;
        rdiv_frstcomponent.appendChild(paragraph)
        rd1_list.push(rdiv_frstcomponent);
    };

    let rd2_list = [];
    for(let i = 0; i < questions.length; i++){
        let rdiv_scndcomponent = document.createElement("div");
        rdiv_scndcomponent.classList.add("flex", "items-center", "p-6", "rounded-b", "flex-row", "flex-wrap", "justify-center", "border-[#F0F0F0]");
        rd2_list.push(rdiv_scndcomponent);
    };

    let rd3_list = [];
    for(let i = 0; i < questions.length; i++){
        let rdiv_thrdcomponent = document.createElement("div");
        rdiv_thrdcomponent.classList.add("flex", "flex-row", "flex-wrap", "space-y-1", "gap-x-2", "rounded", "hover:bg-[#D9D9D9]", "dark:hover:bg-[#333333]", "items-center", "justify-center");
        rdiv_thrdcomponent.setAttribute("id", `radios-div-${radio_num}`);
        rd3_list.push(rdiv_thrdcomponent);
        radio_num++;
    };

    let radios_labels_list = [[]];
    let rl_index = 0;
    for(let i = 0; i < questions_grades.length; i++){
        for(let g = 0; g < questions_grades[i].length; g++){
            let grade = questions_grades[i][g];

            let radio = document.createElement("input");
            radio.classList.add("w-4", "h-4", "text-[#16afb8]", "bg-[#F0F0F0]", "border-[#D9D9D9]", "focus:ring-[#369398]");
            radio.setAttribute("type", "radio");
            radio.setAttribute("name", `${radio_group}`);
            radio.setAttribute("value", `${grade}`);

            let label_div = document.createElement("div");
            label_div.classList.add("text-sm");

            let label = document.createElement("label");
            label.classList.add("font-medium", "text-[#16AFB8]");
            label.innerHTML = grade;

            label_div.appendChild(label);
            radios_labels_list[rl_index].push(radio, label_div);
        };
        rl_index++;
        radios_labels_list.push([]);
        radio_group++
    };

    let modal_bot_buttons_div = document.createElement("div");
    modal_bot_buttons_div.classList.add("flex", "items-center", "p-6", "space-x-4", "border-t", "rounded-b");

    let modal_save = document.createElement("button");
    modal_save.setAttribute("type", "button");
    modal_save.addEventListener("click", function(){
        let modal = document.getElementById(`student-${std_id}-modal`);
        modal.classList.toggle("hidden");
    });
    modal_save.classList.add("text-[#16AFB8]", "bg-[#F0F0F0]", "dark:bg-[#1F1F1F]", "hover:bg-[#D9D9D9]", "dark:hover:bg-[#333333]", "font-medium", "rounded-lg", "text-sm", "px-5", "py-3", "text-center");
    modal_save.innerHTML = "Salvar";

    let modal_cancel = document.createElement("button");
    modal_cancel.setAttribute("type", "button");
    modal_cancel.setAttribute("id", `cancel-${std_id}`);

    modal_cancel.classList.add("text-[#F0F0F0]", "bg-[#f74444]", "hover:bg-[#be3232]", "rounded-lg", "text-sm", "font-medium", "px-4", "py-3", "hover:text-[#D9D9D9]");
    modal_cancel.innerHTML = "Cancelar";

    modal_bot_buttons_div.appendChild(modal_save);
    modal_bot_buttons_div.appendChild(modal_cancel);

    let rd3_index = 0;
    for(let i = 0; i < radios_labels_list.length; i++){
        for(let l = 0; l < radios_labels_list[i].length; l++){
            let element = radios_labels_list[i]
            rd3_list[rd3_index].appendChild(element[l]);
        };
        rd3_index++;
    };

    for(let i = 0; i < rd3_list.length; i++){
        rd2_list[i].appendChild(rd3_list[i]);
    };

    for(let i = 0; i < rd2_list.length; i++){
        rd1_list[i].appendChild(rd2_list[i]);
    };

    for(let i = 0; i < rd1_list.length; i++){
        radios_div.appendChild(rd1_list[i]);
    };

    modal_upper_body.appendChild(modal_title);
    modal_body.appendChild(modal_upper_body);
    modal_body.appendChild(radios_div);
    modal_body.appendChild(modal_bot_buttons_div);
    modal_container.appendChild(modal_body);
    modal.appendChild(modal_container);
    let main = document.getElementById("main");
    main.appendChild(modal);

    let cancel_list = [];
    for(let i = 0; i < questions.length; i++){
        const radios_div = document.getElementById(`radios-div-${cancel_num}`);
        const childs = radios_div.childNodes;
        cancel_list = cancel_list.concat(Array.from(childs));
        cancel_num++;
    };

    modal_cancel.addEventListener("click", function(){
        for(let i = 0; i < cancel_list.length; i++){
            if(cancel_list[i].checked === true){
                cancel_list[i].checked = false; 
            };
        };
        const modal = document.getElementById(`student-${std_id}-modal`);
        modal.classList.toggle("hidden");
    });
};
