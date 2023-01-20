const obj = {
  pinyin: document.querySelector(".pinyin"),
  wade: document.querySelector(".wade"),
  btnSearch: document.querySelector(".btn-search"),
  btnResult: document.querySelector(".btn-result"),
  find: document.querySelector(".find"),
  input: document.querySelector(".input"),
  output: document.querySelector(".output"),
};

const toggleSearch = evt => {
  obj.btnSearch.innerText = evt.target.innerHTML;
  console.log(typeof obj.btnResult.innerText);

  evt.target.innerHTML === "Pinyin"
    ? (obj.btnResult.innerText = "Wade-Giles")
    : (obj.btnResult.innerText = "Pinyin");
};

const searchAlt = async () => {
  const resultArr = [];
  const response = await fetch("./data/transited.json");
  const data = await response.json();

  const queryArr = obj.input.value.split(" ");

  try {
    if (obj.btnSearch.innerText === "Pinyin") {
      queryArr.forEach(ele => {
        data.forEach(datum => {
          datum["Pinyin (input)"] === ele &&
            resultArr.push(datum["Wade-Giles (output)"]);
        });
      });
    } else if (obj.btnSearch.innerText === "Wade-Giles") {
      queryArr.forEach(ele => {
        data.forEach(datum => {
          datum["Wade-Giles (input)"] === ele &&
            resultArr.push(datum["Pinyin (output)"]);
        });
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }

  resultArr.length !== 0
    ? (obj.output.placeholder = resultArr.join(" "))
    : (obj.output.placeholder = "Sorry, invalid result 🥲");
};

obj.pinyin.addEventListener("click", toggleSearch);
obj.wade.addEventListener("click", toggleSearch);
obj.find.addEventListener("click", searchAlt);
