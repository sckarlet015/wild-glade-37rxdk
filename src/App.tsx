import React, { useState } from 'react';

const App = () => {
  const [state, setState] = useState({
    theme: 'light',
    mode: 'basic',
    expression: '',
    result: '',
  });

  const [history, setHistory] = useState<{ expression: string; result: any }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Nuevo estado para controlar el modal

  const handleStateChange = (key: string, value: string) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleKeyPress = (key: string) => {
    if (key === 'C') {
      setState({ ...state, expression: '', result: '' });
    } else if (key === 'DE') {
      setState({ ...state, expression: state.expression.slice(0, -1) });
    } else if (key === '=') {
      try {
        const result = eval(state.expression);
        setState({ ...state, result });
        setHistory([...history, { expression: state.expression, result }]);
      } catch (error) {
        setState({ ...state, result: 'Error' });
      }
    } else {
      setState({ ...state, expression: state.expression + key });
    }
  };

  const handleDeleteLast = () => {
    setState({ ...state, expression: state.expression.slice(0, -1) }); // Eliminar el último número
  };

  const handleScientificKeyPress = (key: string) => {
    const scientificFunctions: Record<string, string> = {
      sin: 'Math.sin',
      cos: 'Math.cos',
      tan: 'Math.tan',
      log: 'Math.log',
      sqrt: 'Math.sqrt',
      pow: 'Math.pow',
      exp: 'Math.exp',
      abs: 'Math.abs',
      ceil: 'Math.ceil',
      floor: 'Math.floor',
      round: 'Math.round',
      pi: 'Math.PI',
      e: 'Math.E',
    };

    if (scientificFunctions[key]) {
      setState({
        ...state,
        expression: `${scientificFunctions[key]}(${state.expression})`,
      });
    } else {
      setState({ ...state, expression: state.expression + key });
    }
  };

  const toggleHistory = () => setIsModalOpen(!isModalOpen);  // Cambiar para abrir/cerrar el modal

  const renderBasicButtons = () => {
    const basicButtons = [
      ['C', 'DE', '(', ')', '/'],
      ['7', '8', '9', '*'],
      ['4', '5', '6', '-'],
      ['1', '2', '3', '+'],
      ['0', '.', '=', '%'],
    ];

    return basicButtons.map((row, rowIndex) => (
      <div key={rowIndex} className="button-row">
        {row.map((button) => (
          <button
            key={button}
            onClick={() => handleKeyPress(button)}
            className={`button ${button === 'C' ? 'btn-clear' : button === '=' ? 'btn-equal' : 'btn-default'}`}
          >
            {button}
          </button>
        ))}
      </div>
    ));
  };

  const renderScientificButtons = () => {
    const scientificButtons = [
      ['sin', 'cos', 'tan', 'log'],
      ['sqrt', 'pow', 'exp', 'abs'],
      ['ceil', 'floor', 'round', 'pi'],
      ['e', '!', '%', 'mod'],
    ];

    return scientificButtons.map((row, rowIndex) => (
      <div key={rowIndex} className="button-row">
        {row.map((button) => (
          <button
            key={button}
            onClick={() => handleScientificKeyPress(button)}
            className="button btn-scientific"
          >
            {button}
          </button>
        ))}
      </div>
    ));
  };

  return (
    <div className={`calculator-container ${state.theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
      <div className="display-container">
        <p className="expression">{state.expression}</p>
        <p className="result">{state.result}</p>
      </div>

      <div className="theme-mode-container">
        <select
          value={state.theme}
          onChange={(e) => handleStateChange('theme', e.target.value)}
          className="theme-selector"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <select
          value={state.mode}
          onChange={(e) => handleStateChange('mode', e.target.value)}
          className="mode-selector"
        >
          <option value="basic">Basic</option>
          <option value="scientific">Scientific</option>
        </select>
      </div>

      <div className="buttons-container">
        {renderBasicButtons()}
        {state.mode === 'scientific' && (
          <div className="scientific-buttons">{renderScientificButtons()}</div>
        )}
      </div>

      <button onClick={toggleHistory} className="history-toggle-btn">
        {isModalOpen ? 'Hide History' : 'Show History'}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleHistory}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={toggleHistory}>X</button>
            <h2>History</h2>
            <div className="history-container">
              {history.map((item, index) => (
                <div key={index} className="history-item">
                  <p>
                    {item.expression} = {item.result}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
