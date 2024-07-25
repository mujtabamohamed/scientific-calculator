import React from "react";

function KeysWindow({ handleButton }) {

    const sciKeys = [
        "sin", "cos", 
        "ln", "log", 
        "tan", "π", 
        "e", "^", 
        "!", "√"
    ];

    const basicKeys = [
       "AC", "(", ")", "/",
       "7","8", "9", "*", 
       "4", "5", "6", "-", 
       "1", "2", "3", "+", 
       "DEL", "0", ".", "=",
    ];

    return (
        <div className="keysWindow">
        
            <div className="keys_scientific">
                {sciKeys.map((item, index) => (
                    <button 
                        key={index}
                        onClick={() => handleButton(item)}>
                        {item}
                    </button>   
                ))}
            </div>

            <div className="line"></div>

            <div className="keys_basic">
                {basicKeys.map((item, index) => (
                    <button 
                        key={index}
                        className={`${item >= "0" && item <= "9" ? "number" : ""} ${item === "=" && "equal"}`}
                        onClick={() => handleButton(item)}>
                        {item}
                    </button>
                ))}
            </div>

        </div>
    );
}

export default KeysWindow;