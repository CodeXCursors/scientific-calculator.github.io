Math.factorial = (n) => {
    if (n === 0 || n === 1) {
        return 1;
    } else if (n < 0) {
        return -1;
    } else {
        return n * Math.factorial(n - 1);
    }
}

Math.gamma = (n) => {
    let p = [
        0.99999999999980993,
        676.5203681218851,
        -1259.1392167224028,
        771.32342877765313,
        -176.61502916214059,
        12.507343278686905,
        -0.13857109526572012,
        9.9843695780195716e-6,
        1.5056327351493116e-7
    ];

    let g = 7;

    if (n < 0.5) {
        return Math.PI / (Math.sin(Math.PI * n) * gamma(1 - n));
    } else {
        n -= 1;
        let x = p[0];

        for (let i = 1; i < g + 2; i++) {
            x += p[i] / (n + i);
        }

        let t = n + g + 0.5;
        return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
    }
}

Math.cot = (n) => {
    return 1 / Math.tan(n);
}

Math.sec = (n) => {
    return 1 / Math.cos(n);
}

Math.csc = (n) => {
    return 1 / Math.sin(n);
}

Math.subFactorial = (n) => {
    return Math.floor((Math.factorial(n) / Math.E) + (1 / 2));
}

class Calculator {
    constructor(previousElem, currentElem) {
        this.previousElem = previousElem;
        this.currentElem = currentElem;
        this.clear();
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    append(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }

        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    sign() {
        if (this.currentOperand < 0) {
            this.currentOperand = Math.abs(this.currentOperand);
        } else {
            this.currentOperand = -Math.abs(this.currentOperand);
        }
    }

    operate(operator) {
        if (this.currentOperand === '') {
            return;
        }

        if (this.previousOperand !== '') {
            this.compute();
        }

        this.operation = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(previous) || isNaN(current)) {
            return;
        }

        switch (this.operation) {
            case '+':
                computation = previous + current;
                break;
            case '-':
                computation = previous - current;
                break;
            case '×':
                computation = previous * current;
                break;
            case '÷':
                computation = previous / current;
                break;
            case '%':
                computation = previous % current;
                break;
            case '^':
                computation = previous ** current;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }

        const floatNumber = parseFloat(number);

        if (isNaN(floatNumber)) {
            return '';
        }

        return floatNumber.toLocaleString('en');
    }

    // Special Operator Functions

    sin() {
        this.currentOperand = Math.sin(this.currentOperand);
    }

    cos() {
        this.currentOperand = Math.cos(this.currentOperand);
    }

    tan() {
        this.currentOperand = Math.tan(this.currentOperand);
    }

    factorial() {
        this.currentOperand = Math.factorial(this.currentOperand);
    }

    subFactorial() {
        this.currentOperand = Math.subFactorial(this.currentOperand);
    }

    squareRoot() {
        this.currentOperand = Math.sqrt(this.currentOperand);
    }

    pi() {
        this.currentOperand = Math.PI;
    }

    e() {
        this.currentOperand = Math.E;
    }

    log() {
        this.currentOperand = Math.log(this.currentOperand);
    }

    ln() {
        this.currentOperand = Math.log(this.currentOperand) / Math.log(Math.E);
    }

    ceiling() {
        this.currentOperand = Math.ceil(this.currentOperand);
    }

    floor() {
        this.currentOperand = Math.floor(this.currentOperand);
    }

    cot() {
        this.currentOperand = Math.cot(this.currentOperand);
    }

    sec() {
        this.currentOperand = Math.sec(this.currentOperand);
    }

    csc() {
        this.currentOperand = Math.csc(this.currentOperand);
    }

    gamma() {
        this.currentOperand = Math.gamma(this.currentOperand);
    }

    squared() {
        this.currentOperand = Math.pow(this.currentOperand, 2);
    }

    cubed() {
        this.currentOperand = Math.pow(this.currentOperand, 3);
    }

