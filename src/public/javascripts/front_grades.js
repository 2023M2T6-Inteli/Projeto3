let page_loaded = 0;
let student_num = 1;
const students_list = document.getElementById('studentsList');

const actvSelect = document.getElementById('activities');
const classSelect = document.getElementById('classrooms');

classSelect.addEventListener('change', function(){
    getClassData(parseInt(classSelect.value));
});


window.addEventListener('load', getData);

function getData(){
    getSelectActvData();
    getClassData();
};

function getSelectActvData(){
    let request = new XMLHttpRequest;
    request.open('GET', 'grades/selectactv', true); // 
    request.send();
    request.onreadystatechange = function(){ // se a requisição foi enviada e recebida
        if(request.readyState === 4 && request.status === 200){ // se a requisição pode ser lida
            let requestData = request.responseText; // qual a requisição
            requestData = JSON.parse(requestData); //transforma o conteúdo da requisição em json
            buildSelectActivities(requestData);

        };
    };
};

function getClassData(class_id = 1){
    let request = new XMLHttpRequest;
    request.open('GET', 'grades/selectclass', true); // 
    request.send();
    request.onreadystatechange = function(){ // se a requisição foi enviada e recebida
        if(request.readyState === 4 && request.status === 200){ // se a requisição pode ser lida
            let requestData = request.responseText // qual a requisição
            requestData = JSON.parse(requestData); //transforma o conteúdo da requisição em json
            buildClassroomsData(requestData, class_id);
        };
    };
};

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

    stdIndex = classIds.indexOf(classroom_id); // 0

    student_num = 1;
    for(let i = 0; i < stdIds[stdIndex].length; i++){
        let std_id = stdIds[stdIndex][i];
        let std_name = stdNames[stdIndex][i];
        createListElem(std_id, std_name, students_list);
    };
};

function buildSelect(id, name, element){
    let option = document.createElement('option');
    option.innerHTML = `${name}`;
    option.value = id;

    element.appendChild(option);
};

function createListElem(id, name, list){

    let li = document.createElement('li');
    let button = document.createElement('button');

    if(student_num != 1){
        li.classList.add('mt-2');
    };

    button.classList.add("sm:pr-[60%]", 'text-left', "pr-[37%]", "hover:bg-[#D9D9D9]", "dark:hover:bg-[#333333]", "bg-transparent", "rounded-md", "pl-2", "py-1");
    button.setAttribute('data-modal-target', 'student-modal');
    button.setAttribute('data-modal-toggle' ,'student-modal');
    button.innerHTML = `${student_num}. ${name}`;
    student_num++

    li.appendChild(button)
    list.appendChild(li)
};

function deleteNames(list){
    while(list.hasChildNodes()){
        list.removeChild(list.firstChild)
    };
};


