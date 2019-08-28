import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


export interface CalculatorProps { }

const NumberButton = styled.input`
  background-color: #ddd;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(100,100,100,1);
  width: 60px;
  height: 60px;
  margin: 7px;
  font-weight: bold;
  color: #555;
  :hover {
    box-shadow: 0 1px 2px rgba(100,100,100,1);
  }
  :active {
    box-shadow: inset 0 1px 2px rgba(100,100,100,1)
  }
  `;

const NumberButtonZero = styled(NumberButton)`
  width: 130px;
  border-radius: 30px
  `;

const AritmeticButton = styled(NumberButton)`
  background-color: #bbb;
  `;
const ACButton = styled(NumberButton)`
  background-color: orange;
  color: white;
  `;
const CalculatorContainer = styled.div`
  width: 320px;
  background: #eee;
  border-radius: 40px;
  box-shadow: 0 3px 3px rgba(100,100,100,1);
  padding: 15px 15px 15px 27px;
  `;
const InputWindows = styled.input`
  font-weight: bold;
  background: black;
  color: white;
  margin: 7px;
  box-shadow: inset 0 1px 2px rgba(255,255,255,1);
  border-radius: 30px;
  height: 60px;
  width: 280px;
  padding: 15px 20px ;
  text-align: right;
`;


const Calculator: React.FC<CalculatorProps> = (props) => {
  const [result, setResult] = useState("");
  // 0: waiting for first number
  // 1: got a method of calculation
  //const [calculationStage, setCalculationStage] = useState(0);
  const [firstNumber, setFirstNumber] = useState("0");
  const [secondNumber, setSecondNumber] = useState("0");
  const [calculationType, setCalculationType] = useState("");

  function addNumberToResult(e: any) {
    if (calculationType === "") {
      let res = firstNumber;
      let input = e.target.value;

      if (res.length > 11) return;
      if (result.includes(".") && input === ".") return;
      if (res === "0" && input === ".") {
        res += input;
      } else if (res === "0") {
        res = input;
      } else {
        res += input;
      }

      setFirstNumber(res);
      calculateResult();
    }
    if (calculationType != "") {
      let res = secondNumber;
      let input = e.target.value;

      if (res.length > 11) return;
      if (result.includes(".") && input === ".") return;
      if (res === "0" && input === ".") {
        res += input;
      } else if (res === "0") {
        res = input;
      } else {
        res += input;
      }
      setSecondNumber(res);
      setResult(res);
    }
  }

  useEffect(() => {
    calculateResult();

  }, [firstNumber])

  function calculateResult() {
    if (calculationType === "") {
      setResult(firstNumber);
    }
    if (calculationType != "") {
      setResult(firstNumber + calculationType);
    }
  }

  function doTheMath() {
    let num1: number = parseFloat(firstNumber);
    let num2: number = parseFloat(secondNumber)
    let res: number = 0;
    if (calculationType === "÷") res = num1 / num2;
    if (calculationType === "×") res = num1 * num2;
    if (calculationType === "-") res = num1 - num2;
    if (calculationType === "+") res = num1 + num2;
    setResult(res.toString());
    setFirstNumber(res.toString());
    setSecondNumber("");
    setCalculationType("");
  }

  function resetCalculator() {
    setResult("0");
    setFirstNumber("0");
    setSecondNumber("");
    setCalculationType("");
  }

  function arithmeticOperation(e: any) {
    let arithmetic = e.target.value;
    if (arithmetic === "±") {
      let value: number = -parseFloat(firstNumber);
      setResult(value.toString());
    } else {

      setCalculationType(arithmetic);
      setResult(firstNumber + arithmetic);
    }
  }

  return (
    <>
      <br /><h2>My super duper calculator</h2><p>Made this from scratch. Pretty on top, pragmatic behind the scenes.</p><br />
      <CalculatorContainer>

        <form className="">
          <div className="row">
            <div className="col-xs-1">
              <InputWindows className="" type="text" value={result} />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-1">
              <ACButton className="" type="button" value="AC" onClick={resetCalculator} />
              <NumberButton type="button" value="±" onClick={arithmeticOperation} />
              <NumberButton type="button" value="%" onClick={arithmeticOperation} />
              <AritmeticButton type="button" value="÷" onClick={arithmeticOperation} />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <NumberButton type="button" value="7" onClick={addNumberToResult} />
              <NumberButton type="button" value="8" onClick={addNumberToResult} />
              <NumberButton type="button" value="9" onClick={addNumberToResult} />
              <AritmeticButton type="button" value="×" onClick={arithmeticOperation} />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <NumberButton type="button" value="4" onClick={addNumberToResult} />
              <NumberButton type="button" value="5" onClick={addNumberToResult} />
              <NumberButton type="button" value="6" onClick={addNumberToResult} />
              <AritmeticButton type="button" value="-" onClick={arithmeticOperation} />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <NumberButton type="button" value="1" onClick={addNumberToResult} />
              <NumberButton type="button" value="2" onClick={addNumberToResult} />
              <NumberButton type="button" value="3" onClick={addNumberToResult} />
              <AritmeticButton type="button" value="+" onClick={arithmeticOperation} />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6">
              <NumberButtonZero type="button" value="0" onClick={addNumberToResult} />
            </div>

            <div className="col-xs-6">
              <NumberButton type="button" value="." onClick={addNumberToResult} />
              <NumberButton type="button" value="=" onClick={doTheMath} />
            </div>
          </div>
        </form>
      </CalculatorContainer>
    </>
  )
}

export default Calculator