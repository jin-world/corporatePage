const btnCall = document.querySelector(".btnCall"); 
const menuMo = document.querySelector(".menuMo"); 
var $gnb_li = $("#gnb>li");

btnCall.onclick = function(e){
  e.preventDefault(); 

  btnCall.classList.toggle("on");
  menuMo.classList.toggle("on"); 
}


// GNB menu ------------------------------------------------------------------------------------------
//마우스 호버시 2depth 활성화
$gnb_li.on("mouseenter", function(){
  $(this).find(".sub").show();
});

$gnb_li.on("mouseleave", function(){
  $(this).find(".sub").hide();
});


//포커시 이동시 2depth활성화
$gnb_li.each(function(index){
  $gnb_li.eq(index).find("a").first().on("focusin", function(){
      $gnb_li.eq(index).find(".sub").show();
  });

  $gnb_li.eq(index).find("a").last().on("focusout", function(){
      $gnb_li.eq(index).find(".sub").hide();
  });
})