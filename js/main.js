let table = document.querySelector(".table");
let button = document.querySelector(".btn1");
let fullTable = document.querySelector(".fullTable");
let array = [];

let selectValues = new URLSearchParams(window.location.search);
let width = selectValues.get("choice");
let width1 = selectValues.get("choice1");

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

// function tableValues(array, num1, num2) {
//     num1 += 2;
//     num2 += 2;
//     for (i = 0; i < num2; i++) {
//         tr = document.createElement('tr');
//         for (j = 0; j < num1; j++) {
//             td = document.createElement('td');
//             td.innerHTML = 1;
//             tr.appendChild(td);
//         }
//         fullTable.appendChild(tr);
//     }
// }

tableCreator(width, width1);

button.addEventListener("click", (e) => {
  doArray(table);

  for (let i = 0; i < array.length; i++) {
    setCookie(i, array[i], {secure: true, 'max-age': 5});
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


