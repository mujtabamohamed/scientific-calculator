import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import DisplayWindow from "./DisplayWindow";
import KeysWindow from "./KeysWindow";

function Calculator() {
    const [expression, setExpression] = useState("");
    const [displayEXP, setDisplayEXP] = useState("");
    const [result, setResult] = useState("0");

    const sciFunc = {
        sin: "sin",
        cos: "cos",
        tan: "tan",
        ln: "log",
        log: "log10",
        π: "pi",
        e: "e",
        "^": "^",
        "√": "sqrt",
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            const { key } = event;

            if (key >= '0' && key <= '9') {
                handleButton(key);

            } else if (key === 'Enter' || key === '=') {
                handleButton('=');

            } else if (key === 'Backspace') {
                handleButton('DEL');

            } else if (key === 'Escape') {
                handleButton('AC');

            } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '.' || key === '(' || key === ')') {
                handleButton(key);

            } else if (key === 's') {
                handleButton('sin');

            } else if (key === 'c') {
                handleButton('cos');

            } else if (key === 't') {
                handleButton('tan');

            } else if (key === 'l') {
                handleButton('ln');

            } else if (key === 'L') {
                handleButton('log');

            } else if (key === 'p') {
                handleButton('π');

            } else if (key === 'e') {
                handleButton('e');

            } else if (key === '^') {
                handleButton('^');

            } else if (key === 'r') {
                handleButton('√');

            } else if (key === '!') {
                handleButton('!');
            }
        };

        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [expression, displayEXP]);

    function calcResult() {
        if (expression.length !== 0) {

            try {
                let compute = evaluate(expression);
                compute = parseFloat(compute.toFixed(4));
                setResult(compute);

            } catch (error) {
                setResult("Error");
            }

        } else {
            setResult("An Error Occured!");
        }
    }

    function handleButton(value) {

        if (value === "AC") {
            setExpression("");
            setDisplayEXP("");
            setResult("0");

        } else if (value === "=") {
            calcResult();

        } else if (value === "DEL") {
            setDisplayEXP(displayEXP.slice(0, -1));
            setExpression(expression.slice(0, -1));

        } else if (Object.prototype.hasOwnProperty.call(sciFunc, value)) {
            setDisplayEXP(displayEXP + value);
            setExpression(expression + sciFunc[value]);

        } else if (value === "!") {
            const lastNum = extractLastNum(expression);

            if (lastNum != null) {
                const num = parseFloat(lastNum);
                setDisplayEXP(displayEXP + value);
                setExpression(expression.replace(lastNum, factorial(num)));

            }
        } else {
            setExpression(expression + value);
            setDisplayEXP(displayEXP + value);
        }
    }

    function factorial(n) {
        let result = 1;
        for (let i = 1; i <= n; i++) result *= i;
        return result;
    }

    function extractLastNum(exp) {
        const numbers = exp.match(/\d+/g);
        return numbers ? numbers[numbers.length - 1] : null;
    }

    return (
        <div className="calculator">
            <DisplayWindow expression={displayEXP} result={result} />
            <KeysWindow handleButton={handleButton} />
        </div>
    );
}

export default Calculator;