import React from "react";

function DisplayWindow({ expression, result }) {
    return (
    <div className="displayWindow">
        <p className="expression">{expression}</p>
        <p className="result">{result}</p>
    </div>
    );
}

export default DisplayWindow;