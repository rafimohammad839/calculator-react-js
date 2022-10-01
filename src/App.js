import React from 'react';
import { useEffect, useState } from 'react';
import "./App.css";

function App() {
  const [output, setOutput] = useState('0');
  const [miniOutput, setMiniOutput] = useState('0');

  const operators = ['/', '-', '+', '*', '.'];

  const handleClick = (e) => {
    let current = e.target.innerText;

    if (current === '=') {
      setOutput(miniOutput);
    } else if (current === 'DEL') {
      setOutput((prev) => {
        if (prev.length === 1) {
          return '0';
        } else if (prev === 'Infinity') {
          return '0';
        }
        return prev.slice(0, -1);
      })
    } else {
      setOutput((prev) => {
        if (prev === '0' && !operators.includes(current)) {
          return current;
        } else if (operators.includes(prev.at(-1)) && operators.includes(current)) {
          return prev;
        }
        return prev + current;
      });
    }
  }

  useEffect(() => {
    if (!isNaN(output[output.length - 1])) {
      setMiniOutput(eval(output).toString())
    }
  }, [output])
  
  const createDigits = () => {
    let digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(<button onClick={handleClick} key={i}>{i}</button>);
    }
    return digits;
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="output">
          <span>({miniOutput})</span> {output}
        </div>
        <div className="operators">
          <button onClick={handleClick}>/</button>
          <button onClick={handleClick}>*</button>
          <button onClick={handleClick}>-</button>
          <button onClick={handleClick}>+</button>
          <button onClick={handleClick}>DEL</button>
        </div>

        <div className="keys">
          { createDigits() }
          <button onClick={handleClick}>0</button>
          <button onClick={handleClick}>.</button>
          <button onClick={handleClick}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
