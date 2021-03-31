document.addEventListener("DOMContentLoaded", init, false);
function init() {
  function message() {
    alert("Hello!");
  }
  message();
  const black = document.querySelector(".black");
  black.addEventListener("click", () => {
    console.log("Black clicked");
    black.style.backgroundColor = "green";
  });
  console.log(black);
  const red = document.querySelector(".red");
  red.addEventListener("click", () => {
    console.log("red clicked");
    red.style.backgroundColor = "green";
  });
  console.log(black);
}

console.log("App started");

// black.onclick = () => console.log("AAAA");
// red.addEventListener("click", () => console.log("red clicked"));
