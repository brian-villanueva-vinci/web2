const buttonHTML = document.querySelector("#clickButton");
const messageHTML = document.querySelector("#message")

let timeoutID;
const delayInSeconds = 5;
const delayInMilliseconds = delayInSeconds * 1000;
let counterClick = 10;
let beginTime;
let finishTime;
let totalTime;

buttonHTML.addEventListener("mouseover",timerFunction);
buttonHTML.addEventListener("click", clickFunction)

function timerFunction(){
    beginTime = new Date().getTime();
    timeoutID = setTimeout(stopClick,delayInMilliseconds);
}

function stopClick() {
    if(counterClick === 0){
        totalTime = finishTime - beginTime;
        messageHTML.innerText = "You win ! You clicked 10 times within "+ totalTime.toString() +" ms";
        clearTimeout(timeoutID);
    }else{
        messageHTML.innerText = "Game over, you did not click 10 times within 5s !"
    }

}

function clickFunction(){
    counterClick -=1;
    if(counterClick ===0){
        finishTime = new Date().getTime();
        clearTimeout(timeoutID)
        stopClick();
    }
}



