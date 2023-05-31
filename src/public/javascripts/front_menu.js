window.addEventListener("load", function(){

    let graphs = new XMLHttpRequest();
    graphs.open('GET', 'menu/graphs', true);
    graphs.send();

    let graphs_data;
    let graphs_array;
    graphs.onreadystatechange = function(){
        if(graphs.readyState === 4 && graphs.status === 200){
            graphs_data = graphs.responseText;
            graphs_data = JSON.parse(graphs_data);

            graphs_array = filterGraphData(graphs_data);
            buildGraphOne(graphs_array);
            buildGraphTwo(graphs_array);
        }
    };

    let request = new XMLHttpRequest();
    request.open('GET', 'menu/classrooms', true);
    request.send();

    let requested_data
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            requested_data = request.responseText;
            requested_data = JSON.parse(requested_data);
            buildDropClassText(requested_data);
        }
    };
});


function filterGraphData(graph_data){
    let grades = [];
    let names = [];
    let sum_per_subject = [];
    let avg_denominator = [];
    let avg_index = 0;
    let subjects = [];

    for(let i = 0; i < graph_data.length; i++){
        let equalizer = 10 / graph_data[i].max_grade_percent;
        let grade = graph_data[i].grade_percent;
        let description = graph_data[i].description;
        let name = graph_data[i].name;

        if(i > 0 && description === graph_data[i-1].description){
            sum_per_subject[avg_index] += grade * equalizer;
            avg_denominator[avg_index]++;
            grades[avg_index].push(grade * equalizer);
            if(avg_index === 0){
                names.push(name);
            };
        }
        else if(i > 0 && description != graph_data[i-1].description){
            avg_index++;
            sum_per_subject.push(grade * equalizer);
            avg_denominator.push(1);
            subjects.push(description);
            grades.push([grade * equalizer]);
        }
        else if(i === 0){
            sum_per_subject.push(grade * equalizer);
            grades.push([grade * equalizer]);
            names.push(name)
            avg_denominator.push(1);
            subjects.push(description);
        };
    };
    
    let avg_result = [[],[],[],names,grades]

    for(let subj = 0; subj < subjects.length; subj++){
        avg_result[0].push(subjects[subj]);
    };

    for(let sum = 0; sum <= sum_per_subject.length; sum++){
        avg_result[2].push(Math.round(sum_per_subject[sum] / avg_denominator[sum]));
    };

    for(let i = 0; i < avg_result[2].length; i++){
        let avg = avg_result[2][i];
        let colors = avg_result[1];
        if(avg < 5){
            colors.push('rgb(255,0,0,0.75)');
        }
        else if(avg >= 5 && avg < 8){
            colors.push('rgb(255,242,0,0.75)');
        }
        else{
            colors.push('rgb(22,185,174,0.75)')
        };
    };

    return avg_result;
};


function buildGraphOne(arr){

    const subjects = arr[0];
    const colors = arr[1];
    const averages = arr[2];

    const canvasHabilities = document.getElementById('graphHabilities').getContext('2d');
    let graphHabilities = new Chart(canvasHabilities, {

        type: 'bar',

        data: {
            labels: subjects,
            datasets: [{
                label:"Média da turma",
                backgroundColor: colors,
                data: averages
            }]
        },
        options:{
            responsive: true,
            maintainAspectRatio: false,
            layout:{
                padding:{
                    left:25,
                    right:25,
                    top:10,
                    bottom:10
                }
            },
            scales:{
                y:{
                    max:10,
                    min:0
                }
            },
            plugins:{
                legend:{
                    labels:{
                        boxWidth: 0
                    }
                }
            }
        }
    });
};


function buildGraphTwo(arr){
    
    const subjects = arr[0];
    const averages = arr[2];
    const names = arr[3];
    const grades = arr[4];

    let min = averages[0];
    let min_index = 0;

    for(let i = 0; i < averages.length; i++){
        if(averages[i] < min){
            min = averages[i];
            min_index = i;
        };
    };

    let worst_grades = grades[min_index];
    let colors = []

    for(let i = 0; i < worst_grades.length; i++){
        let grade = worst_grades[i];
        if(grade < 5){
            colors.push('rgb(255,0,0,0.75)');
        }
        else if(grade >= 5 && grade < 8){
            colors.push('rgb(255,242,0,0.75)');
        }
        else{
            colors.push('rgb(22,185,174,0.75)')
        };
    };

    const canvasWorst = document.getElementById('graphWorst').getContext('2d');
    let graphWorst = new Chart(canvasWorst, {

        type: 'line',
    
        data: {
            labels: names,
            datasets: [{
                label: `Nota em ${subjects[min_index]}`,
                pointBackgroundColor: colors,
                backgroundColor:colors,
                data: worst_grades
            }]
        },
        options:{
            responsive: true,
            maintainAspectRatio: false,
            layout:{
                padding:{
                    left:25,
                    right:25,
                    top:10,
                    bottom:10
                }
            },
            scales:{
                y:{
                    max:10,
                    min:0
                }
            },
            plugins:{
                legend:{
                    labels:{
                        boxWidth: 0
                    }
                }
            }       
        }
    });
};


function buildDropClassText(json){

    let text = [];

    for(let i = 0; i < json.length; i++){
        text.push(json[i].id);
        text.push(json[i].name);
    };

    const classroomsList = document.getElementById('classroomsList');
    for(let i = 0; i < text.length; i++){
        if(i % 2 === 0){
            let li = document.createElement("li");
            let a = document.createElement("a");

            a.classList.add("block", "px-4", "py-2", "hover:bg-[#369398]");
            a.href = `menu/graphs?id:${text[i]}`
            a.innerHTML = `${text[i+1]}`

            li.appendChild(a)
            classroomsList.appendChild(li)
        }
        else{
            continue;
        };
    };
};