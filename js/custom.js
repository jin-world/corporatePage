const btnCall = document.querySelector(".btnCall"); 
const menuMo = document.querySelector(".menuMo"); 

btnCall.onclick = function(e){
    e.preventDefault(); 

    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on"); 
}

const url = "data/board.json";
const frame = $(".community .inner")

const resultData = callData(url);

