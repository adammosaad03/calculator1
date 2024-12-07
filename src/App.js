import './App.css';
import { useState } from 'react';
const Calculator = () => {
const [buttons, setButtons] = useState([{
  name: 'equal',
  symbol: '=',
  id: 'equals'

  
},{
name: 'zero',
symbol: '0',
id: 'zero'


},{
name: 'one',
symbol: '1',
id: 'one'


},{
name: 'two',
symbol: '2',
id: 'two'


},{
name: 'three',
symbol: '3',
id: 'three'


},{
name: 'four',
symbol: '4',
id: 'four'


},{
name: 'five',
symbol: '5',
id: 'five'


},{
name: 'six',
symbol: '6',
id: 'six'


},{
name: 'seven',
symbol: '7',
id: 'seven'


},{
name: 'eight',
symbol: '8',
id: 'eight'


},{
name: 'nine',
symbol: '9',
id: 'nine'


}, {
name: 'add',
symbol: '+',
id: 'add'


},{
name: 'subtract',
symbol: '-',
id: 'subtract'


},{
name: 'multiply',
symbol: 'x',
id: 'multiply'


},{
name: 'divide',
symbol: '/',
id: 'divide'


},{
name: 'decimal',
symbol: '.',
id: 'decimal'


},{
name: 'clear',
symbol: 'CE',
id: 'clear'


},{
name: 'enter',
symbol: 'ENT',
id: 'enter'}]) 


const [displayValue, setDisplayValue] = useState('0');
const [lastResult, setLastResult] = useState(null);
const [isNewCalculation, setIsNewCalculation] = useState(false);
const handleClick = (event) => {
  const buttonName = event.target.name;
  const buttonValue = event.target.value;

  switch (buttonName) {
    case 'clear':
      setDisplayValue('0');
      setLastResult(null);
      setIsNewCalculation(false);
      break;

    case 'equal':
      try {
        let expression = displayValue.replace(/x/g, '*'); // Replace 'x' with '*'

        // Handle consecutive operators
        expression = expression.replace(/([+\-*/]){2,}/g, (match) => {
          const lastOperator = match[match.length - 1];
          if (lastOperator === '-' && ['*', '/'].includes(match[match.length - 2])) {
            // Preserve negative sign after multiplication/division
            return match[match.length - 2] + lastOperator;
          }
          return lastOperator; // Retain only the last operator
        });

        // Remove trailing operators (e.g., "5 +" -> "5")
        expression = expression.replace(/[+\-*/]+$/, '');

        // Check for division by zero
        if (/\/0(?!\d)/.test(expression)) {
          setDisplayValue('Error');
          return;
        }

        // Evaluate the expression
        const result = Function('"use strict";return (' + expression + ')')();
        const finalResult = String(Number(result).toPrecision(12)).replace(/\.?0+$/, '');

        setDisplayValue(finalResult);
        setLastResult(finalResult);
        setIsNewCalculation(true);
      } catch (error) {
        console.error('Calculation error:', error);
        setDisplayValue('Error');
      }
      break;

    case 'decimal':
      if (isNewCalculation) {
        setDisplayValue('0.');
        setIsNewCalculation(false);
      } else {
        const numbers = displayValue.split(/[+\-x/]/);
        const lastNumber = numbers[numbers.length - 1];
        if (!lastNumber.includes('.')) {
          setDisplayValue(displayValue + '.');
        }
      }
      break;

    case 'divide':
    case 'multiply':
    case 'add':
    case 'subtract':
      if (displayValue === 'Error') {
        setDisplayValue('0');
        return;
      }

      // Start new calculation after '='
      if (isNewCalculation) {
        setDisplayValue((lastResult ? lastResult : '0') + buttonValue);
        setIsNewCalculation(false);
        return;
      }

      const lastChar = displayValue.slice(-1);

      // Handle consecutive operators
      if ('+-x/'.includes(lastChar)) {
        setDisplayValue(displayValue + buttonValue); // Append operator to allow "1 +-x"
      } else {
        setDisplayValue(displayValue + buttonValue); // Add operator normally
      }
      break;

    default: // numbers
      if (displayValue === '0' || isNewCalculation) {
        setDisplayValue(buttonValue);
        setIsNewCalculation(false);
      } else {
        setDisplayValue(displayValue + buttonValue);
      }
      break;
  }
};









          return ( 
            <div id="cover" onClick={handleClick}>
              <div id="display">{displayValue}</div>
              {buttons.map((obj) =>( 
                
                  <button className="calc" id={obj.id} key={obj.id} name={obj.name} value={obj.symbol} onClick={handleClick}> 
              {obj.symbol}
              </button>
             
            ))}
              
            </div>

)
}

export default Calculator;
