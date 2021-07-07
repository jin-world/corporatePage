$("input[type=submit").on("click",function(e){
    var total = 0;

    //userid에 값이 없거나 아이디 글자수가 5글자 이하일때 경고문구 출력
    var id_val = $("input[name=userid]").val();
    var id_len = id_val.length;

    if(id_val== "" || id_len <5){
        $("input[name=userid]").addClass("error");
        $("input[name=userid]").siblings("p").addClass("error");
    }else{
        $("input[name=userid]").removeClass("error");
        $("input[name=userid]").siblings("p").removeClass("error");
        total++;
    }  
    
    //pwd1값와 pwd2값이 다르면 경고문구
    //pwd1에 특수문자, 숫자, 문자포함, 갯수 5글자 이상
    var pwd1 = $("input[name=pwd1]").val();
    var pwd2 = $("input[name=pwd2]").val();
    var spc = /[!@#$%^&*()_+\[\]-]/;
    var num = /[0-9]/;
    var eng = /[a-zA-Z]/;
    var i = 0;

    //비번둘중에 하나라도 값을 입력하지 않으면 경고문 출력하고 테두리 활성화
    if(pwd1=="" || pwd2==""){
        $("input[type=password]").addClass("error");
        $("input[name=pwd1]").siblings("p").eq(0).addClass("error"); 
    }else{
        //값을 입력하면 첫번째 경고문 지우고 i값 1증가
        $("input[name=pwd1]").siblings("p").eq(0).removeClass("error");
        i++;

        //두개의 비번이 같을떄 해당 경고문 숨김 i값 1증가
        if(pwd1 == pwd2){    
            $("input[name=pwd1]").siblings("p").eq(1).removeClass("error"); 
            i++;

            //5글자이상일떄 해당 경고문 숨기고 i값 1증가
            if(pwd1.length >5){                  
                $("input[name=pwd1]").siblings("p").eq(2).removeClass("error"); 
                i++;
            }else{   
                $("input[type=password]").addClass("error");
                $("input[name=pwd1]").siblings("p").eq(2).addClass("error");
            }

            //숫자 포함시일때 해당 경고문 숨기고 i값 1증가
            if(num.test(pwd1)){   
                i++;
                $("input[name=pwd1]").siblings("p").eq(3).removeClass("error");
            }else{  
                $("input[type=password]").addClass("error");
                $("input[name=pwd1]").siblings("p").eq(3).addClass("error");
            }

            //특수문자 포함시 해당 경고문 숨기고 i값 1증가
            if(spc.test(pwd1)){  
                i++;
                $("input[name=pwd1]").siblings("p").eq(4).removeClass("error");
            }else{       
                $("input[type=password]").addClass("error");
                $("input[name=pwd1]").siblings("p").eq(4).addClass("error");
            }

            //문자 포함시 해당 경고문 숨기고 i값 1증가
            if(eng.test(pwd1)){ 
                i++;
                $("input[name=pwd1]").siblings("p").eq(5).removeClass("error");
            }else{       
                $("input[type=password]").addClass("error");
                $("input[name=pwd1]").siblings("p").eq(5).addClass("error");
            }

        }else{
            $("input[type=password]").addClass("error");
            $("input[name=pwd1]").siblings("p").eq(1).addClass("error");
        }

        //만약 i값이 6이면 (비번의 모든 조건의 충족되면)
        //인풋요소의 테두리 다시 비활성화 인증완료
        if(i==6){           
             $("input[type=password]").removeClass("error"); 
             total++;           
        }
    }


    //라디오버튼 미체크시 경고문 출력
    var isCheck = $("input[name=gender]").is(":checked");

    if(!isCheck) {
        $("input[name=gender]").siblings("p").addClass("error");
    }else {
        $("input[name=gender]").siblings("p").removeClass("error");
        total++;
    }


    //체크버튼 미체크시 경고문 출력
    var isCheck = $("input[name=hobby]").is(":checked");

    if(!isCheck) {
        $("input[name=hobby]").siblings("p").addClass("error");
    }else {
        $("input[name=hobby]").siblings("p").removeClass("error");
        total++;
    }


    //이메일 아이디 미 입력시 경고문 출력
    var isMail = $("input[name=email1]").val();

    if(isMail == "") {
        $("input[name=email1]").siblings("p").eq(0).addClass("error");
        $("input[name=email1").addClass("error");
    }else {
        $("input[name=email1]").siblings("p").eq(0).removeClass("error");
        $("input[name=email1").removeClass("error");
        total++;
    }

    //이메일 서비스 미 선택시 경고문 출력
    var isSelect = $("select[name=email2]").children("option:selected").val();

    if(isSelect==""){
        $("input[name=email1]").siblings("p").eq(1).addClass("error");
    }else {
        $("input[name=email1]").siblings("p").eq(1).removeClass("error");
        total++;
    }


    //textarea미 입력시 경고문 출력
    var isComment = $("textarea").val();

    if(isComment=="") {
        $("textarea").siblings("p").addClass("error");
        $("textarea").addClass("error");
    }else {
        $("textarea").siblings("p").removeClass("error");
        $("textarea").removeClass("error");
        total++;
    }

    //모든 7개의 조건이 충족하면 아래조건식이 무시되면서 action위치로 값 전송
    //만약 충족하지 않으면 e.preventDefault()로 값 전송방지
    if(total != 7) {
        e.preventDefault();
    }

});