    cubeRoot() {
        this.currentOperand = Math.cbrt(this.currentOperand);
    }

    update() {
        if (this.operation != null) {
            this.previousElem.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousElem.innerText = '';
        }

        this.currentElem.innerText = this.getNumber(this.currentOperand);
    }
}

const numberBtn = document.querySelectorAll('[data-number]');
const operatorBtn = document.querySelectorAll('[data-operator]');
const clearBtn = document.querySelector('[data-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const equalBtn = document.querySelector('[data-equal]');
const signBtn = document.querySelector('[data-sign]');
const previousElem = document.querySelector('[data-previous]');
const currentElem = document.querySelector('[data-current]');

const calculator = new Calculator(previousElem, currentElem);

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.append(button.innerText);
        calculator.update();
    });
});

operatorBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operate(button.innerText);
        calculator.update();
    });
});

equalBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.update();
});

clearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.update();
});

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.update();
});

signBtn.addEventListener('click', () => {
    calculator.sign();
    calculator.update();
});

// Special Operators
const sinBtn = document.querySelector('[data-sin]');
const cosBtn = document.querySelector('[data-cos]');
const tanBtn = document.querySelector('[data-tan]');
const factorialBtn = document.querySelector('[data-factorial]');
const subFactorialBtn = document.querySelector('[data-subfactorial]');
const squareRootBtn = document.querySelector('[data-square-root]');
const piBtn = document.querySelector('[data-pi]');
const eBtn = document.querySelector('[data-e]');
const logBtn = document.querySelector('[data-log]');
const lnBtn = document.querySelector('[data-ln]');
const ceilingBtn = document.querySelector('[data-ceiling]');
const floorBtn = document.querySelector('[data-floor]');
const cotBtn = document.querySelector('[data-cot]');
const secBtn = document.querySelector('[data-sec]');
const cscBtn = document.querySelector('[data-csc]');
const gammaBtn = document.querySelector('[data-gamma]');
const squaredBtn = document.querySelector('[data-squared]');
const cubedBtn = document.querySelector('[data-cubed]');
const cubeRootBtn = document.querySelector('[data-cube-root]');

sinBtn.addEventListener('click', () => {
    calculator.sin();
    calculator.update();
});

cosBtn.addEventListener('click', () => {
    calculator.cos();
    calculator.update();
});

tanBtn.addEventListener('click', () => {
    calculator.tan();
    calculator.update();
});

factorialBtn.addEventListener('click', () => {
    calculator.factorial();
    calculator.update();
});

subFactorialBtn.addEventListener('click', () => {
    calculator.subFactorial();
    calculator.update();
});

squareRootBtn.addEventListener('click', () => {
    calculator.squareRoot();
    calculator.update();
});

piBtn.addEventListener('click', () => {
    calculator.pi();
    calculator.update();
});

eBtn.addEventListener('click', () => {
    calculator.e();
    calculator.update();
});

logBtn.addEventListener('click', () => {
    calculator.log();
    calculator.update();
});

lnBtn.addEventListener('click', () => {
    calculator.ln();
    calculator.update();
});

ceilingBtn.addEventListener('click', () => {
    calculator.ceiling();
    calculator.update();
});

floorBtn.addEventListener('click', () => {
    calculator.floor();
    calculator.update();
});

cotBtn.addEventListener('click', () => {
    calculator.cot();
    calculator.update();
});

secBtn.addEventListener('click', () => {
    calculator.sec();
    calculator.update();
});

cscBtn.addEventListener('click', () => {
    calculator.csc();
    calculator.update();
});

gammaBtn.addEventListener('click', () => {
    calculator.gamma();
    calculator.update();
});

squaredBtn.addEventListener('click', () => {
    calculator.squared();
    calculator.update();
});

cubedBtn.addEventListener('click', () => {
    calculator.cubed();
    calculator.update();
});

cubeRootBtn.addEventListener('click', () => {
    calculator.cubeRoot();
    calculator.update();
});