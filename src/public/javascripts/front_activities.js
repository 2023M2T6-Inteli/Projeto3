async function activities(){
    const response = await fetch('/activities/api');
    const data = await response.json();
    return data;
}

let activitiesSelect = document.getElementById("activities_select");

activities().then(data => {
    data.forEach(activity => {
        let option = document.createElement("option");
        option.value = activity.id;
        option.text = activity.name;
        activitiesSelect.appendChild(option);
    });
});
