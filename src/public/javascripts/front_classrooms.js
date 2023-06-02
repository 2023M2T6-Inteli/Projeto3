let page_loaded = 0;
let student_num = 1;
const classroom_list = document.getElementById('classroomsList');
const students_list = document.getElementById('studentsList');

classroom_list.addEventListener('change', function(){
    getClassroomsData(1, parseInt(classroom_list.value));
});

window.addEventListener("load", getClassroomsData())


function getClassroomsData(user_id = 1, class_id = 1){
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
    }
    else{
        for(let i = 0; i < class_ids.length; i++){
            let class_id = class_ids[i];
            let class_name = class_names[i];
            createSelectElem(class_id, class_name, classroom_list);
        };
        page_loaded++
    };
    std_index = data_arr[0].indexOf(classroom_id);

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
    li.innerHTML = `${student_num}. ${name}`
    student_num++
    list.appendChild(li)
};


function createSelectElem(id, name, select){

    let option = document.createElement("option");
    option.value = id;
    option.innerHTML = `${name}`;

    select.appendChild(option);
};

