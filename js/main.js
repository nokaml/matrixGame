var table = document.querySelector('.table');
var button = document.querySelector('.btn1');
var button1 = document.querySelector('.button');
var fullTable = document.querySelector('.fullTable');
var row = document.querySelector('.row');
var column = document.querySelector('.column');
var table1 = document.querySelector('.table1');

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
  });
}

if (button1) {
  button1.addEventListener('click', () => {
    var select1 = document.querySelector('.select1');
    var select2 = document.querySelector('.select2');
    setCookie('select1', select1.options[select1.selectedIndex].value, { secure: true, "max-age": 20 });
    setCookie('select2', select2.options[select2.selectedIndex].value, { secure: true, "max-age": 20 });
  })
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


// tableValues(getCookie('select1'), getCookie('select2'), row, column, table1);

/* Defining the tableCreate function */
function tableCr(rows, cols, data, thead, tfoot) {
  // 1) Create table and body elements
  let table = document.createElement('table')
  let tableBody = document.createElement('tbody')

  // 2) Optional header
  let headContent = document.createElement('thead')
  let tr = document.createElement('tr')

  // 2.1) Sets default behavior: Single cell header
  if (thead && Array.isArray(thead) == false) {
    let td = document.createElement('td')
    td.innerHTML = thead // Set header text to argument input
    td.setAttribute('colspan', cols) // Span header for as many cols as table
    tr.append(td)

    headContent.append(tr) // append head row to thead element
    thead = headContent // Make this final value of thead
  }
  // 2.2) If "split" is third argument: Creates a multi-cell header
  if (Array.isArray(thead)) {
    let i
    for (i = 0; i < cols; i++) {
      let td = document.createElement('td')
      td.id = 'thead' + i
      td.innerHTML = thead[i]
      tr.append(td) // append multiple td to head row
    }
    headContent.append(tr) // append head row to thead element
    thead = headContent // Make this final value of thead
  }

  // 3) Optional footer (text is user input string)
  if (tfoot) {
    footElement = document.createElement('tfoot')
    tr = document.createElement('tr')
    td = document.createElement('td')
    td.innerHTML = tfoot // Set text to fourth argument input
    td.setAttribute('colspan', cols)
    tr.append(td) // Append single cell to row
    footElement.append(tr) // Append row to tfoot element
    tfoot = footElement // Make this final value of tfoot
  }

  // 4) Create table body rows and cell with loops
  let i
  for (i = 0; i < rows; i++) {
    // Loop to create row
    let tr = document.createElement('tr')

    let id = i * cols // Nested loop to append cells to rows (first loop id = 0*5; second loop id = 1*5, etc)
    for (j = 0; j < cols; j++) {
      let td = document.createElement('td')
      id++ // increase id by 1 (first loop is 0+1 = 1)
      if (id == i * cols + 1) {
        td.classList.add('left-col')
      }
      td.innerHTML = id // print id in col cell
      td.setAttribute('id', 'cell' + id) // set id of element to id
      tr.append(td) // append col cell to table row
      // Repeats until j < column numbers entered by user

      if (data) {
        td.innerHTML = data[id - 1]
      }
    }

    tableBody.append(tr)
  }

  // 5) Append head, body and footer
  if (thead) {
    table.append(thead)
  }
  table.append(tableBody)
  if (tfoot) {
    table.append(tfoot)
  }

  // Show table in console
  fullTable.append(table);

  // 6) Return a value for the function
  return table
}

function A(num1, num2) {
  
  for (i = 0; i < num2; i++) {
    for (j = 0; j < num1; j++) {
      return 'A' + (i + 1);
    }
  }
}

// Define data input
const data = ["Monday", "Cereal", "Steamed rice", "Baked Potatoes",
              "Tuesday", "Bagel", "Spaghetti bolognese", "Pasta salad",
              "Wednesday", "Oatmeal", "Pasta", "Burger",
              "Thursday", "Cereal", "Fish and chips", "Fried Rice",
              "Friday", "Fried breakfast", "Sandwiches", "Lasange"
            ]

// Define headings
const headings = ['Игроки', A(getCookie('select1'), getCookie('select2')), 'A = min(ai)']

/* Call tableCreate */
alert(document.cookie);
tableCr(5,4,data,headings,'Created by JavaScript');