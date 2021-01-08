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
  const initialState = {
    screen: 0,
    currentValue: "",
    action: null,
    firstOpering: null,
    result: null
  }
  
  const [state,setState] = useState(initialState)

  // functions
  function calculate() {
    const a = parseFloat(state.firstOpering)
    const b = parseFloat(state.currentValue)
    var res
    const actions = {
        Plus:() => {
           res = a + b
           setState({...state, result: `${res}`, firstOpering: `${res}`, currentValue:"", screen: `${res}`})
            },
        Minus:() => {
           res = a + b
           setState({...state, result: `${res}`, firstOpering: `${res}`, currentValue:"", screen: `${res}`})
            },
        Times:() => {
           res = a + b
           setState({...state, result: `${res}`, firstOpering: `${res}`, currentValue:"", screen: `${res}`})
            },
        Divide:() => {
           res = a + b
           setState({...state, result: `${res}`, firstOpering: `${res}`, currentValue:"", screen: `${res}`})
            },
        Percent:() => {
           res = a + b
           setState({...state, result: `${res}`, firstOpering: `${res}`, currentValue:"", screen: `${res}`})
            },
      }
      actions[state.action]()
  }

    

  //handlers
  function handleKey(key){
    const newCurrentValue = state.currentValue + key
    state.currentValue.indexOf('.') !== -1 ?  setState({...state, currentValue: newCurrentValue, screen: newCurrentValue}) : setState({...state,currentValue: newCurrentValue, screen: parseInt(newCurrentValue)}) 
  }

  function handleAcButton(){
    state.result? setState(initialState): (state.currentValue !== "" ? setState({...state, screen:0, currentValue:""}): (state.firstOpering? setState(initialState): setState({...state, action:null})))
  }

  function handleOperation(operation){
    setState({...state, action:operation})
    !state.firstOpering? setState({...state, action: operation, firstOpering: state.currentValue, currentValue: ""}): (state.currentValue === "0" || state.currentValue === "")? setState({...state, action: operation}) : calculate()
  }
    function handleDot(){
      const newCurrentValue = 
        state.currentValue === "0" || state.currentValue === "" ? `0.` : state.currentValue.indexOf('.') === -1? parseInt(state.currentValue) + '.': state.currentValue
        setState({...state, currentValue: newCurrentValue, screen: newCurrentValue})
    }


  return(
    <>
    <div className="Calculator">
   
    <div id="Screen">
      <span>
        {state.screen}
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
        firstOpering={state.firstOpering}         
        currentValue={state.currentValue}  
        action={state.action} 
        result={state.result}
         />
    </>
  );
}
export default Calculator;
