//로딩완료시 유튜브 데이터 호출
$.ajax({
    url:"https://www.googleapis.com/youtube/v3/playlistItems",
    dataType:"jsonp", 
    data:{
        part:"snippet", 
        key:"AIzaSyCIOLOSoIBpxFer_M-SmkVr3F0gwnyhnO4", //api키값 
        maxResults : 9, //호출 갯수 
        playlistId: "PLg1VhWIXYL_lPOvXi-I2So7fZ0CymaqHf" // 플레이리스트 아이디 
    }
})
.success(function(data){
    console.log(data.items);
    var items = data.items;
    //반복해서 만들 DOM문자열이 저장될 빈 문자열 전역변수 생성
    var result = "";

    //데이터의 갯수만큼 반복
    $(items).each(function(index, data){
        console.log(data);

        var title = data.snippet.title;
        if(title.length > 30) {
            title = title.substr(0,30)+"...";
        }

        //빈 문자열에 계속해서 아래 문자코드를 중첩해서 더함
        result += `
            <article>
            <a href=${data.snippet.resourceId.videoId} class="pic">
                <img src=${data.snippet.thumbnails.standard.url}>
            </a>
            <div class="con">
                <h2>${title}</h2>
            </div>
            </article>
        `;
    });

    //반복되며 중첩된 DOM생성 문자결과값을 .vidList에 삽입해서 DOm생성
    $(".vidList").append(result);
})
.error(function(err){
    console.error(err);
});


$("body").on("click",".vidList article",function(e){
    e.preventDefault();
    var vidSrc = $(this).find(".pic").attr("href");
    $(".vidPop").fadeIn();
    $(".vidPop .inner").append(
        $("<iframe>").attr({
            src: "https://www.youtube.com/embed/"+vidSrc,
            frameborder: 0,
            allowfullscreen: false,
            width: "90%",
            height: "90%"
        })
    );
});

$("body").on("click", ".vidPop span", function(){
    $(this).parent().fadeOut(400, function(){
        $(this).find("iframe").remove();
    });
})