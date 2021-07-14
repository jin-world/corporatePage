const url = "data/board.json";
const frame = $(".community .inner");
const resultData = callData(url);

//동적으로 테이블 생성 호출
createTable(frame, resultData);

//json데이터로부터 게시글 내용을 배열로 반환해주는 함수정의
function callData(url) {
    let result;

    $.ajax({
        url: url,
        dataType: "json",
        async: false
    })
    .success((data)=>{
        result = data.board;
        console.log(result);
    })
    .error((err)=>{
        console.log(err);
    });

    return result;
}

//동적 테이블 생성
function createTable(target, data) {
    target.append(
        $("<table>")
            .attr("summary","자유게시판의 글번호, 제목, 작성자")
            .append(
                $("<caption class='hidden'>").text("자유게시판"),
                $("<thead>")
                    .append(
                        $("<tr>")
                            .append('<th scope="col">No</th>')
                    ),
                "<tbody>"
            )
    );

    target.append(
        $("<div class='pagination'>")
            .append(
                $("<a class='prev'>").attr("href","#").text("<"),
                $("<p class='numbers'>")
                .append(
                    $("<a>").attr("href","#").text("1"),
                    $("<a>").attr("href","#").text("2"),
                    $("<a>").attr("href","#").text("3"),
                    $("<a>").attr("href","#").text("4"),
                    $("<a>").attr("href","#").text("5"),
                    $("<a>").attr("href","#").text("6"),
                    $("<a>").attr("href","#").text("7"),
                    $("<a>").attr("href","#").text("8"),
                    $("<a>").attr("href","#").text("9"),
                    $("<a>").attr("href","#").text("10"),
                ),
                $("<a class='next'>").attr("href","#").text(">")
            )
    );

    for(let key in data[0]) {
        console.log(key);
        target.find("thead tr")
            .append(
                $("<th scope='col'>").text(key)
            )
    }

    for(let i=0; i<data.length; i++) {
        target.find("tbody")
            .prepend(
                $("<tr>")
                    .append(
                        $("<td>").text(i+1),
                        $("<td>")
                            .append(
                                $("<a>").attr("href","#").text(data[i].Title)
                            ),
                        $("<td>").text(data[i].Writer),
                        $("<td>").text(data[i].Date)
                    ),
            )
    }
}

/* FAQ ------------------------------------------------------------------- */
//DOM Caching
var $frame = $(".faq");
var $btns = $frame.find("dt");
var $boxs = $frame.find("dd");
var speed = 500;
var enableClick = true;

//dt를 클릭했을 때
$btns.on("click",function(e){
    //기본클릭금지
    e.preventDefault();
    
    //만약 enableClick이 참이라면
    if(enableClick) {
        //enableClick을 false로 바꾸고 모션중 재클릭금지 처리
        enableClick = false;
        //activation 함수 호출
        activation(this);
    }
});

//activation 함수 정의
function activation(self) {
    //클릭한 dt에 on이 있는지 판별하여 isOn에 담기
    //this는 이벤트구문과 함수안에서 뜻하는 바가 다르기때문에 this를 self로 바꿔서 파라미터로 연결
    var isOn = $(self).hasClass("on");
    
    //모든 dt에 on을 제거
    $btns.removeClass("on");
    //모든 dd를 안보이게 slideUp 처리
    $boxs.slideUp(speed);
    
    //isOn이 참이라면
    if(isOn) { //이미 클릭해서 on이 있는 상태라면
        //클릭한 dt에 on제거
        $(self).removeClass("on");
        //클릭한 dt의 다음에 있는 dd를 안보이게 처리
        $(self).next().slideUp(speed,function(){
             //모션이 끝나면 enableClick을 true로 처리
            enableClick = true;
        });
    }else { //on이 없다면
        //클릭한 dt에 on 활성화
        $(self).addClass("on");
        //클릭한 dt의 다음 dd를 보이게 처리
        $(self).next().slideDown(speed,function(){
            //모션이 끝나면 enableClick에 true처리
            enableClick = true;
        });
    }
}