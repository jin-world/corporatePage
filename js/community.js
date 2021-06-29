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
                                $("<a>").attr("href","#").text(data[i].제목)
                            ),
                        $("<td>").text(data[i].작성자),
                        $("<td>").text(data[i].작성일)
                    )
            )
    }
}