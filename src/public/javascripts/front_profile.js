//executes once the page is loaded
window.addEventListener('load', getData);


//gets user's register informations
function getData(){
    let request = new XMLHttpRequest;
    request.open('GET', 'profile/getData', true);
    request.send();
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            let requestData = request.responseText;
            requestData = JSON.parse(requestData);
            buildForm(requestData);
        };
    };
};


//fills the form fields with the user's info
function buildForm(data){
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const userEmail = document.getElementById("email");

    firstName.value = data[0].first_name;
    lastName.value = data[0].last_name;
    userEmail.value = data[0].email;
};

