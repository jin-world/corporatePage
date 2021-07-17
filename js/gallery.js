//일정기간동안 가장 인기있는 사진을 불러오는 메소드
let url = "https://www.flickr.com/services/rest/?method=flickr.interestingness.getList";
//검색한 텍스트를 태그로 가지고 있는 사진 검색하는 메소드
var url_search = "https://www.flickr.com/services/rest/?method=flickr.photos.search";
// let user = "193201174@N02";
let key = "9826483353a42d129a03d4cae76a3fb1";

getFlickr(url, key, 20);

//검색버튼
$(".search button").on("click",function(){
    var tags = $(this).prev().val(); 

    getFlickr(url_search, key, 20, tags);
});

//팝업호출
$("body").on("click", "#gallery article .pic", function(e){
    e.preventDefault();

    var imgSrc = $(this).attr("data-src");
    createPop(imgSrc);
});

//팝업닫기
$("body").on("click", "#imgPop span", function(e){
    e.preventDefault();
    removePop();
});

//검색 버튼 클릭시
$(".search button").on("click",function(){
    //버튼의 앞에 있는 input 태그의 value값을 변수에 담음
    var tags = $(this).prev().val();

    getFlickr(url_search, key, 40, tags);
});

//팝업생성 함수정의
function createPop(imgSrc) {
    $("body")
        .append(
            $("<aside id='imgPop'>")
                .append(
                    $("<div class='pic'>")
                        .append(
                            $("<img>").attr({src : imgSrc}),
                            $("<span>").text("close")
                        )
                )
        );
    $("#imgPop").fadeIn();
}

//팝업생성제거 함수정의
function removePop() {
    $("#imgPop").fadeOut(500,function(){
        $(this).remove();
    })
}

//데이터 호출 함수정의
function getFlickr(url, key, num, tags) {
    $.ajax({
        url: url,
        dataType: "json",
        data: {
            api_key: key,
            per_page: num,
            format: "json",
            nojsoncallback: 1,
            tags: tags,
            // user_id: user
        }
    })
    .success(function(data){
        console.log(data.photos.photo);
        var imgs = data.photos.photo;
    
        $(imgs).each(function(index,data){
            //만약 title(사진설명글)이 없을경우 대체 텍스트 처리
            var text = this.title;
            if(!this.title) text = "default text";

            var tit = data.title;
            var user_ID = data.user;
            var imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`;
    
            var imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;
    
            var tags = `
                <article>
                <div class="inner">
                    <div class="pic" data-src=${imgSrcBig}>
                        <img src="${imgSrc}">
                    </div>
                    <h2>${tit}</h2>
                    <p>${text}</p>
                </div>
                </article>
            `;
    
            $("#gallery").prepend(tags);
        })
    })
    .error(function(err){
        console.log(err);
    });
}

