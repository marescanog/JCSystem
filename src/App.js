import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header';
// import ButtonDisplay from './components/ButtonDisplay'; 
import DisplayTotal from './components/DisplayTotal';
import decor from './images/Decor.png';
// import cashButtonBG from './images/cashbutton.png';

import Terminal from './components/Terminal';
import CashButtons from './components/CashButtons';

const App = () => {

  const cashButtonStyles = [
    ["cashButton","cashButton"],
    ["cashButton","cashButton"]
  ];
  
  const [selectedNums, setSelectedNums] = useState([]);
  const [cashValue, setCashValue] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [randState, setRandState] = useState(Array(20).fill(false));

  // const cashButtons = [
  //   {
  //     id:"CB1",
  //     rowStyle:"default__rowStyle",
  //     buttonData:     [
  //       {text:"$1", value:1, funcX:()=>{validateAddCashAmount(()=>{setCashValue(prevValue => prevValue + 1); })},  id:"CBC1", buttonBackgroundImage: cashButtonBG, buttonBackgroundImageStyle:"cashButton_image_style", textStyle:"casht_btn_textStyle_1" },
  //       {text:"$5", value:5, funcX:()=>{validateAddCashAmount(()=>{setCashValue(prevValue => prevValue + 5); })},  id:"CBC2", buttonBackgroundImage: cashButtonBG, buttonBackgroundImageStyle:"cashButton_image_style", textStyle:"casht_btn_textStyle_2"},
  //     ]
  //   },
  //   {
  //     id:"CB2",
  //     rowStyle:"default__rowStyle",
  //     buttonData:     [
  //       {text:"$10", value:10, funcX:()=>{validateAddCashAmount(()=>{setCashValue(prevValue => prevValue + 10); })},  id:"CBC3", buttonBackgroundImage: cashButtonBG, buttonBackgroundImageStyle:"cashButton_image_style", textStyle:"casht_btn_textStyle"},
  //       {text:"$20", value:20, funcX:()=>{validateAddCashAmount(()=>{setCashValue(prevValue => prevValue + 20); })},  id:"CBC4",buttonBackgroundImage: cashButtonBG, buttonBackgroundImageStyle:"cashButton_image_style", textStyle:"casht_btn_textStyle"},
  //     ]
  //   }
  // ];

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

  useEffect(()=>{
    clearTerminal();
  }, [refresh]);

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

  return (
    <div className={"whole_section"}>
      <Header title={"WHE WHE on D'Avenue"}/>
      <main className="main_section">
        <div className="left_section">
          <div>
            <img src={decor} alt="WHE WHE Logo" className={"image_style"}/>
          </div>
          {/* <ButtonDisplay buttonList={cashButtons}  buttonStyles={cashButtonStyles} containerStyle={"default__containerStyle"}/> */}
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
          }}>Get 5 new Random Numbers</button>         

          <button className={'btn-rand'} onClick={()=>{
            if(selectedNums.length == 5){
              alert("You already have selected 5 numbers");
            } else {
              getRandomNumbers(5-selectedNums.length);
            }
          }}>Get Remaining {5-selectedNums.length} Random Number{(5-selectedNums.length)>=2?'s':''}</button>

        </div>
        <div className="right_section">
          <DisplayTotal numbersList={selectedNums} total={cashValue} clearState={refresh}/>
        </div>
      </main>
    </div>
  )
}

export default App

