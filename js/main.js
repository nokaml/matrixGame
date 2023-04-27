let table = document.querySelector('.table');
let button = document.querySelector('.btn1');
let array = [];
// +(select1.options[select1.selectedIndex].value);

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

let selectValues = new URLSearchParams(window.location.search);
let width = selectValues.get('choice');
let width1 = selectValues.get('choice1');

tableCreator(width, width1);

button.addEventListener('click', () => {
    for (let i = 0; i < table.childNodes.length; i++) {
        if (table.childNodes[i].value != undefined) {
            array.push(table.childNodes[i].value);
        }
    }
})