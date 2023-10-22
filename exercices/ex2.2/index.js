const body = document.querySelector("body");
const myCounter = document.querySelector("#counter");
const myOutput = document.querySelector("#output");

let counter = 0;

body.addEventListener("click", counterFunction);

function counterFunction() {
    counter +=1;
    myCounter.innerHTML = counter;
    if(counter >=5 && counter <=9 ){
        myOutput.innerHTML="Bravo, bel échauffement !";
    }
    if(counter > 10)
        myOutput.innerHTML ="Vous êtes passé maître en l'art du clic";
}
