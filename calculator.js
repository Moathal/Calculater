class solver {
    // this class is solving operations individually.
    ans = 0;
    times(input1, input2, ans) {
        ans = (input1 * input2) * 100000000;
        if (ans !== 0) {
            ans = Math.round(ans) / 100000000;
        };
        return ans
    }
    divide(input1, input2, ans) {
        ans = (parseFloat(input1) / parseFloat(input2)) * 100000000;
        if (ans !== 0) {
            ans = Math.round(ans) / 100000000;
        };
        return ans
    }
    plus(input1, input2, ans) {
        ans = (parseFloat(input1) + parseFloat(input2)) * 100000000;
        if (ans !== 0) {
            ans = Math.round(ans) / 100000000;
        };
        return ans
    }
    power(input1, pwr, ans) {
        ans = (parseFloat(input1) ** parseFloat(pwr)) * 100000000;
        if (ans !== 0) {
            ans = Math.round(ans) / 100000000;
        };
        return ans
    }
    root(input1, pwr, ans) {
        ans = (parseFloat(input1) ** (1 / parseFloat(pwr))) * 100000000;
        if (ans !== 0) {
            ans = Math.round(ans) / 100000000;
        };
        return ans
    }
    cos(input1, ans) {
        ans = (Math.cos(parseFloat(input1))) * 100000000;
        if (ans !== 0) {
            ans = Math.round(ans) / 100000000;
        };
        return ans
    }
    sin(input1, ans) {
        ans = (Math.sin(parseFloat(input1))) * 100000000;
        if (ans !== 0) {
            ans = Math.round(ans) / 100000000;
        };
        return ans
    }
    tan(input1, ans) {
        ans = (Math.tan(parseFloat(input1))) * 100000000;
        if (ans !== 0) {
            ans = Math.round(ans) / 100000000;
        };
        return ans
    }
};


class analyser {
    // this class sends the found operation of math priority using simplify and send it to be solved using extractor. 
    simplify(equat) {
        innerEquat = equat;
        if (!isNaN(innerEquat)) return innerEquat;
        for (i = 0; i < innerEquat.length; i++) {
            if (innerEquat.charAt(i) === "-") {
                if (innerEquat.charAt(i - 1).match(/\d/g) || validate.constant(innerEquat.slice(i - 3, i))) return analyze.simplify(innerEquat.slice(0, i) + "+" + innerEquat.slice(i, innerEquat.length));
            };
        };
        for (i = 0; i < innerEquat.length; i++) {
            if (innerEquat.slice(i - 2, i + 1) === "Ans") return analyze.simplify(innerEquat.replace(innerEquat.slice(i - 2, i + 1), Ans))
            if (innerEquat.charAt(i) === "e") return analyze.simplify(innerEquat.replace(innerEquat.charAt(i), "2.7182818"));
            if (innerEquat.charAt(i) === "π") return analyze.simplify(innerEquat.replace(innerEquat.charAt(i), '3.1415926'));
            if (innerEquat.charAt(i) === '^') return analyze.extractor(i);
        };
        for (i = 0; i < innerEquat.length; i++) {
            if (innerEquat.charAt(i) === '×') return analyze.extractor(i);
            if (innerEquat.charAt(i) === '/') return analyze.extractor(i);
            if (innerEquat.charAt(i) === '÷') return analyze.extractor(i);
        };
        for (i = 0; i < innerEquat.length; i++) {
            if (innerEquat.charAt(i) === "+") return analyze.extractor(i);
        };
    };

    extractor(operationPosition) {
        let input1 = "", input2 = "", before = null, after = null;
        for (before = operationPosition - 1; before >= 0; before--) {
            if (!innerEquat.charAt(before).match(/\d|\.|-/g)) break;
            input1 = innerEquat.charAt(before) + input1;
        };
        for (after = operationPosition + 1; after < innerEquat.length; after++) {
            if (!innerEquat.charAt(after).match(/\d|\.|-/g)) break;
            input2 = input2 + innerEquat.charAt(after);
        };
        if (innerEquat.charAt(operationPosition) === "^") return analyze.simplify(innerEquat.replace(`${input1}^${input2}`, solve.power(input1, input2)));
        if (innerEquat.charAt(operationPosition) === "×") return analyze.simplify(innerEquat.replace(`${input1}×${input2}`, solve.times(input1, input2)));
        if (innerEquat.charAt(operationPosition) === "÷") return analyze.simplify(innerEquat.replace(`${input1}÷${input2}`, solve.divide(input1, input2)));
        if (innerEquat.charAt(operationPosition) === "/") return analyze.simplify(innerEquat.replace(`${input1}/${input2}`, solve.divide(input1, input2)));
        if (innerEquat.charAt(operationPosition) === "+") return analyze.simplify(innerEquat.replace(`${input1}+${input2}`, solve.plus(input1, input2)));
    };
};


class validator {
    //  functions test the input kind.

    constant(str) {
        for (let element of constants) {
            if (element.innerText === str) return true;
        };
        for (let element of constants) {
            if (element.innerText === str.charAt(2)) return true;
        };
        return false;
    };

