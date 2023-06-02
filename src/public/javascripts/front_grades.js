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