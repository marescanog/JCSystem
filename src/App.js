import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header';
import DisplayTotal from './components/DisplayTotal';
import decor from './images/Decor.png';
import Terminal from './components/Terminal';
import CashButtons from './components/CashButtons';
import Swal from 'sweetalert2';

const App = () => {
 
  const [selectedNums, setSelectedNums] = useState([]);
  const [cashValue, setCashValue] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [randState, setRandState] = useState(Array(20).fill(false));

  const addNum = (num)=>{
    let indx = selectedNums.findIndex(arrNum=>{return arrNum == num});
    if(indx < 0){
      // Check if there are 5 numbers
      if(selectedNums.length < 5){
        selectedNums.push(num);
        setSelectedNums([...selectedNums]);
        randState[num-1] = true;
        setRandState([...randState]);
        return true;
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'You have the maximum amount of numbers picked.',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        return false;
      }
    } else {
      // Toggle if it has already been added
      selectedNums.splice(indx, 1);
      setSelectedNums([...selectedNums]);
      randState[num-1] = false;
      setRandState([...randState]);
      return true;
    }
  }

  const validateAddCashAmount = (_callback = ()=>{}, v)=> {
    if(selectedNums.length < 5){
      Swal.fire({
        title: 'Cannot Select Cash Value Yet',
        text: 'Please select 5 numbers before selecting a cash value.',
        icon: 'info',
        confirmButtonText: 'OK'
      });
    } else {
      _callback(v);
    }
  }

  const validateCashOut = (__callback)=> {
    let isValid = true;

    if(selectedNums.length < 5){
      isValid = false;
      Swal.fire({
        title: 'Cannot Cash Out Yet',
        text: 'Please select 5 numbers before cashing out.',
        icon: 'info',
        confirmButtonText: 'OK'
      });
    } 

    if(isValid && cashValue == 0){
      isValid = false;
      Swal.fire({
        title: 'Cannot Cash Out Yet',
        text: 'Please select a cash value to cash out.',
        icon: 'info',
        confirmButtonText: 'OK'
      });
    }

    if(isValid){
      Swal.fire({
        title: "You Have Cashed Out a Ticket!",
        width: 600,
        padding: "3em",
        color: "#162a62",
        background: "#fff url(/images/trees.png)",
        html:`<div><p><b>Your Numbers:</b></p><p>${selectedNums[0]}, ${selectedNums[1]}, ${selectedNums[2]}, ${selectedNums[3]}, ${selectedNums[4]}</p><p><b>Total Cashout: </b>$${cashValue.toFixed(2)}</p></div>`,
        backdrop: `
          rgba(0,0,123,0.4)
          left top
          no-repeat
        `
      });

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

