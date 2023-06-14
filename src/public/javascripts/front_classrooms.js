//"has the page already loaded?" variable and number of students variable
let page_loaded = 0;
let student_num = 1;

//DOM elements
const classroom_list = document.getElementById('classroomsList');
const students_list = document.getElementById('studentsList');
const stdInput = document.getElementById('studentName');
const className = document.getElementById("classroomName");
const classSubject = document.getElementById("classroomSubject");
const classYear = document.getElementById("classroomYear");


//changing the page content when the user selects a classroom
classroom_list.addEventListener('change', function(){
    getClassroomsData(parseInt(classroom_list.value));
});

//executes once the page is loaded
window.addEventListener('load', getClassroomsData(1, 0))


//gets classrooms data via ajax
function getClassroomsData(class_id){

    let request = new XMLHttpRequest();
    request.open('GET', `classrooms/select`, true);
    request.send();
  
    request.onreadystatechange = function() {
        if(request.readyState === 4 && request.status === 200){
            let requested_data = request.responseText;
            requested_data = JSON.parse(requested_data);
            getClass(requested_data, class_id);
        };
    }
};


//posts data on the students related tables on the database
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


//posts data on the classrooms related tables on the database
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


//filters the data from the endpoint to render the page properly
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
        //destroying outdated elements
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
    
    //getting the students from the current selected class
    std_index = data_arr[0].indexOf(classroom_id);
    classroom_list.value = classroom_id;

    student_num = 1;
    for(let i = 0; i < std_ids[std_index].length; i++){
        let std_id = std_ids[std_index][i];
        let std_name = std_names[std_index][i];
        createListElem(std_id, std_name, students_list);
    };
};


//destroying elements to build new updated ones
function destroyElems(list){
    while(list.hasChildNodes()){
        list.removeChild(list.firstChild);
    };
};


//creating the students list
function createListElem(id, name, list){

    let li = document.createElement("li");
    li.classList.add("flex", "items-center");

    let p = document.createElement('p');
    if(name != null){
        p.innerHTML = `${student_num}. ${name}`
    }
    p.classList.add("w-fit", "pr-2")
    student_num++;

    let a = document.createElement('a');
    a.href = `javascript:removeStudent(${id});`;
    
    let svg = document.createElementNS("http://www.w3.org/2000/svg" ,'svg');
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.classList.add("h-5", "w-6");

    let path = document.createElementNS("http://www.w3.org/2000/svg" ,'path');
    path.setAttribute("fill", "#f74444");
    path.setAttribute("d", "M12 3c-4.963 0-9 4.038-9 9s4.037 9 9 9s9-4.038 9-9s-4.037-9-9-9zm0 16c-3.859 0-7-3.14-7-7s3.141-7 7-7s7 3.14 7 7s-3.141 7-7 7zm.707-7l2.646-2.646a.502.502 0 0 0 0-.707a.502.502 0 0 0-.707 0L12 11.293L9.354 8.646a.5.5 0 0 0-.707.707L11.293 12l-2.646 2.646a.5.5 0 0 0 .707.708L12 12.707l2.646 2.646a.5.5 0 1 0 .708-.706L12.707 12z");

    svg.appendChild(path);
    a.appendChild(svg);
    li.appendChild(p);
    li.appendChild(a);
    list.appendChild(li);
};


//creating the select options
function createSelectElem(id, name, select){

    let option = document.createElement("option");
    option.value = id;
    option.innerHTML = `${name}`;

    select.appendChild(option);
};


//button used to add a new student to a classroom
const addStd = document.getElementById("addStudent");
addStd.addEventListener("click", addStudent);

//variable to store the timeout id so it is cancelled once the button is pressed
let stdTime;

//executes once the button is pressed
function addStudent(){
    if(stdTime){
        //cleaning existing timers
        clearTimeout(stdTime)
    };

    if(stdInput.value.trim() != ''){
        //posting to the database only if the field is filled up
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


//button used to create a new classroom
const addClass = document.getElementById("addClass");
addClass.addEventListener("click", addClassroom);

//executes once the button is pressed
function addClassroom(){

    className.value = className.value.trim();
    classSubject.value = classSubject.value.trim();
    classYear.value = classYear.value.trim();

    let name = className.value;
    let subject = classSubject.value;
    let year = classYear.value;

    if(name != '' && subject != '' && year != ''){
        //posting to the database only if all the fields are filled up
        postClassData(name, subject, year);
    }
    else{
        alert("Preencha todos os campos para adicionar uma turma!")
    };
};


//removes students from classrooms if the user clicks on the red "X"
function removeStudent(id){
    let request = new XMLHttpRequest();
    request.open('DELETE', `classrooms/delete?stdId=${id}`, true);
    request.send();
  
    request.onreadystatechange = function() {
        if(request.readyState === 4 && request.status === 200){
            getClassroomsData(1, parseInt(classroom_list.value));
        };
    }
};