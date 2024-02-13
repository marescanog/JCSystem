import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header';
import DisplayTotal from './components/DisplayTotal';
import decor from './images/Decor.png';
import Terminal from './components/Terminal';
import CashButtons from './components/CashButtons';

const App = () => {
 
  const [selectedNums, setSelectedNums] = useState([]);
  const [cashValue, setCashValue] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [randState, setRandState] = useState(Array(20).fill(false));

  const addNum = (num, row, col)=>{
    let indx = selectedNums.findIndex(arrNum=>{return arrNum == num});
    if(indx < 0){
      // Check if there are 5 numbers
      if(selectedNums.length < 5){
        selectedNums.push(num);
        setSelectedNums([...selectedNums]);
        return true;
      } else {
        alert("You have the maximum amount of numbers picked.");
        return false;
      }
    } else {
      // Toggle if it has already been added
      selectedNums.splice(indx, 1);
      setSelectedNums([...selectedNums]);
      return true;
    }
  }

  const validateAddCashAmount = (_callback = ()=>{}, v)=> {
    if(selectedNums.length < 5){
      alert("Please select 5 numbers before selecting a cash value");
    } else {
      _callback(v);
    }
  }

  const validateCashOut = (__callback)=> {
    let isValid = true;

    if(selectedNums.length < 5){
      isValid = false;
      alert("Please select 5 numbers before cashing out");
    } 

    if(isValid && cashValue == 0){
      isValid = false;
      alert("Please select a cash value before cashing out");
    }

    if(isValid){
      alert("You have cashed out");
      __callback();
    }
  }

  const clearTerminal = () => {
    setCashValue(0);
    selectedNums.forEach(num=>{
      randState[num-1] = false;
    })
    setRandState([...randState]);
    selectedNums.splice(0,selectedNums.length); 
    setSelectedNums([...selectedNums])
  }

  const getRandNum =(min ,max)=>{
    return Math.random() * (+max - +min) + +min;
  }

  const clearThenExecute = (__callback) => {
    clearTerminal();
    __callback();
  } 

  const getRandomNumbers = (numbersToget = 5) => {
    for(let x = 0; x < numbersToget; x++){
      var randNum = Math.floor(getRandNum(1, 21));
      while( selectedNums.findIndex(arrNum=>{return arrNum == randNum}) >= 0 ){
        randNum = Math.floor(getRandNum(1, 21));
      }
      addNum(randNum, Math.floor((randNum-1)/6), (randNum-1)%6);
      randState[randNum-1] = true;
      setRandState([...randState]);
    }
  }

  useEffect(()=>{
    clearTerminal();
  }, [refresh]);

  return (
    <div className={"whole_section"}>
      <Header title={"WHE WHE on D'Avenue"}/>
      <main className="main_section">
        <div className="left_section">
          <div>
            <img src={decor} alt="WHE WHE Logo" className={"image_style"}/>
          </div>
          <CashButtons funcX={(v)=>{validateAddCashAmount((v)=>{setCashValue(prevValue => prevValue + v); }, v)}}/>
        </div>
        <div className="center_section">          
          <Terminal  funcX={(num)=>{return addNum(num)}} 
            cashFuncX={()=>{validateCashOut(()=>{ setRefresh(prev => !prev);})}} 
            clearFuncX={()=>{setRefresh(prev => !prev);}} 
            clearState={refresh}
            randState={randState}
          />

          <button className={'btn-rand'} onClick={()=>{
            clearThenExecute(()=>{getRandomNumbers();});
          }}>GET 5 NEW RANDOM NUMBERS</button>         

          {selectedNums.length != 0 && selectedNums.length != 5 &&
            <button className={'btn-rand'} onClick={()=>{
              if(selectedNums.length == 5){
                alert("You already have selected 5 numbers");
              } else {
                getRandomNumbers(5-selectedNums.length);
              }
            }}>DRAW NEXT {5-selectedNums.length} NUMBER{(5-selectedNums.length)>=2?'S':''}</button>
          }

        </div>
        <div className="right_section">
          <DisplayTotal numbersList={selectedNums} total={cashValue} clearState={refresh}/>
        </div>
      </main>
    </div>
  )
}

export default App

