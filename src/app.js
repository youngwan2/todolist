const userInput = document.getElementById("user_input");
const addBtn = document.getElementById("add_btn");
const itemList = [];
let id = 0;

//   할일목록 추가
const insertFun = () => {
  let inputVal = userInput.value;
  if (inputVal == "") {
    const value = prompt(
      "혹시 잊으신거 없나요?(ex. 할 일).미기입 시 공백이 입력됩니다."
    );
    inputVal = value;

  }

  const inputPath = {
    id: id++,
    date: new Date().toLocaleString(),
    content: inputVal,
    complete: false,
  };
  itemList.push(inputPath);
  render(itemList); //렌더링 담당 함수에 할일목록(리스트)을 넘겨줌
  userInput.value = "";
};

//  -------------------렌더링 처리 영역------------------
function render(itemList) {
  const contentCon = document.querySelector("#content_container");
  let filterList = itemList;
  let itemHTML = "";

  filterList.map((liEl, i) => {
    if (filterList[i].complete === false) {
      itemHTML += `
        <section class="content_area">
        <p class="item_id">${liEl.id}</p>
        <p class="item_content">${liEl.content}</p>
        <p class="item_date">${liEl.date}</p>
        <div class="item_btn">
          <button
            onclick="checkFun(${liEl.id})"
            class="check_btn">완료</button>
          <button 
            onclick="delFun(${liEl.id})" 
            class="del_btn">삭제</button>
        </div>
      </section>
        `;
    } else {
      itemHTML += `
        <section class="content_area complete">
        <p class="item_id">${liEl.id}</p>
        <p class="item_content">${liEl.content}</p>
        <p class="item_date">${liEl.date}</p>
        <div class="item_btn">
          <button
            onclick="checkFun(${liEl.id})"
            class="check_btn">완료</button>
          <button
            onclick="delFun(${liEl.id})" 
            class="del_btn">삭제</button>
        </div>
      </section>
        `;
    }
  });
  contentCon.innerHTML = itemHTML;
}

//   이벤트리스너 영역
addBtn.addEventListener("click", insertFun);

window.addEventListener("keydown",(e)=>{
    if(e.key ==="Enter")
    insertFun();
})

//  완료 버튼 클릭 시 itemList의 complete 의 불린값을 변경함
// 이 불린값을 활용해서 목록의 완료/미완료 상태를 나눔.
const checkFun = (id) => {
  for (let i = 0; i < itemList.length; i++) {
    if (id === itemList[i].id) {
      itemList[i].complete = !itemList[i].complete;
      console.log("기존:", itemList);
    }
  }
  render(itemList);
};

// 삭제 버튼 클릭 시 리스트를 삭제하는 함수
const delFun = (id) => {
  itemList.forEach((_, i) => {
    if (id === itemList[i].id) {
      itemList.splice(i, 1);
    }
  });
  render(itemList);
};
