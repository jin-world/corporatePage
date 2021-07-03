var url = "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos";
var user = "193201174@N02";
var key = "9826483353a42d129a03d4cae76a3fb1";
var num = 20;

//데이터 호출
$.ajax({
    url: url,
    dataType: "json",
    data: {
        api_key: key,
        per_page: num,
        format: "json",
        nojsoncallback: 1,
        user_id: user
    }
})
.success(function(data){
    console.log(data.photos.photo);
    var imgs = data.photos.photo;

    $(imgs).each(function(index,data){
        var tit = data.title;
        var imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`;

        var imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;

        var tags = `
            <article>
            <div class="inner">
                <div class="pic" data-src=${imgSrcBig}>
                    <img src="${imgSrc}">
                </div>
                <h2>${tit}</h2>
            </div>
            </article>
        `;

        $("#gallery").append(tags);
    })
})
.error(function(err){
    console.log(err);
});


$("body").on("click", "#gallery article .pic", function(){
    var imgSrc = $(this).attr("data-src");

    var tags = `
        <aside id="imgPop">
            <div class="pic">
                <img src="${imgSrc}">
            </div>
            <span>CLOSE</span>
        </aside>
    `;

    $("body").append(tags);
});

$("body").on("click","#imgPop span",function(){
    $(this).parent("#imgPop").remove();
})