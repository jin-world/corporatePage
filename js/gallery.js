let url = "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos";
let url_search = "https://www.flickr.com/services/rest/?method=flickr.photos.search";
let user = "193201174@N02";
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

//flicker 데이터 호출 함수정의
function getFlickr(url, key, num, tags) {
    //최종 ajax옵션값이 담길 빈 객체 생성
    var result = {};

    //아이디 이미지 전용 옵션객체
    var opt_id = {
        api_key: key,
        per_page: num,
        format: "json",
        nojsoncallback: 1,
        user_id: user,
        tag_mode: "any",
        privacy_filter: 5
    }

    //키워드 검색 이미지 전용 옵션객체
    var opt_search = {
        api_key: key,
        per_page: num,
        format: "json",
        nojsoncallback: 1,
        tags : tags,
        tag_mode: "any",
        privacy_filter: 5
    }

    //만약에 4번째 인수는 검색 키워드를 넣지 않으면
    if(tags==undefined){
        //이미지 전용옵션을 result에 적용
        result = opt_id;
    
    //4번째 인수의 검색키워드를 넣으면
    }else {
        //키워드검색 전용옵션을 result에 적용
        result = opt_search;
    }

    $.ajax({
        url: url,
        dataType: "json",
        //ajax호출시 위에 적용된 result옵션을 최종적으로 적용해서 호출
        data: result
    })
    .success(function(data){
        console.log(data.photos.photo);
        var imgs = data.photos.photo;

        $("#gallery article").empty();
    
        $(imgs).each(function(index,data){
            var tit = data.title;
            if(!data.title) tit = "default text";
            
            var imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`;
    
            var imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;
    
            var tags = `
                <article>
                <div class="inner">
                    <div class="pic" data-src=${imgSrcBig}>
                        <img src="${imgSrc}">
                    </div>
                    <h2>${tit}</h2>
                    <p>${user}</p>
                </div>
                </article>
            `;
    
            $("#gallery").prepend(tags);
        })

        //isotope 플러그인 적용
        setTimeout(function(){
            iso = new Isotope("#gallery",{ 
                itemSelector : "article",
                columWidth : "article",
                transitionDuration : "1s",
                percentPosition : true
            });
            $("article").addClass("on")
        },500)
    })
    .error(function(err){
        console.log(err);
    })
};

