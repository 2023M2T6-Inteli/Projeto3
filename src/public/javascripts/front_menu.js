//variable that tells the script when the page has already loaded graphs before
//so it doesn't try to load the most recent activity's graphs again
let pageLoaded = 0;

//executes once html has loaded
window.addEventListener("load", function(){
    //configuring some default chart values
    Chart.defaults.font.family = "Poppins";
    Chart.defaults.font.size = 14;
    Chart.defaults.color = '#7A7A7A';
    Chart.defaults.backgroundColor = '#7A7A7A';

    getClasstivitiesData();
});

//gets json data from the specified endpoint and returns it
function getData(route) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      request.open('GET', route, true);
      request.send();

      request.onreadystatechange = function() {
        if (request.readyState === 4) {
          if (request.status === 200) {
            let requested_data = request.responseText;
            requested_data = JSON.parse(requested_data);
            resolve(requested_data);
          } else {
            reject(new Error('Erro na solicitação. Status: ' + request.status));
          };
        };
      };
    });
  };

//gets the required json data to build the dropdown button's content
function getClasstivitiesData() {
    getData('menu/classtivities')
        .then(function(request) {
            buildClasstivitiesText(request);
        })
        .catch(function(error) {
            console.error(error);
        });
};


//filters the received json object, organizing it and using arrays to store the data
function buildClasstivitiesText(json){

    let text = [[],[],[],[],[]]
    let actv_ids = text[0];
    let actv_names = text[1];
    let dates = text[2];
    let class_ids = text[3];
    let class_names = text[4];

    //storing the data in specific arrays
    for(let i = 0; i < json.length; i++){
        actv_ids.push(json[i].actv_id);
        actv_names.push(json[i].actv_name);
        dates.push(json[i].created_at);
        class_ids.push(json[i].class_id);
        class_names.push(json[i].class_name);
    };

    dates = dates.map((date) => dateFormat(date));

    //creating elements for each activity applied in a classroom
    const classtvsList = document.getElementById('classtivitiesList');
    for(let i = 0; i < text[0].length; i++){
        let actv_id = actv_ids[i];
        let actv_name = actv_names[i];
        let class_id = class_ids[i];
        let class_name = class_names[i];
        createListElem(actv_id, actv_name, class_id, class_name, classtvsList);
    };
    //checks if the page has already been loaded
    if(pageLoaded === 0){
        const ids_dates = [actv_ids, dates, class_ids];
        getMostRecentActv(ids_dates);
        pageLoaded++;
    };
};


//creates the dropdown button's content based on the database's data
function createListElem(actv_id, actv_name, class_id, class_name, list){

    let li = document.createElement("li");
    let a = document.createElement("a");

    a.classList.add("block", "px-4", "py-2", "hover:bg-[#369398]");
    a.href = `javascript:getGraphData(${actv_id}, ${class_id});`;
    a.innerHTML = `${actv_name} - ${class_name}`;

    li.appendChild(a);
    list.appendChild(li);
};