    operation(str) {
        for (let element of ops) {
            if (element.innerText === str) return true;
        };
    };
    triganometric(str) {
        for (let element of triganometrics) {
            if (element.innerText === str) return true;
        };
    };
};


let Ans = null;
let equation = "";
innerEquat = "";
const input = document.getElementById("input");
const output = document.getElementById("output");
let int = '';
const container = document.getElementById("cont");
const clear = document.getElementById('clear');
const ints = document.querySelectorAll(".btn.num");
const ttlheight = screen.height;
const ttlwidth = screen.width;
const triganometrics = document.querySelectorAll('.trig');
const exp = document.getElementById('2.718281828459');
const pi = document.getElementById('3.1415926');
const root = document.getElementById('root');
const pwr = document.getElementById('^');
const BckSpc = document.getElementById('BckSpc');
const ops = document.querySelectorAll(".btn.op");
let op = "";
const constants = document.querySelectorAll(".btn.constant");
let constant = "";
const dot = document.getElementById(".");
const equal = document.getElementById("equal");
let rootid = 0;
let rootadded = false;
const solve = new solver;
const analyze = new analyser;
const validate = new validator;

// sizing of elements
input.style.minHeight = `${ttlheight * 0.71116 * 0.25 * 0.4}px`;
input.style.maxWidth = `${ttlwidth * 0.265 * 0.94}px`;
output.style.minHeight = `${ttlheight * 0.71116 * 0.25 * 0.6}px`;
output.style.maxWidth = `${ttlwidth * 0.265 * 0.94}px`;


