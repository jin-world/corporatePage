let url = "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos";
// let url_user = "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos";
let url_search = "https://www.flickr.com/services/rest/?method=flickr.photos.search";
let user = "193201174@N02";
let key = "9826483353a42d129a03d4cae76a3fb1";
// let num = 20;

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
            user_id: user
        }
    })
    .success(function(data){
        console.log(data.photos.photo);
        var imgs = data.photos.photo;
    
        $(imgs).each(function(index,data){
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
                    <p>${user}</p>
                </div>
                </article>
            `;
    
            $("#gallery").append(tags);
        })
    })
    .error(function(err){
        console.log(err);
    });
}