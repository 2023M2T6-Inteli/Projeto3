window.addEventListener("load", getClassroomsData(1))

function getClassroomsData(id){

    let request = new XMLHttpRequest();
    request.open('GET', `classrooms/select?userId=${id}`, true);
    request.send();
  
    request.onreadystatechange = function() {
        if(request.readyState === 4 && request.status === 200){
            let requested_data = request.responseText;
            requested_data = JSON.parse(requested_data);
            getClass(requested_data);
        };
    }
};

function getClass(data){
    console.log(data);
}