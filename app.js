let userInput=document.getElementById('user-input'); //사용자 입력값
let addBtn=document.getElementById('add-btn');       //추가버튼
let canBtn=document.getElementById('can-btn');          //취소버튼
                                                 //완료버튼
let body=document.querySelector('body')
let categoryBtn=document.querySelectorAll('#list-menu div')
let mode="all"

let textList=[] //textListObj 를 입력하여 배열로 저장하는 변수
let successList=[] //success 값이 false,true인 textList 요소를 배열로 저장하는 변수


for(let i=0; i<categoryBtn.length; i++){
    categoryBtn[i].addEventListener('click',function(e){
        categoryBtnEvent(e)
    }
   )
 };



//이벤트 호출 영역
addBtn.addEventListener('click',()=>{
    addBtnEvent();
    userInput.value=""
})
body.addEventListener('keyup',function(e){
    if(e.keyCode==13){
        addBtnEvent()
        userInput.value=""
    }
  })






// 추가버튼 함수
function addBtnEvent(){
    let textListObj={
        id:randomID(),            //랜덤 식별자(id)
        success:false,             //false: 진행중 , true: 완료
        userVal:userInput.value      //유저의 인풋 입력 값
    };

    textList.push(textListObj)
    console.log(textList)

    render();

};


function render(){
    let textHTML =" "
    let modeList=[]

    if(mode ==="all"){
        modeList=textList
    }else{
        modeList=successList
    };


    for(let i=0; i<modeList.length; i++){
        if(modeList[i].success === false)
        textHTML+= `<div class="text-box">
        <span class="text">${modeList[i].userVal}</span>
          <div class="btn">
             <button class="check" onclick="completeLine('${modeList[i].id}')">✔</button>
             <button class="del" onclick="deleteBtn('${modeList[i].id}')">✘</button>
          </div>
        </div>`

        else{
            textHTML+= `<div class="text-box on-line">
            <span class="text">${modeList[i].userVal}</span>
              <div class="btn">
                 <button class="return" onclick="completeLine('${modeList[i].id}')">♻</button>
                 <button class="del" onclick="deleteBtn('${modeList[i].id}')">✘</button>
              </div>
            </div>`
        };
    };

    document.querySelector('.to-do-list').innerHTML = textHTML
};
render();



 function completeLine(id){
    for(let i=0; i<textList.length; i++){
        if(textList[i].id === id){
            textList[i].success = !textList[i].success
            break;
        };
    };
    render();
};

function deleteBtn(id){
    for(let i=0; i<textList.length; i++){
        if(textList[i].id === id){
            textList.splice(i, 1)
            break;
        };
    };
    render();
};



let categoryBtnEvent=(e)=>{
    mode = e.target.id
    console.log(mode)

    if(mode =="going"){
        for(let i=0; i<textList.length; i++){
            if(textList[i].success === false){
                successList.push(textList[i])
                console.log(successList)
                console.log(textList.length)
            }
        }
    }else if(mode =="end"){
        for(let i=0; i<textList.length; i++){
            if(textList[i].success){
                successList.push(textList[i])
                console.log(successList)
               
            }
        } 
    } 
    render();
 }

//-------------------랜덤 id ---------------
function randomID(){
    return "_"+Math.random().toString(36).substr(2,16)
}