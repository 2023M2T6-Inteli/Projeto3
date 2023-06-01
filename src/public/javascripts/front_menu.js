let pageLoaded = 0;

window.addEventListener("load", function(){
    
    Chart.defaults.font.family = "Poppins";
    Chart.defaults.font.size = 14;
    Chart.defaults.color = '#7A7A7A';
    Chart.defaults.backgroundColor = '#7A7A7A';

    getClasstivitiesData();
});


function getClasstivitiesData(){

    let request = new XMLHttpRequest();
    request.open('GET', 'menu/classtivities', true);
    request.send();

    let requested_data
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            requested_data = request.responseText;
            requested_data = JSON.parse(requested_data);
            buildClasstivitiesText(requested_data);
        };
    };
};


function createListElem(actv_id, actv_name, class_id, class_name, list){

    let li = document.createElement("li");
    let a = document.createElement("a");

    a.classList.add("block", "px-4", "py-2", "hover:bg-[#369398]");
    a.href = `javascript:getGraphData(${actv_id}, ${class_id});`;
    a.innerHTML = `${actv_name} - ${class_name}`

    li.appendChild(a)
    list.appendChild(li)
};


function getMostRecentActv(dates){

    let max_date = new Date(dates[1][0]);
    let max_date_index = 0;

    for(let i = 0; i < dates[1].length; i++){
        let date = new Date(dates[1][i])
        if(date > max_date){
            max_date = date;
            max_date_index = i;
        };
    };
    getGraphData(dates[0][max_date_index], dates[2][max_date_index]);
};


function roundNums(num){

    if(num.toString().length > 2){
        return num.toFixed(2);
    }
    else{
        return num;
    };
};


function getGraphData(actv_id, class_id){

    let graphs = new XMLHttpRequest();
    graphs.open('GET', `menu/graphs?actvId=${actv_id}&classId=${class_id}`, true);
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
        };
    };
};


function defineColors(grade){

    if(grade < 5){
        return 'rgb(247,68,68,0.85)';
    }
    else if(grade >= 5 && grade <= 7){
        return 'rgb(237,212,79,0.85)';
    }
    else{
        return 'rgb(49,179,85,0.85)';
    };
};


function destroyChart(chart){
    const current_chart = Chart.getChart(chart);
    if(current_chart != undefined){
        current_chart.destroy();
    };
};


function dateFormat(date){
    return date.replace(' ', 'T');
};


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
            grades[avg_index].push(roundNums(grade * equalizer));
            avg_denominator[avg_index]++;
            if(avg_index === 0){
                names.push(name);
            };
        }
        else if(i > 0 && description != graph_data[i-1].description){
            avg_index++;
            sum_per_subject.push(grade * equalizer);
            grades.push([roundNums(grade * equalizer)]);
            avg_denominator.push(1);
            subjects.push(description);

        }
        else if(i === 0){
            sum_per_subject.push(grade * equalizer);
            grades.push([roundNums(grade * equalizer)]);
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
        avg_result[2].push(roundNums(sum_per_subject[sum] / avg_denominator[sum]));
    };

    let colors = avg_result[1];
    for(let i = 0; i < avg_result[2].length; i++){
        let avg = avg_result[2][i];
        colors.push(defineColors(avg));
    };

    return avg_result;
};


function buildGraphOne(arr){  

    const subjects = arr[0];
    const colors = arr[1];
    const averages = arr[2];

    destroyChart("graphHabilities");

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
                    min:0,
                    grid:{
                        color: '#7A7A7A'
                    }
                },
                x:{
                    grid:{
                        color: '#7A7A7A'
                    }
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
        colors.push(defineColors(grade));
    };

    destroyChart("graphWorst");

    const canvasWorst = document.getElementById('graphWorst').getContext('2d');
    let graphWorst = new Chart(canvasWorst, {

        type: 'line',
    
        data: {
            labels: names,
            datasets: [{
                label: `Nota em ${subjects[min_index]}`,
                pointBackgroundColor: colors,
                borderColor: 'rgb(22, 175, 184, 0.85)',
                data: worst_grades,
                pointRadius: 6,
                pointBorderWidth: 0,
                borderWidth: 6
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
                    min:0,
                    grid:{
                        color: '#7A7A7A'
                    }
                },
                x:{
                    grid:{
                        color: '#7A7A7A'
                    }
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


function buildClasstivitiesText(json){
    
    let text = [[],[],[],[],[]]
    let actv_ids = text[0];
    let actv_names = text[1];
    let dates = text[2];
    let class_ids = text[3];
    let class_names = text[4];

    for(let i = 0; i < json.length; i++){
        actv_ids.push(json[i].actv_id);
        actv_names.push(json[i].actv_name);
        dates.push(json[i].created_at);
        class_ids.push(json[i].class_id);
        class_names.push(json[i].class_name);
    };

    dates = dates.map((date) => dateFormat(date));

    const classtvsList = document.getElementById('classtivitiesList');

    for(let i = 0; i < text[0].length; i++){
        let actv_id = actv_ids[i];
        let actv_name = actv_names[i];
        let class_id = class_ids[i];
        let class_name = class_names[i];
        createListElem(actv_id, actv_name, class_id, class_name, classtvsList);
    };

    if(pageLoaded === 0){
        const ids_dates = [actv_ids, dates, class_ids];
        getMostRecentActv(ids_dates);
        pageLoaded++;
    };
};
