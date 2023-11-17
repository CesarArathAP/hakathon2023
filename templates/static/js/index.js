// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
const frasesMotivacionales = [
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "Trabaja duro en silencio; deja que tu éxito haga ruido.",
    "La única manera de hacer un gran trabajo es amar lo que haces.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito.",
    "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    "No te preocupes por los fracasos, preocúpate por las posibilidades que pierdes cuando ni siquiera lo intentas.",
    "La motivación nos impulsa a comenzar y el hábito nos permite continuar.",
    "No importa cuántas veces te caigas, lo importante es cuántas veces te levantes.",
    "El secreto de avanzar es comenzar.",
    "Tu trabajo va a llenar gran parte de tu vida, la única manera de estar realmente satisfecho es hacer lo que crees es un gran trabajo.",
    "El éxito no es para los que piensan en él, sino para aquellos que lo hacen.",
    "Si buscas resultados diferentes, no hagas siempre lo mismo.",
    "Nunca es tarde para ser lo que podrías haber sido.",
    "Haz hoy lo que otros no quieren, haz mañana lo que otros no pueden.",
    "El éxito es ir de fracaso en fracaso sin perder el entusiasmo.",
    "Si no te gusta algo, cámbialo. Si no puedes cambiarlo, cambia tu actitud.",
    "El que no avanza, retrocede.",
    "La disciplina es el puente entre metas y logros.",
    "Cree en ti mismo y todo será posible.",
    "El éxito no se trata de la posición que alcanzas, sino de la dirección en la que te estás moviendo.",
    "La excelencia no es un acto, sino un hábito.",
    "La suerte es lo que sucede cuando la preparación se encuentra con la oportunidad.",
    "No te detengas cuando estés cansado, detente cuando hayas terminado.",
    "La perseverancia no es una carrera larga; son muchos sprints cortos, uno después del otro.",
    "La única forma de hacer un gran trabajo es amar lo que haces.",
    "No importa lo lento que vayas, siempre y cuando no te detengas.",
    "Nuestro mayor miedo no es que seamos inadecuados. Nuestro mayor miedo es que somos poderosos más allá de toda medida.",
    "El éxito es la mejor venganza.",
    "Haz hoy lo que otros no quieren, haz mañana lo que otros no pueden.",
    "El único límite para nuestros logros de mañana son nuestras dudas de hoy.",
    "Si lo puedes soñar, lo puedes lograr."
    ];
// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/MjOrslCYh/";

let model, labelContainer, maxPredictions;
var webcam;


// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    const start=document.getElementById('start');
    const reset=document.getElementById('btn');

    start.style.display='none'
    reset.style.display='block'
    reset.addEventListener('click',()=>{
        location.reload();

    })


    // load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video, or canvas html element
    const prediction = await model.predict(webcam.canvas);

    // Encuentra el índice de la clase con la probabilidad más alta
    const maxIndex = prediction.reduce((maxIndex, element, currentIndex, array) => element.probability > array[maxIndex].probability ? currentIndex : maxIndex, 0);

    // Obtiene el nombre de la clase y la probabilidad de la clase predicha
    const className = prediction[maxIndex].className;
    const probability = prediction[maxIndex].probability.toFixed(2);

    // Update the label container
    labelContainer.childNodes[maxIndex].innerHTML = `${className}: ${probability}`;

    const estado = document.getElementById('estado');
    // Check if the predicted class is "enojado" and show an alert
    if (className.toLowerCase() === "enojado" && parseFloat(probability)>0.99) {
        estado.textContent = "¿Todo bien?";
        swal("Hemos notado que estas un poco molesto", "¿Que deceas hacer?", "success", {
            buttons: {
              cancel: "Cancelar",
              catch: {
                text: "Frase motivacional",
                value: "catch",
              },
              defeat: "Tips",
            },
          })
          .then((value) => {
            switch (value) {
           
              case "defeat":
                location.href='aromaterapia.html'
                break;
           
              case "catch":
                const indice = Math.floor(Math.random() * frasesMotivacionales.length);
                const frase = frasesMotivacionales[indice];
                swal(frase);
                break;
           
              default:
                window.location.reload();
            }
          });

    } else {
        estado.textContent = "Sigue así";

    }

}


//
//swal({
   // text: "¿Que deseas hacer?",
   // icon: "warning",
   // title: "Hemos notado que estas de mal humor",
   // buttons:['salir',true],
   // dangerMode: true,
  //})
  //.then((willDelete) => {
    //if (willDelete) {
  //location.href='prueba.html'
  //se {
  //    const indice = Math.floor(Math.random() * frasesMotivacionales.length);
  //    const frase = frasesMotivacionales[indice];
  //al(frase);
  //
  //
