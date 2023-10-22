const divs = document.querySelector("#div")
const text = document.querySelector("#text")

const onSubmit = (e) => {
  console.log("onSubmit::");
  e.preventDefault();
  divs.innerText = text.value;
  text.style.display="none"
};



form.addEventListener("submit",onSubmit) 
