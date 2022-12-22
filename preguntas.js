async function getQuestions() {
    let resultado = await fetch("https://opentdb.com/api.php?amount=10");
    let dataBase = await resultado.json();
    const preguntas = dataBase.results;

    return preguntas;
}

async function init(){
    let pregunta = await getQuestions()
    let num = 0
    nextQuestion(pregunta[num],num)
    num = 1
    console.log(pregunta);
    document.querySelector('#btn').addEventListener('click',()=> {
        nextQuestion(pregunta[num],num)
        num++
    })
}

init()
async function nextQuestion(pregunta,num) {
    
    let espacio = document.querySelector('#espacioPregunta')
    let opciones = document.querySelector('#opciones')
    //console.log(num);

    if(num < 10){
    
   espacio.innerHTML = `<div>
   <legend id='legend${num}'>${pregunta.question}</legend>
   </div>` 

    let arrMezcla = []
    correcta = [pregunta.correct_answer]
    incorrectas = pregunta.incorrect_answers
    arrMezcla = correcta.concat(incorrectas)
  
    mezclarArray(arrMezcla)
    //console.log(arrMezcla);
    
    let imprimir2 = ''
    
    for (let j = 0; j < arrMezcla.length; j++) {
        imprimir2 +=`<div>
        <label for="radio${j}">${arrMezcla[j]}</label>
        <input type="radio" id="radio${num+j}" name="${num}" value="${arrMezcla[j]}"> 
        </div>` 

    }

    opciones.innerHTML = imprimir2

    validar(pregunta,num)  
  }else{
    window.open("./results.html"); 
  }
}

let puntuacion = 0

function validar(pregunta,num) {
    
        document.querySelector('#espacioTotal').addEventListener('change', function (event) {
        
        event.preventDefault()
        console.log(event.target.value);
        let counter = 0
        
        console.log("Estoy por "+num);
        let selected = event.target.value;
        
        if (!selected) {
            alert('Selecciona una opción')
            
        }else if (selected == pregunta.correct_answer) {
            counter++ 
            puntuacion =  puntuacion + counter
            localStorage.setItem('puntuacion',puntuacion)
        }
        console.log(counter, '1');
        console.log(puntuacion, 'puntuacion');
    }) 
    return puntuacion  
} 

function mezclarArray(arr) {
    
    for (let i = arr.length - 1; i >= 0; i--) {
          const s = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[s]] = [arr[s], arr[i]];
          
        }
      }


  let puntuacionTotal = localStorage.getItem('puntuacion')
  document.getElementById('datosguardados').innerHTML =`<div>${puntuacionTotal}/10</div>`;


//GRÁFICA
 /*  async function getRecords() {
        let results = await fetch("https://swapi.dev/api/people/");
        let charactersData = await results.json();
        const charactersList = charactersData.results;
        let arrNames = charactersList.map(element => element = element.name);
        let arrNumFilms = charactersList.map(element => element.films.length);
        
        new Chartist.Bar('#puntuaciones', {
          labels: arrNames,
          series: [arrNumFilms]
        }, {
          width: 250,
          height: 350,
          horizontalBars: true,
          axisY: {
            onlyInteger: true,
            labelInterpolationFnc: function(value) {
              return (value) + '';
            }
          }
        }).on('draw', function(data) {
          if(data.type === 'bar') {
            data.element.attr({
              style: 'stroke-width: 10px'
            });
          }
        });
      }
      getRecords()
 
   */ 