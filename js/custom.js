const btnCall = document.querySelector(".btnCall"); 
const menuMo = document.querySelector(".menuMo"); 

btnCall.onclick = function(e){
    e.preventDefault(); 

    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on"); 
}


/* GNB메뉴 ------------------------------------------------------------ */
var $gnb_li = $("#gnb>li");


//마우스 호버시 2depth 활성화
$gnb_li.on("mouseenter", function(){
    $(this).find(".sub").show();
});

$gnb_li.on("mouseleave", function(){
    $(this).find(".sub").hide();
});


//포커시 이동시 2depth활성화
$gnb_li.each(function(index){
    //1depth li에서 첫번째 a요소에 focusin이벤트 연결
    $gnb_li.eq(index).find("a").first().on("focusin", function(){
        $gnb_li.eq(index).find(".sub").show();
    });

    //1depth li에서 마지막 a요소에 focusout이벤트 연결
    $gnb_li.eq(index).find("a").last().on("focusout", function(){
        $gnb_li.eq(index).find(".sub").hide();
    });
})