/*
let modal = document.createElement('div');
modal.classList.add("",);
.fixed.top-0.left-0.right-0.z-50.hidden.w-full.p-4.overflow-x-hidden.overflow-y-auto.max-h-full(id="student-modal" tabindex="-1" class="md:inset-0 h-[calc(100%-1rem)]")

let modal_container = document.createElement('div');
moda_body.classList.add("",);
.relative.w-fit.max-h-full(class="max-w-[80%]")

let modal_body = document.createElement('div');
modal_body.classList.add("",);
    .relative.rounded-lg.shadow(class="bg-[#16AFB8] dark:shadow-[#7A7A7A]")

let modal_inner_body = document.createElement('div');
modal_body.classList.add("",);
        .flex.items-center.justify-between.p-5.border-b.rounded-t

let modal_title = document.createElement("h3");
modal_title.classList.add("",);
modal_title.innerHTML = *Nome do estudante
            h3.text-xl.font-medium(class="text-[#F0F0F0]")
                | Nome do estudante

            //Student modal
            
            button(type="button" class="text-[#F0F0F0] bg-transparent hover:bg-[#369398] hover:text-[#D9D9D9] rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="student-modal")
                svg(aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg")
                    path(fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd")
                span.sr-only Close modal
        .p-6.space-y-6
            .rounded-lg(class="bg-[#F0F0F0] dark:bg-[#1F1F1F] shadow dark:shadow-[#7A7A7A] w-full")
                //Modal style
                .flex.items-center.p-6.rounded-b.flex-wrap.justify-center(class="border-[#F0F0F0]")
                    .flex(class="p-2 rounded hover:bg-[#D9D9D9] dark:hover:bg-[#333333]")
                        .flex.items-center.h-5
                            input(id="helper-radio-3" name="helper-radio" type="radio" value="" class="w-4 h-4 text-[#16afb8] bg-[#F0F0F0] border-[#D9D9D9] focus:ring-[#369398]")
                        .ml-2.text-sm
                            label(for="helper-radio-3" class="font-medium text-[#16AFB8]")
                                | 0
                    .flex(class="p-2 rounded hover:bg-[#D9D9D9] dark:hover:bg-[#333333]")
                        .flex.items-center.h-5
                            input(id="helper-radio-4" name="helper-radio" type="radio" value="" class="w-4 h-4 text-[#16afb8] bg-[#F0F0F0] border-[#D9D9D9] focus:ring-[#369398]")
                        .ml-2.text-sm
                            label(for="helper-radio-4" class="font-medium text-[#16AFB8]")
                                | 1
                    .flex(class="p-2 rounded hover:bg-[#D9D9D9] dark:hover:bg-[#333333]")
                        .flex.items-center.h-5
                            input(id="helper-radio-5" name="helper-radio" type="radio" value="" class="w-4 h-4 text-[#16afb8] bg-[#F0F0F0] border-[#D9D9D9] focus:ring-[#369398]")
                        .ml-2.text-sm
                            label(for="helper-radio-5" class="font-medium text-[#16AFB8]")
                                | 2
                    .flex(class="p-2 rounded hover:bg-[#D9D9D9] dark:hover:bg-[#333333]")
                        .flex.items-center.h-5
                            input(id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-[#16afb8] bg-[#F0F0F0] border-[#D9D9D9] focus:ring-[#369398]")
                        .ml-2.text-sm
                            label(for="helper-radio-6" class="font-medium text-[#16AFB8]")
                                    | 3
                    .flex(class="p-2 rounded hover:bg-[#D9D9D9] dark:hover:bg-[#333333]")
                        .flex.items-center.h-5
                            input(id="helper-radio-7" name="helper-radio" type="radio" value="" class="w-4 h-4 text-[#16afb8] bg-[#F0F0F0] border-[#D9D9D9] focus:ring-[#369398]")
                        .ml-2.text-sm
                            label(for="helper-radio-7" class="font-medium text-[#16AFB8]")
                                    | 4
                    .flex(class="p-2 rounded hover:bg-[#D9D9D9] dark:hover:bg-[#333333]")
                        .flex.items-center.h-5
                            input(id="helper-radio-8" name="helper-radio" type="radio" value="" class="w-4 h-4 text-[#16afb8] bg-[#F0F0F0] border-[#D9D9D9] focus:ring-[#369398]")
                        .ml-2.text-sm
                            label(for="helper-radio-8" class="font-medium text-[#16AFB8]")
                                    | 5
                
        .flex.items-center.p-6.space-x-4.border-t.rounded-b(class="border-[#F0F0F0]")
            //Modal submit buttons
            button(data-modal-hide="student-modal" type="button" class="text-[#16AFB8] bg-[#F0F0F0] dark:bg-[#1F1F1F] hover:bg-[#D9D9D9] dark:hover:bg-[#333333] font-medium rounded-lg text-sm px-5 py-2.5 text-center")
                | Salvar
            button(data-modal-hide="student-modal" type="button" class="text-[#F0F0F0] bg-[#f74444] hover:bg-[#be3232] rounded-lg text-sm font-medium px-4 py-2.5 hover:text-[#D9D9D9]")
                | Cancelar*/