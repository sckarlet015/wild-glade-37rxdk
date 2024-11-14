import React, { useState } from 'react';
import { Heart } from "lucide-react";

const App = () => {
  const [theme, setTheme] = useState('light');
  const [mode, setMode] = useState('basic');
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(true);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const handleKeyPress = (key) => {
    if (key === 'C') {
      setExpression('');
      setResult('');
    } else if (key === '=') {
      try {
        const result = eval(expression);
        setResult(result);
        setHistory([...history, { expression, result }]);
      } catch (error) {
        setResult('Error');
      }
    } else {
      setExpression(expression + key);
    }
  };

  const handleScientificKeyPress = (key) => {
    if (key === 'sin') {
      setExpression(`Math.sin(${expression})`);
    } else if (key === 'cos') {
      setExpression(`Math.cos(${expression})`);
    } else if (key === 'tan') {
      setExpression(`Math.tan(${expression})`);
    } else if (key === 'log') {
      setExpression(`Math.log(${expression})`);
    } else if (key === 'sqrt') {
      setExpression(`Math.sqrt(${expression})`);
    } else if (key === 'pow') {
      setExpression(`Math.pow(${expression}, 2)`);
    } else if (key === 'exp') {
      setExpression(`Math.exp(${expression})`);
    } else if (key === 'abs') {
      setExpression(`Math.abs(${expression})`);
    } else if (key === 'ceil') {
      setExpression(`Math.ceil(${expression})`);
    } else if (key === 'floor') {
      setExpression(`Math.floor(${expression})`);
    } else if (key === 'round') {
      setExpression(`Math.round(${expression})`);
    }
  };

  const handleToggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className={`flex flex-col items-center justify-center h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'}`}>
      <div className="w-full p-4 text-2xl border-b border-gray-400">
        <p>Expression: {expression}</p>
        <p>Result: {result}</p>
      </div>
      <div className="flex flex-row justify-between w-full p-4">
        <select value={theme} onChange={handleThemeChange} className="mr-4">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <select value={mode} onChange={handleModeChange}>
          <option value="basic">Basic</option>
          <option value="scientific">Scientific</option>
        </select>
      </div>
      <div className="flex flex-row flex-wrap justify-center w-full p-4">
        {mode === 'basic' ? (
          <>
            <button onClick={() => handleKeyPress('7')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">7</button>
            <button onClick={() => handleKeyPress('8')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">8</button>
            <button onClick={() => handleKeyPress('9')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">9</button>
            <button onClick={() => handleKeyPress('/')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">/</button>
            <button onClick={() => handleKeyPress('4')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">4</button>
            <button onClick={() => handleKeyPress('5')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">5</button>
            <button onClick={() => handleKeyPress('6')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">6</button>
            <button onClick={() => handleKeyPress('*')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">*</button>
            <button onClick={() => handleKeyPress('1')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">1</button>
            <button onClick={() => handleKeyPress('2')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">2</button>
            <button onClick={() => handleKeyPress('3')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">3</button>
            <button onClick={() => handleKeyPress('-')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">-</button>
            <button onClick={() => handleKeyPress('0')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">0</button>
            <button onClick={() => handleKeyPress('+')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">+</button>
            <button onClick={() => handleKeyPress('=')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/2">=</button>
          </>
        ) : (
          <>
            <button onClick={() => handleScientificKeyPress('sin')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">sin</button>
            <button onClick={() => handleScientificKeyPress('cos')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">cos</button>
            <button onClick={() => handleScientificKeyPress('tan')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">tan</button>
            <button onClick={() => handleScientificKeyPress('log')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">log</button>
            <button onClick={() => handleScientificKeyPress('sqrt')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">sqrt</button>
            <button onClick={() => handleScientificKeyPress('pow')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">x^2</button>
            <button onClick={() => handleScientificKeyPress('exp')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">exp</button>
            <button onClick={() => handleScientificKeyPress('abs')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">abs</button>
            <button onClick={() => handleScientificKeyPress('ceil')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">ceil</button>
            <button onClick={() => handleScientificKeyPress('floor')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">floor</button>
            <button onClick={() => handleScientificKeyPress('round')} className="m-2 p-4 text-2xl border border-gray-400 rounded w-1/4">round</button>
          </>
        )}
      </div>
      <button onClick={handleToggleHistory} className="mb-4 p-4 text-2xl border border-gray-400 rounded">{showHistory ? 'Hide History' : 'Show History'}</button>
      {showHistory && (
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item.expression} = {item.result}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;