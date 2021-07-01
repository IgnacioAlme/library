const btnNumbers = document.querySelectorAll('.number');
const display = document.getElementById('display');
const btnClear = document.getElementById('clear');
const btnDel = document.getElementById('delete');
const btnOperators = document.querySelectorAll('.operator');
const btnEqual = document.querySelector('.equal');
const keys = Array.from(document.querySelectorAll('.key'));

let queue = "";
let saved = "";
let op;


function getKeyNumber(e) {
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    console.log('key: ', key.id);
    if (!isNaN(key.id)) {
        queue += key.id;
        display.value += key.id;
    } else if (key.id === "equal") {
        showOnDisplay();
    } else {
        op = key.id;
        if (saved !== "") {
            showOnDisplay();
        }
        saved = queue;
        queue = "";
        display.value = "";
    }

}

function getNumber() {
    if (queue === 'ERROR') {
        display.value = "";
        queue = "";
    }
    queue += this.id;
    console.log(queue);
    display.value += this.id;
}
function clearDisplay() {
    display.value = "";
    saved = "";
    queue = "";
    op = "";
    console.log('saved: ', saved);
    console.log('queue: ', queue);
}
function separateQueue() {
    op = this.id;
    if (saved !== "") {
        showOnDisplay();
        console.log('saved: ', saved);
        console.log('queue: ', queue);
    }
    display.value = "";
    saved = queue;
    queue = "";
}
function showOnDisplay() {
    let result = operator(op, saved, queue);
    queue = result;
    saved = "";
    display.value = result;
}
function delNumber() {
    queue = queue.slice(0, -1);
    console.log('queue: ', queue);
    display.value = queue;
}

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return rounded(a / b);
}
function operator(operator, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "x":
            return multiply(num1, num2);
        case "÷":
            if (num2 === 0) {
                return 'ERROR';
            }
            else return divide(num1, num2);
        default:
            return null;
    }
}

function rounded(number) {
    return Math.round(number * 1000) / 1000;
}

btnNumbers.forEach(btnNumber => btnNumber.addEventListener('click', getNumber));
btnOperators.forEach(btnOperator => btnOperator.addEventListener('click', separateQueue));
btnEqual.addEventListener('click', showOnDisplay);
btnClear.addEventListener('click', clearDisplay);
btnDel.addEventListener('click', delNumber);

//Keyboard input
window.addEventListener('keydown', getKeyNumber);

/*
document.addEventListener('keydown', function(event) {
    switch (event.code) {
        case 'Numpad1':
            
            break;
    
        default:
            break;
    }
});
*/