import { useState } from 'react';
import CalcDebug from './calcDebug'
import './styles.css';
import {  
  CgClose       as Times,
  CgMathPlus    as Plus, 
  CgMathMinus   as Minus,
  CgMathDivide  as Divide,
  CgMathEqual   as Equal,
  CgMathPercent as Percent
}from 'react-icons/cg'

const Calculator = () => {

  // config
  const debug = true


  // assets
  const numberKeyboard  = [ '0','1','2','3','4','5','6','7','8','9']
  const operatorButtons = [
      { name: "Plus",     svg: <Plus/>},
      { name: "Minus",    svg:<Minus/>},
      { name: "Times",    svg:<Times/>},
      { name: "Divide",   svg:<Divide/>},
      { name: "Percent",  svg:<Percent/>} 
  ]


  // states
  const [screen, setScreen] = useState(0)
  const [currentValue, setCurrentValue] = useState("0")
  const [action, setAction] = useState(null)
  const [firstOpering, setFirstOpering] = useState(null)
  const [result, setResult] = useState(null)
  
  // functions
  function clearCurrentValue() { 
    setCurrentValue("0") 
  }

  function clearAction() { 
    setAction(null) 
  }

  function clearScreenAndCurrentValue() {
     setScreen(0); 
     setCurrentValue("0") 
  }

  function clearAll() {
    setAction(null);
    setResult(null);
    setFirstOpering(null)
    setScreen(0)
  }

  function setRes(res) {
    setResult(res)
    setFirstOpering(res)
    clearCurrentValue()
    setScreen(res)
  }
  function getFirstOpering(){
    setFirstOpering(currentValue);
    clearCurrentValue();
  }

  function calculate() {
    const a = parseFloat(firstOpering)
    const b = parseFloat(currentValue)
    var res
    switch (action) {
      case "Plus":
           res = a + b
           setRes(`${res}`)
        break;
      case "Minus":
           res = a - b
           setRes(`${res}`)
        break;
      case "Times":
           res = a * b
           setRes(`${res}`)
        break;
      case "Divide":
           res = a / b
           setRes(`${res}`)
        break;
      case "Percent":
           res = a % b
           setRes(`${res}`)
        break;
        
      default:
        break;
    }
  }

  //handlers
  function handleKey(key){
    const newCurrentValue = currentValue + key
    setCurrentValue(newCurrentValue)
    currentValue.indexOf('.') !== -1 ?  setScreen(newCurrentValue) :setScreen(parseInt(newCurrentValue)) 
  }
  function handleAcButton(){
    result?clearAll(): (currentValue !== "0" ? clearScreenAndCurrentValue(): (firstOpering? clearAll(): clearAction()))
  }
  function handleOperation(operation){
    setAction(operation)
    if(!firstOpering){
      getFirstOpering()
      setAction(operation)
    }else if(currentValue === "0"){
      setAction(operation)
    }else{
      calculate();
    }
    }
    function handleDot(){
      const newCurrentValue = 
        currentValue === "0" ? `0.` : currentValue.indexOf('.') === -1? parseInt(currentValue) + '.': currentValue
      setCurrentValue(newCurrentValue)
      setScreen(newCurrentValue)
    }


  return(
    <>
    <div className="Calculator">
   
    <div id="Screen">
      <span>
        {screen}
      </span>
    </div>
    <div className="AC">
      <button  className="AC" onClick={() => handleAcButton()}>
        AC
      </button>
    </div>
    <div className="Equal">
      <button onClick={() => calculate()}>
      <Equal/>
      </button>
    </div>
    {
      numberKeyboard.map( key =>(
        <div key={`${key}`} className={`_${key}`} >
          <button className="Key" onClick={(e) => handleKey(key)}>
            {key}
          </button>
        </div>
      ))
    }
   {
      operatorButtons.map( (key,index) =>(
        <div key={index} className={key.name} >
          <button className="Operation" onClick={(e) => handleOperation(key.name)}>
            {key.svg}
          </button> 
        </div>
      ))
    }
    <div className="_V">
      <button onClick={(e) => handleDot()}>
        ,
      </button>
    </div>
    </div>
        <CalcDebug debug={debug}
        firstOpering={firstOpering}         
        currentValue={currentValue}  
        action={action} 
        result={result}
         />
    </>
  );
}
export default Calculator;
