let table = document.querySelector('.table');
let button = document.querySelector('.btn1');
let fullTable = document.querySelector('.fullTable');
let array = [];

let selectValues = new URLSearchParams(window.location.search);
let width = selectValues.get('choice');
let width1 = selectValues.get('choice1');


function tableCreator(num1, num2) {
    for (i = 0; i < num2; i++) {
        for (j = 0; j < num1; j++) {
            tbCell = document.createElement('input');
            tbCell.type = 'text';
            tbCell.className = 'tbCell'
            tbCell.value = 0;
            table.appendChild(tbCell);
        }
        brPoint = document.createElement('br');
        table.appendChild(brPoint);
    }
}

function doArray(table, array) {
    for (let i = 0; i < table.childNodes.length; i++) {
        if (table.childNodes[i].value != undefined) {
            array.push(table.childNodes[i].value);
        }
    }   
}

// function tableValues() {
//     width += 2;
//     width1 += 2;
//     for (i = 0; i < width1; i++) {
//         tr = document.createElement('tr');
//         for (j = 0; j < width; j++) {
//             // tr.className = 'box';
//             // tr.innerHTML = 1;
//             // fullTable.appendChild(tr);
//             td = document.createElement('td');
//             td.className = 'box';
//             td.innerHTML = array[j];
//             tr.appendChild(td); 
//         }
//         fullTable.appendChild(tr);
//     }
// }

tableCreator(width, width1);

// tableValues();

button.addEventListener('click', e => {
    doArray(table, array);
    for (let i = 0; i < array.length; i++) {
        if (isNaN(array[i])) {
            alert('ВВЕДИТЕ ЧИСЛО!');
            e.preventDefault();
            break
        }
    }
    location.reload();
});


