const obj = {
  pinyin: document.querySelector(".pinyin"),
  wade: document.querySelector(".wade"),
  btnSearch: document.querySelector(".btn-search"),
  input: document.querySelector(".query"),
};

const toggleSearch = evt => {
  evt.target.innerText !== obj.btnSearch.innerText
    ? (obj.btnSearch.innerHTML = evt.target.innerText)
    : (obj.btnSearch.innerHTML = obj.btnSearch.innerText);
};

const searchAlt = async () => {
  const resultArr = [];
  const response = await fetch("./data/transited.json");
  const data = await response.json();
  // console.log(data);

  const queryArr = obj.input.value.split(" ");

  if (obj.btnSearch.innerText === "Find Wade-Giles") {
    queryArr.forEach(ele => {
      data.forEach(item => {
        item["Pinyin"] === ele && resultArr.push(item["Wade-Giles"]);
      });
    });
  } else if (obj.btnSearch.innerText === "Find Pinyin") {
    queryArr.forEach(ele => {
      data.forEach(item => {
        item["Wade-Giles"] === ele && resultArr.push(item["Pinyin"]);
      });
    });
  }

  console.log(resultArr);
};

obj.pinyin.addEventListener("click", toggleSearch);
obj.wade.addEventListener("click", toggleSearch);
obj.btnSearch.addEventListener("click", searchAlt);
