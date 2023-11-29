const display = document.getElementById('display');
let currentInput = '';
let currentOperation = '';
let previousInput = '';
let shouldResetCurrentInput = false;
let memory = 0;

function appendToCurrentInput(val) {
    if (shouldResetCurrentInput) {
        currentInput = '';
        shouldResetCurrentInput =  false;
    }
    currentInput += val;
    display.value = currentInput;
}

function setOperation(op) {
    if (previousInput && currentInput && currentOperation) {
        previousInput = evaluate();
        display.value = previousInput;
        currentInput = '';
    } else if (currentInput && !previousInput) {
        previousInput = currentInput;
        currentInput = '';
    }

    currentOperation = op;
    shouldResetCurrentInput = true;
}

function applyAdvancedFunction(funk) {
    if (currentInput) {
        let result = advancedFunction(funk, parseFloat(currentInput));
        if(result !== undefined) {
            currentInput = result.toString();
            display.value = currentInput;
        }
    }
}

function evaluate() {
    let result = 0;
    const pInput = parseFloat(previousInput);
    const cInput = parseFloat(currentInput);

    switch (currentOperation) {
        case '+':
            result = pInput + cInput;
            break;
        case '-':
            result = pInput - cInput;
            break;
        case '*':
            result = pInput * cInput;
            break;
        case '/':
            if (cInput !== 0) {
                result = pInput / cInput;
            } else {
                alert("Error: Division by zero!");
                clearAll();
                return;
            }
            break;
        case '^':
            result = Math.pow(pInput, cInput);
            break;
        default:
            return;
    }
    return result.toString();
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function advancedFunction(funk, value) {
    switch (funk) {
        case 'sin':
            return Math.sin(degreesToRadians(value));
        case 'cos':
            return Math.cos(degreesToRadians(value));
        case 'tan':
            return Math.tan(degreesToRadians(value));
        case 'log':
            if (value <= 0) {
                alert("Error: Log of a non-positive number.");
                clearAll();
                return;
            }
            return Math.log10(value);
        default:
            return;
    }
}

function clearAll() {
    currentInput = '';
    currentOperation = '';
    previousInput = '';
    display.value = '';
}

function calculateResult() {
    if (previousInput && currentInput && currentOperation) {
        currentInput = evaluate();
        display.value = currentInput;
        previousInput = '';
        currentOperation = '';
    }
}

document.querySelectorAll('.buttons button').forEach(button => {
    const value = button.textContent;

    if(['+', '-', '*', '/', '^'].includes(value)) {
        button.addEventListener('click', function() {
            setOperation(value);
        });
    }else if (['sin', 'cos', 'tan', 'log'].includes(value)) {
        button.addEventListener('click', function() {
            applyAdvancedFunction(value);
        })
    }else if (value === '=') {
        button.addEventListener('click', function() {
            calculateResult();
        });
    }else {
        button.addEventListener('click', function() {
            if (!button.getAttribute("data-functional")) {
                appendToCurrentInput(value);
            }
        });
    }
});

document.getElementById('memoryClear').addEventListener('click', function() {
    memory = 0;
});

document.getElementById('memoryRecall').addEventListener('click', function() {
    display.value = memory.toString();
    currentInput = memory.toString();
    shouldResetCurrentInput = true;
});

document.getElementById('memoryPlus').addEventListener('click', function() {
    if (currentInput) {
        memory += parseFloat(currentInput);
    }
});

document.getElementById('memoryMinus').addEventListener('click', function() {
    if (currentInput) {
        memory -= parseFloat(currentInput);
    }
});

document.getElementById('clear').addEventListener('click', clearAll);

document.getElementById('percentage').addEventListener('click', function() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) / 100).toString();
        display.value = currentInput;
    }
});

document.getElementById('squareRoot').addEventListener('click', function() {
    if (currentInput) {
        if (parseFloat(currentInput) < 0) {
            alert("Error: Negative number for square root.");
            clearAll();
            return;
        }
        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
        display.value = currentInput;
    }
});

document.getElementById('toggleSign').addEventListener('click', function() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        display.value = currentInput;
    }
});

