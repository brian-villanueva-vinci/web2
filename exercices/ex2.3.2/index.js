const myDiv = document.querySelectorAll(".color-div")



myDiv.forEach((div) => {
    div.addEventListener("click", (e) => {
        if(div.style.height === "100" + 'px'){
            div.style.height = "50" + 'px';
            div.style.width = "50" + 'px';
            div.innerText = "";
          }else{
            div.style.height = "100" + 'px';
            div.style.width = "100" + 'px';
            div.innerText = `${window.getComputedStyle(e.target).backgroundColor}`;
          }
    });
});


