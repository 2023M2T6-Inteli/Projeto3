let page_loaded = 0;
let student_num = 1;

const classroom_list = document.getElementById('classroomsList');
const students_list = document.getElementById('studentsList');
const stdInput = document.getElementById('studentName');
const className = document.getElementById("classroomName");
const classSubject = document.getElementById("classroomSubject");
const classYear = document.getElementById("classroomYear");


classroom_list.addEventListener('change', function(){
    getClassroomsData(1, parseInt(classroom_list.value));
});


window.addEventListener('load', getClassroomsData(1, 0))


function getClassroomsData(user_id, class_id){

    let request = new XMLHttpRequest();
    request.open('GET', `classrooms/select?userId=${user_id}`, true);
    request.send();
  
    request.onreadystatechange = function() {
        if(request.readyState === 4 && request.status === 200){
            let requested_data = request.responseText;
            requested_data = JSON.parse(requested_data);
            getClass(requested_data, class_id);
        };
    }
};


function postStudentData(class_id = 1, name){
    let post = new XMLHttpRequest();
    post.open("POST", `classrooms/addStudent?stdName=${name}&classId=${class_id}`, true);
    post.send()

    post.onreadystatechange = function(){
        if(post.readyState === 4 && post.status === 201){
            stdInput.value = '';
            stdInput.placeholder = 'Aluno adicionado!';
            getClassroomsData(1, parseInt(classroom_list.value));
            setTimeout(function(){
                stdInput.placeholder = 'Novo aluno';
            }, 3000);
        };
    };
};


function postClassData(name, subject, year){
    let post = new XMLHttpRequest();
    post.open("POST", `classrooms/addClass?className=${name}&subject=${subject}&year=${year}`, true);
    post.send()

    post.onreadystatechange = function(){
        if(post.readyState === 4 && post.status === 201){
            alert('Turma adicionada!');
            classroom_list.value = 0;
            className.value = '';
            classSubject.value = '';
            classYear.value = '';
            getClassroomsData(1, 0);
        };
    };
};


function getClass(data, classroom_id){
    
    let data_arr = [[],[],[],[]];
    let class_ids = data_arr[0];
    let class_names = data_arr[1];
    let std_ids = data_arr[2];
    let std_names = data_arr[3];
    let std_index = 0;
    for(let i = 0; i < data.length; i++){
        if(i > 0 && data[i].class_id === data[i - 1].class_id){
            std_ids[std_index].push(data[i].std_id);
            std_names[std_index].push(data[i].std_name);
        }
        else if(i > 0 && data[i].class_id != data[i - 1].class_id){
            std_index++;
            class_ids.push(data[i].class_id);
            class_names.push(data[i].class_name);
            std_ids.push([data[i].std_id]);
            std_names.push([data[i].std_name]);
        }
        else{
            class_ids.push(data[i].class_id);
            class_names.push(data[i].class_name);
            std_ids.push([data[i].std_id]);
            std_names.push([data[i].std_name]);
        };
    };

    if(page_loaded != 0){
        destroyElems(students_list);
        destroyElems(classroom_list)
        createSelectElem(0, 'Turma', classroom_list)
    }
    else{
        page_loaded++
    };
    
    for(let i = 0; i < class_ids.length; i++){
        let class_id = class_ids[i];
        let class_name = class_names[i];
        createSelectElem(class_id, class_name, classroom_list);
    };
    std_index = data_arr[0].indexOf(classroom_id);
    classroom_list.value = classroom_id;

    student_num = 1;
    for(let i = 0; i < std_ids[std_index].length; i++){
        let std_id = std_ids[std_index][i];
        let std_name = std_names[std_index][i];
        createListElem(std_id, std_name, students_list);
    };
};


function destroyElems(list){
    while(list.hasChildNodes()){
        list.removeChild(list.firstChild);
    };
};


function createListElem(id, name, list){

    let li = document.createElement("li");
    if(name != null){
        li.innerHTML = `${student_num}. ${name}`
    }
    student_num++
    list.appendChild(li)
};


function createSelectElem(id, name, select){

    let option = document.createElement("option");
    option.value = id;
    option.innerHTML = `${name}`;

    select.appendChild(option);
};


const addStd = document.getElementById("addStudent");
addStd.addEventListener("click", addStudent);

let stdTime;

function addStudent(){
    if(stdTime){
        clearTimeout(stdTime)
    };

    if(stdInput.value.trim() != ''){
        postStudentData(classroom_list.value, stdInput.value.trim());
        stdInput.placeholder = '';
    }
    else{
        stdInput.placeholder = 'Insira um nome para adicionar';
        stdTime = setTimeout(() => {
            stdInput.placeholder = 'Novo aluno';
        }, 3500);
    };
};


const addClass = document.getElementById("addClass");
addClass.addEventListener("click", addClassroom);


function addClassroom(){

    className.value = className.value.trim();
    classSubject.value = classSubject.value.trim();
    classYear.value = classYear.value.trim();

    let name = className.value;
    let subject = classSubject.value;
    let year = classYear.value;

    if(name != '' && subject != '' && year != ''){
        postClassData(name, subject, year);
    }
    else{
        alert("Preencha todos os campos para adicionar uma turma!")
    };
};