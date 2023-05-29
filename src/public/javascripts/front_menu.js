window.addEventListener("load", function(){
    const canvasHabilities = document.getElementById('graphHabilities').getContext('2d');
    const canvasWorst = document.getElementById('graphWorst').getContext('2d');

    let graphHabilities = new Chart(canvasHabilities, {

        type: 'bar',

        data: {
            labels: ['Divisão', 'Fatoração', 'Radiciação', 'Potencialização', 'Multiplicação', 'Subtração', 'Soma'],
            datasets: [{
                label: 'Média da turma',
                backgroundColor: 'rgb(255,0,0,0.75)',
                data: [3, 4, 4, 5, 6, 7, 9, 10]
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
            }
        }

        });
    let graphWorst = new Chart(canvasWorst, {

        type: 'bar',
    
        data: {
            labels: ['Maria', 'Otávio', 'Sérgio', 'Eduarda', 'Jéssica', 'Marcelo', 'Teresa'],
            datasets: [{
                label: 'Nota em Divisão',
                backgroundColor: ['rgb(255,0,0,0.75)', 'rgb(255,0,0,0.75)', 'rgb(255,0,0,0.75)', 'rgb(255,0,0,0.75)', 'rgb(255,242,0,0.75)', 'rgb(255,242,0,0.75)', 'rgb(0,255,0,0.75)'],
                data: [0, 0, 1, 3, 5, 5, 7, 10]
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
            }
        }
    
    });
});