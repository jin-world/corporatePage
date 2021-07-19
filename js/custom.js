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


//메인 슬라이더
const swiper = new Swiper("#Section01", {
    effect: "coverflow",
    loop: true,
    direction:'horizontal',
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50, //슬라이드 회전각
      stretch: -100, //슬라이더간 거리
      depth: 180, //깊이 효과값
      modifier: 1, //효과 배수
      slideShadows: false, //슬라이더 그림자
    },
    // slidesPerView: 4,
    
    pagination: {
      el: ".swiper-pagination",
      type:'fraction'
      // clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  
  