// validating user input of operations before displaying it with one special case which is"-".
ops.forEach(op => op.addEventListener('click', () => {
    if (!rootadded) {
        if (op.innerText !== input.innerText.charAt(input.innerText.length - 1) &&
            input.innerText.charAt(input.innerText.length - 1) !== ".") {
            if (op.innerText !== "-") {
                if (input.innerText.length !== 0) {
                    let opsSequenced = false;
                    for (i = 0; i < 5; i++) {
                        if (input.innerText.charAt(input.innerText.length - 1) === ops[i].innerText && i !== 1) {
                            opsSequenced = true;
                            input.innerHTML = input.innerHTML.slice(0, -1) + op.innerText;
                            break;
                        };
                    };
                    if (!opsSequenced && input.innerText.charAt(input.innerText.length - 1) !== "-") {
                        input.innerHTML = input.innerHTML + op.innerText;
                    };
                };
            }
            else {
                input.innerHTML = input.innerHTML + op.innerText;
            };
        };
    };
}));
// validating user input of constants before displaying it with one special case which is"Ans".
constants.forEach(constant => constant.addEventListener('click', () => {
    if (!rootadded) {
        if (input.innerText.charAt(input.innerText.length - 1).match(/\d/g) ||
            input.innerText.charAt(input.innerText.length - 1) === ")" || validate.constant(input.innerText.slice(input.innerText.length - 3, input.innerText.length))) {
                if (constant.innerText !== "Ans")
                {
                input.innerHTML = input.innerHTML + `×${constant.innerText}`;
                } 
                else if (Ans !== null)
                {
                    input.innerHTML = input.innerHTML + `×${constant.innerText}`;
                };
            }
        else if ((input.innerText.length === 0 || validate.operation(input.innerText.charAt(input.innerText.length - 1)) || input.innerText.charAt(input.innerText.length - 1) === "(")) {
            if (constant.innerText !== "Ans")
                {
                input.innerHTML = input.innerHTML + constant.innerText;
                } 
                else if (Ans !== null)
                {
                    input.innerHTML = input.innerHTML + constant.innerText;
                };
        }
    };
}));
// validating user input of integers before displaying it.
ints.forEach(int => int.addEventListener('click', () => {
    if (!rootadded) {
        if ((validate.constant(input.innerText.slice(input.innerText.length - 3, input.innerText.length)) ||
            input.innerText.charAt(input.innerText.length - 1) === ")") && int.innerText !== ")") {
            input.innerHTML = input.innerHTML + `×${int.innerText}`;
        }
        else if ((int.innerText === "(" || int.innerText === ")") && (input.innerText.charAt(input.innerText.length - 1).match(/\d|\./g)) ||
            input.innerText.length == 0) {
            if (int.innerText === "(" &&
                input.innerText.charAt(input.innerText.length - 1).match(/\d/g)) {
                input.innerHTML = input.innerHTML + `×${int.innerText}`;
            }
            else {
                input.innerHTML = input.innerHTML + int.innerText;
            };

        }
        else if (int.innerText.match(/\d|\)/g) || int.innerText === "(") {
            input.innerHTML = input.innerHTML + int.innerText;
        };
    } else if (int.innerText.match(/\d/g) && int.innerText !== "0"){
        document.getElementById(rootid).innerText = int.innerText;
        rootadded = !rootadded;
    }
}));
// clear screen.
clear.addEventListener('click', () => {
    for (i = 1; i <= rootid; i++) {
        input.removeChild(document.getElementById(i))
    };
    input.innerText = "";
    output.value = 0;
    rootid = 0;
    rootadded = false;
});
// delete one input at a time.
BckSpc.addEventListener('click', () => {
    if (input.innerText.charAt(input.innerText.length - 2) === "√") {
        input.removeChild(document.getElementById(rootid));
        rootid -= 1;
        rootadded = false;
        input.innerHTML = input.innerHTML.slice(0, -2);
    } else if (input.innerText.charAt(input.innerText.length - 3).match(/o|i|a/g)) {
        input.innerHTML = input.innerHTML.slice(0, -4);

    } else if (input.innerText.charAt(input.innerText.length - 1).match(/s/g)) {
        input.innerHTML = input.innerHTML.slice(0, -3);

    } else {
        input.innerHTML = input.innerHTML.slice(0, -1);
    };
});
// validating user input of triganometrics before displaying it.
triganometrics.forEach(op => op.addEventListener('click', function () {
    if (!rootadded) {
        if (input.innerText.charAt(input.innerText.length - 1).match(/\d/g) ||
            input.innerText.charAt(input.innerText.length - 1) === ")" ||
            validate.constant(input.innerText.slice(input.innerText.length - 3, input.innerText.length))) {
            input.innerHTML = input.innerHTML + `×${op.id}`;
        }
        else if (input.innerText.charAt(input.innerText.length - 1) !== ".") {
            input.innerHTML = input.innerHTML + op.id;
        };
    };
}));
// validating root input before displaying it.
root.addEventListener('click', () => {
    if (!rootadded && input.innerText.charAt(input.innerText.length -1) !== ".") {
        rootadded = true;
        let power = document.createElement('sup');
        power.style.color = 'rgb(0, 0, 61)';
        rootid += 1;
        power.id = rootid;
        if (input.innerText.charAt(input.innerText.length - 1) !== ".") {
            if (input.innerText.charAt(input.innerText.length - 1).match(/\d/g) ||
                input.innerText.charAt(input.innerText.length - 1) === ")" ||
                validate.constant(input.innerText.slice(input.innerText.length - 3, input.innerText.length))) {
                input.innerHTML = input.innerHTML + '×';
                input.appendChild(power);
                input.innerHTML = input.innerHTML + '√(';
            }
            else {
                input.appendChild(power);
                input.innerHTML = input.innerHTML + "√(";
            };
        };
    };
});
// validating power input before displaying it.
pwr.addEventListener('click', function () {
    if (!rootadded) {
        if (!(validate.operation(input.innerText.charAt(input.innerText.length - 1))) &&
            input.innerText.charAt(input.innerText.length - 1) !== "." &&
            input.innerText.charAt(input.innerText.length - 1) !== "(") {
            input.innerHTML = input.innerHTML + pwr.id;
        };
    };
});
// validating "." input before displaying it.
dot.addEventListener('click', () => {
    if (!rootadded) {
        if (input.innerText.charAt(input.innerText.length - 1).match(/\d/g)) {
            input.innerHTML = input.innerHTML + dot.id;
        } else if(input.innerText.length === 0 ){
            input.innerHTML = `0.`
        };
    };
});
// handling the input string and find the result and display it.
equal.addEventListener("click", () => {
    equation = input.innerText;
    for (ele = 0; ele < equation.length; ele++) {/* if there are brackets they will handeled here and send the innerstring 
    to analyze.simplify and if brackets were of root or triganometric operation, they will be sent to solve right away */
        if (equation.charAt(ele) === ')') {
            for (c = ele; c >= 0; c--) {
                if (equation.charAt(c) === '(') {
                    if (equation.charAt(c - 1) === '√') {
                        innerEquat = solve.root(analyze.simplify(equation.slice(c + 1, ele)), equation.charAt(c - 2));
                        equation = equation.replace(equation.slice(c - 2, ele + 1), innerEquat);
                        ele = 0;
                        break;
                    }
                    else if (equation.slice(c - 3, c) === 'cos') {
                        innerEquat = solve.cos(analyze.simplify(equation.slice(c + 1, ele)))
                        equation = equation.replace(equation.slice(c - 3, ele + 1), innerEquat);
                        ele = 0;
                        break;
                    }
                    else if (equation.slice(c - 3, c) === 'sin') {
                        equation = equation.replace(equation.slice(c - 3, ele + 1), solve.sin(analyze.simplify(equation.slice(c + 1, ele))));
                        ele = 0;
                        break;
                    }
                    else if (equation.slice(c - 3, c) === 'tan') {
                        equation = equation.replace(equation.slice(c - 3, ele + 1), solve.tan(analyze.simplify(equation.slice(c + 1, ele))));
                        ele = 0;
                        break;
                    }
                    else {
                        equation = equation.replace(equation.slice(c, ele + 1), analyze.simplify(equation.slice(c + 1, ele)));
                        ele = 0;
                        break;
                    };
                };
            };

        };
    };
    // if input string does not have brackets
    equation = analyze.simplify(equation);
    if (!isNaN(equation)) {
        Ans = equation;
        output.innerText = Ans;
    }
    else {
        output.innerText = "Err";
    };
});
