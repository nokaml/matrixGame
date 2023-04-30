var table = document.querySelector(".table");
var button = document.querySelector(".btn1");
var button1 = document.querySelector('.button');
var fullTable = document.querySelector("table");

var array = [];

var selectValues = new URLSearchParams(window.location.search);
var width = +selectValues.get("choice");
var width1 = +selectValues.get("choice1");


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

function doArray(table) {
  for (let i = 0; i < table.childNodes.length; i++) {
    if (table.childNodes[i].value != undefined) {
      array.push(table.childNodes[i].value);
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

function tableValues(num1, num2, table) {
  for (i = 0; i < num2; i++) {
    tr = document.createElement('tr');
    tr = table.insertRow(i);
    for (j = 0; j < num1; j++) {
      tr.insertCell(j).innerHTML = 1;
    }
  }
}

tableCreator(width, width1);

if (button) {
  button.addEventListener("click", (e) => {
    doArray(table);

    for (let i = 0; i < array.length; i++) {
      setCookie(i, array[i], { secure: true, "max-age": 5 });
    }

    for (let i = 0; i < array.length; i++) {
      if (isNaN(array[i])) {
        alert("ВВЕДИТЕ ЧИСЛО!");
        e.preventDefault();
        break;
      }
    }

    location.reload();
    alert(document.cookie);
  });
}

if (button1) {
  button1.addEventListener('click', () => {
    var select1 = document.querySelector('.select1');
    var select2 = document.querySelector('.select2');
    setCookie('select1', select1.options[select1.selectedIndex].value, { secure: true, "max-age": 10 });
    setCookie('select2', select2.options[select2.selectedIndex].value, { secure: true, "max-age": 10 });
  })
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


tableValues(getCookie('select1'), getCookie('select1'), fullTable);
