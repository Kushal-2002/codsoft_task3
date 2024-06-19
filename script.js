// script.js
document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('button'));
    let currentInput = '';
    let firstOperand = null;
    let operator = null;
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                resetCalculator();
            } else if (value === '=') {
                calculateResult();
            } else if (['+', '-', '*', '/'].includes(value)) {
                handleOperator(value);
            } else {
                handleDigit(value);
            }
        });
    });

    function resetCalculator() {
        currentInput = '';
        firstOperand = null;
        operator = null;
        shouldResetDisplay = false;
        display.textContent = '0';
    }

    function handleOperator(op) {
        if (operator !== null && !shouldResetDisplay) {
            calculateResult();
        }
        firstOperand = parseFloat(currentInput);
        operator = op;
        shouldResetDisplay = true;
    }

    function handleDigit(digit) {
        if (shouldResetDisplay) {
            currentInput = digit;
            shouldResetDisplay = false;
        } else {
            currentInput += digit;
        }
        display.textContent = currentInput;
    }

    function calculateResult() {
        if (operator === null || shouldResetDisplay) {
            return;
        }
        const secondOperand = parseFloat(currentInput);
        let result;
        switch (operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                result = firstOperand / secondOperand;
                break;
        }
        display.textContent = result;
        currentInput = result.toString();
        operator = null;
        shouldResetDisplay = true;
    }
});
