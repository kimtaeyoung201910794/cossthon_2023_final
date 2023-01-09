//main을 선택해주어야 하기 때문에 queryselector을 이용해서 main을 가져와줌
const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
//result queryselector로 불러와주기
const result = document.querySelector("#result");
//status bar을 만들기위해 엔드포인트 설정해주기
const endPoint = 10;

const select = [0,0,0,0];

function addAnswer(answerText,qIdx,idx){
    var a = document.querySelector(".aBox");
    //버튼 형식으로 만들어주기
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-5');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');

    answer.classList.add('fadeIn');
    a.appendChild(answer);
    answer.innerHTML = answerText;

    //클릭 이벤트 사용해주기
    answer.addEventListener("click",function(){
        var children= document.querySelectorAll('.answerList');
        for(let i=0; i<children.length; i++){
            children[i].disabled = true;

            //버튼 사라지게 하기
            children[i].style.WebkitAnimation = "fadeOut 0.5s"
            children[i].style.aniamtion = "fadeOut 0.5s"

        }
        //타이머 기능 사용하여 버튼들 안보이게 만들어주기
        setTimeout(()=> {

            var target = qnaList[qIdx].a[idx].type;

            //select에 값이 추가되게 하기
            for(let i =0; i<target.length; i++){
                select[target[i]]+=1
            }
            for(let i=0; i<children.length; i++){
                children[i].style.display="none";
            }
            goNext(++qIdx);
        },450)
    },false)

}
//result 를 계산해주기
function calResult(){
    //select값중에서 최댓값을 가져와서 인덱스 값을 가져오는것
    var result = select.indexOf(Math.max(...select));
    return result;
}

function setResult(){
    //result 계산
    let point=calResult();

    //point에 반환된 값으로 infoList에서 결과 값들 가져오기
    const resultNameIntro = document.querySelector('.resultIntro');
    //data.js에있는 infoList부분에 nameIntro부분 가져오기
    resultNameIntro.innerHTML = infoList[point].nameIntro;

    //point에 반환된 값으로 infoList에서 결과 값들 가져오기
    const resultName = document.querySelector('.resultName');
    resultName.innerHTML = infoList[point].name;

    //point에 반환된 값으로 infoList에서 결과 값들 가져오기
    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector("#resultImg");
    var imgURL = 'img/image-' +point+'.png';

    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    //point에 반환된 값으로 infoList에서 결과 값들 가져오기
    const resultDesc1 = document.querySelector('.resultDesc1');
    const resultDescTitle1 = document.querySelector('.resultDescTitle1');
    resultDescTitle1.innerHTML = infoList[point].descTitle1;
    resultDesc1.innerHTML = infoList[point].desc1;

    //point에 반환된 값으로 infoList에서 결과 값들 가져오기
    const resultDesc2 = document.querySelector('.resultDesc2');
    const resultDescTitle2 = document.querySelector('.resultDescTitle2');
    resultDescTitle2.innerHTML = infoList[point].descTitle2;
    resultDesc2.innerHTML = infoList[point].desc2;

}

function goResult() {
    //크롬은 webkit도 적어줘야해서 추가적으로 적어줌
    qna.style.webkitAnimation = "fadeOut 1s"
    qna.style.animation = "fadeOut 1s";
    //qna화면이 사라지고 result화면이 나타날때 자연스럽게 나타나게
    //하기위해서 애니매이션 기능을 추가하고 시간도 걸어주기
    setTimeout(()=>{
        result.style.webkitAnimation = "fadeIn 1s"
        result.style.animation = "fadeIn 1s";
        setTimeout(()=> {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450);

    }, 450);

    //result 셋팅해주기
    setResult();
   
    


   
}

//다음질문 넘어가는 함수 작성해주기
function goNext(qIdx){

    //q인덱스가 앤드포인트에 도달했을때 goresult로 가기
    if(qIdx == endPoint) {
        goResult();
        return;
    }

    var q= document.querySelector('.Qbox');
    q.innerHTML = qnaList[qIdx].q;

    //data.js에있는 값을 가져오기
    for(let i in qnaList[qIdx].a)
    {
        //질문을 더해주는 함수
        //i값 전달해주기
        addAnswer(qnaList[qIdx].a[i].answer,qIdx,i);
    }

    var countStatusNum = document.querySelector('.countStatus');
    countStatusNum.innerHTML = (qIdx + 1)+"/"+ endPoint;

    //statusbar생성해주기
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint)*(qIdx+1) +"%"
}




//start함수를 만들어서 클릭이 되었을때 main페이지는 사라지고 
//qna페이지가 나타나게끔 하는 함수 만들기
function start() {
    //크롬은 webkit도 적어줘야해서 추가적으로 적어줌
    main.style.webkitAnimation = "fadeOut 1s"
    main.style.animation = "fadeOut 1s";
    //main화면이 사라지고 qna화면이 나타날때 자연스럽게 나타나게
    //하기위해서 애니매이션 기능을 추가하고 시간도 걸어주기
    setTimeout(()=>{
        qna.style.webkitAnimation = "fadeIn 1s"
        qna.style.animation = "fadeIn 1s";
        setTimeout(()=> {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450);
        let qIdx = 0;
        goNext(qIdx);

    }, 450);
   
    


   
}