//gets the most recent activity's data to generate its graphs when the page is loaded
function getMostRecentActv(dates){
    //creating Date objects in order to compare them and get the most recent
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


//gets the required json data to build the graphs' content
function getGraphData(actv_id, class_id){

    getData(`menu/graphs?actvId=${actv_id}&classId=${class_id}`)
        .then(function(request){
            let graphs_array = filterGraphData(request);
            buildGraphOne(graphs_array);
            buildGraphTwo(graphs_array);
        });
};


//rounds numbers that have more than two decimal places
function roundNums(num){

    if(num.toString().length > 2)
        return num.toFixed(2);
    else
        return num;
};

//defines which colors are used in the graphs based on the grades
function defineColors(grade){

    if(grade < 5){
        return 'rgb(247,68,68,1)'; //returning red for bad grades
    }
    else if(grade >= 5 && grade <= 7){
        return 'rgb(237,212,79,1)'; //returning yellow for median grades
    }
    else{
        return 'rgb(49,179,85,1)'; //returning green for good grades
    };
};

//destroys existing charts when the user decides to see another activity's data
function destroyChart(chart){
    const current_chart = Chart.getChart(chart);
    if(current_chart != undefined){
        current_chart.destroy();
    };
};

//formats date strings from the database so javascript can read them correctly
function dateFormat(date){
    if (date == null) date = ""
    return date.replace(' ', 'T');
};

//filters the received json object, organizing it and using arrays to storage the data
function filterGraphData(graph_data){
    let grades = [];
    let names = [];
    let sum_per_subject = [];
    let avg_denominator = [];
    let avg_index = 0;
    let subjects = [];

    //storing the data in specific arrays, filtering it and making some average calculations
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

    //creating the array which will be filled up with the filtered and organized data
    let avg_result = [subjects,[],[],names,grades]

    //calculating averages
    for(let sum = 0; sum <= sum_per_subject.length; sum++){
        avg_result[2].push(roundNums(sum_per_subject[sum] / avg_denominator[sum]));
    };

    //defining colors for each grade
    let colors = avg_result[1];
    for(let i = 0; i < avg_result[2].length; i++){
        let avg = avg_result[2][i];
        colors.push(defineColors(avg));
    };

    return avg_result;
};

//builds the first graph
function buildGraphOne(arr){
    //getting from the argument (filtered data) only the elements that will be used in the graph
    const subjects = arr[0];
    const colors = arr[1];
    const averages = arr[2];

    destroyChart("graphHabilities");

    //building the graph
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


//builds the second graph
function buildGraphTwo(arr){
    //getting from the argument (filtered data) only the elements that will be used in the graph
    const subjects = arr[0];
    const averages = arr[2];
    const names = arr[3];
    const grades = arr[4];

    //calculating the smallest average
    let min = averages[0];
    let min_index = 0;
    for(let i = 0; i < averages.length; i++){
        if(averages[i] < min){
            min = averages[i];
            min_index = i;
        };
    };

    //getting the grades that form the smallest average
    let worst_grades = grades[min_index];

    //assigning some colors to them
    let colors = []
    for(let i = 0; i < worst_grades.length; i++){
        let grade = worst_grades[i];
        colors.push(defineColors(grade));
    };

    destroyChart("graphWorst");

    //building the graph
    const canvasWorst = document.getElementById('graphWorst').getContext('2d');
    let graphWorst = new Chart(canvasWorst, {

        type: 'line',

        data: {
            labels: names,
            datasets: [{
                label: `Nota em ${subjects[min_index]}`,
                pointBackgroundColor: colors,
                borderColor: 'rgb(22, 175, 184, 1)',
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
const SUBJECT = 'EF01GE05'  // Assunto para pesquisar
const HITS = 5              // Número de hits a retornar (6 hits significam 6 conteúdos sugeridos)

/**
 * @param {string} Assunto para pesquisar
 * @param {number} Número de hits a retornar
 * 
 * @returns {array} - Array de hits
 *
 */
async function getContents(subject, hits) {
    // fetch na URL de busca do Algolia com query params
    const response = await fetch(`https://6I7NDWQ9YU-dsn.algolia.net/1/indexes/conteudo-pane-teste?query=${subject}&hitsPerPage=${hits}`, {
        method: 'GET',
        headers: {
            // Headers necessários para autenticação no Algolia
            'X-Algolia-Application-Id': '6I7NDWQ9YU',
            'X-Algolia-API-Key': '459b8ac86fdd4dc47c31095c2dd12e2f'
        }
    });
    // Transforma a resposta em JSON
    const json = await response.json();
    // Retorna o array de hits
    return json.hits;
}

// Chama a função getContents com os parâmetros SUBJECT e HITS
getContents(SUBJECT, HITS).then((contents) => {
    // Para cada elemento do array contents, imprime o título e a URL
    contents.forEach(element => {
        console.log(element.titulo);
        console.log(element.url);
    });
});