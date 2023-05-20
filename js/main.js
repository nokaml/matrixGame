// all variables

var table = document.querySelector(".table");
var button = document.querySelector(".btn1");
var button1 = document.querySelector(".button");
var fullTable = document.querySelector(".fullTable");
var A = document.querySelector(".A");
var B = document.querySelector(".B");
var solution = document.querySelector(".solution");

var array = [];
var minArr = [];
var maxArr = [];
var fullMinArr = [];
var fullMaxArr = [];
var matrixx = [];

var selectValues = new URLSearchParams(window.location.search);
var width = +selectValues.get("choice");
var width1 = +selectValues.get("choice1");

// all functions

function tableCreator(num1, num2) {
  for (i = 0; i < num2; i++) {
    for (j = 0; j < num1; j++) {
      tbCell = document.createElement("input");
      tbCell.type = "text";
      tbCell.className = "tbCell";
      tbCell.value = 0;
      table.appendChild(tbCell);
    }
    brPoint = document.createElement("br");
    table.appendChild(brPoint);
  }
}

function doArray(table, arr) {
  for (let i = 0; i < table.childNodes.length; i++) {
    if (table.childNodes[i].value != undefined) {
      arr.push(table.childNodes[i].value);
    }
  }
}

function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    // при необходимости добавьте другие значения по умолчанию
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function getColumnsMax(matrix, rows, columns) {
  const maxValues = [];
  for (let column = 0; column < columns; column++) {
    const columnValues = [];
    for (let row = 0; row < rows; row++) {
      columnValues.push(matrix[row][column]);
    }
    maxValues.push(Math.max(...columnValues));
  }

  return maxValues;
}

function toOneDimension(matrix) {
  let arr = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      arr.push(matrix[i][j]);
    }
  }
  return arr;
}

function tableValues(num1, num2) {
  for (i = 0; i < num2; i++) {
    let a = document.createElement("div");
    a.innerHTML = "A" + (i + 1);
    A.append(a);
  }

  for (i = 0; i < num1; i++) {
    let b = document.createElement("div");
    b.innerHTML = "B" + (i + 1);
    B.append(b);
  }

  let table = document.createElement("table");
  let k = 0;

  for (i = 0; i < num2; i++) {
    let temp = [];
    let tr = table.insertRow();
    for (j = 0; j < num1; j++) {
      k++;
      let td = tr.insertCell();
      td.innerHTML = getCookie("q" + k);
      minArr.push(getCookie("q" + k));
      temp.push(getCookie("q" + k));
    }
    maxArr.push(temp);
    fullMinArr.push(Math.min(...minArr));
    minArr.length = 0;
  }

  fullMaxArr.push(getColumnsMax(maxArr, num2, num1));

  fullTable.appendChild(table);
}

function removeMaxValueOfArr(arr) {

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == Math.max(...arr)) {
      arr.splice(i, 1);
    }
  }
}

function doMatrix(arr, num1, num2) {
  let k = 0;
  for (let i = 0; i < num2; i++) {
    let temp = [];
    for (let j = 0; j < num1; j++) {
      k++;
      temp.push(getCookie("q" + k));
    }
    arr.push(temp);
  }

  return arr;
}

// actual actions

tableCreator(width1, width);

if (button) {
  button.addEventListener("click", (e) => {
    doArray(table, array);
    for (let i = 0; i < array.length; i++) {
      setCookie("q" + (i + 1), array[i], { secure: true, "max-age": 5 });
    }
    for (let i = 0; i < array.length; i++) {
      if (isNaN(array[i])) {
        alert("ВВЕДИТЕ ЧИСЛО!");
        e.preventDefault();
        continue;
      }
      location.reload();
    }
  });
}

if (button1) {
  button1.addEventListener("click", () => {
    var select1 = document.querySelector(".select1");
    var select2 = document.querySelector(".select2");
    setCookie("select1", select1.options[select1.selectedIndex].value, {
      secure: true,
      "max-age": 30,
    });
    setCookie("select2", select2.options[select2.selectedIndex].value, {
      secure: true,
      "max-age": 30,
    });
  });
}

tableValues(getCookie("select2"), getCookie("select1"));

doMatrix(matrixx, getCookie("select2"), getCookie("select1"));

solution.innerHTML = `Находим гарантированный выигрыш, определяемый нижней ценой игры a = max(ai) = ${Math.max(
  ...fullMinArr
)}, которая указывает на максимальную чистую стратегию A2.<br>
  Верхняя цена игры b = min(bj) = ${Math.min(
    ...toOneDimension(fullMaxArr)
  )}.<br>`;

if (Math.max(...fullMinArr) == Math.min(...toOneDimension(fullMaxArr))) {
  solution.innerHTML += `Цена игры равна ${Math.max(...fullMinArr)}.`;
} else {

  for (let i = 0; i < getCookie("select1"); i++) {
    while (matrixx[i].length != 2) {
      removeMaxValueOfArr(matrixx[i]);
    }
  }

  array = matrixx.flat();

  const p1 =
    (+array[3] - +array[2]) /
    (+array[0] + +array[3] - +array[2] - +array[1]);
  const p2 =
    (+array[0] - +array[1]) /
    (+array[0] + +array[3] - +array[2] - +array[1]);
  const q1 =
    (+array[3] - +array[1]) /
    (+array[0] + +array[3] - +array[2] - +array[1]);
  const q2 =
    (+array[0] - +array[2]) /
    (+array[0] + +array[3] - +array[2] - +array[1]);
  const v =
    (+array[0] * +array[3] - +array[1] * +array[2]) /
    (+array[0] + +array[3] - +array[2] - +array[1]);

  solution.innerHTML += `Ответы в смешанных стратегия:<br>
  p1 = ${p1.toFixed(2)}<br>
  p2 = ${p2.toFixed(2)}<br>
  q1 = ${q1.toFixed(2)}<br>
  q2 = ${q2.toFixed(2)}<br>
  v = ${v.toFixed(2)}`;
}
