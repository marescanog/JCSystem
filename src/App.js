import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header';
import ButtonDisplay from './components/ButtonDisplay'; 
import DisplayTotal from './components/DisplayTotal';
const App = () => {

  const [selectedNums, setSelectedNums] = useState([]);
  const [cashValue, setCashValue] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [cashButtonStyles, setCashButtonStyles] = useState([
    ["cashButton","cashButton"],
    ["cashButton","cashButton"]
  ]);
  const [terminalButtonStyles, setTerminalButtonStyles] = useState([
    ["terminalNumberButton", "terminalNumberButton", "terminalNumberButton", "terminalNumberButton", "terminalNumberButton", "terminalNumberButton"],
    ["terminalNumberButton", "terminalNumberButton", "terminalNumberButton", "terminalNumberButton", "terminalNumberButton", "terminalNumberButton"],
    ["terminalNumberButton", "terminalNumberButton", "terminalNumberButton", "terminalNumberButton", "terminalNumberButton", "terminalNumberButton"],
    ["terminalNumberButton", "terminalNumberButton","terminalTextButton","terminalTextButton"]
  ]);

  const cashButtons = [
    {
      id:"CB1",
      rowStyle:"default__rowStyle",
      buttonData:     [
        {text:"$1", value:1, funcX:()=>{validateAddCashAmount(()=>{setCashValue(prevValue => prevValue + 1); })},  id:"CBC1", },
        {text:"$5", value:5, funcX:()=>{validateAddCashAmount(()=>{setCashValue(prevValue => prevValue + 5); })},  id:"CBC2",},
      ]
    },
    {
      id:"CB2",
      rowStyle:"default__rowStyle",
      buttonData:     [
        {text:"$10", value:10, funcX:()=>{validateAddCashAmount(()=>{setCashValue(prevValue => prevValue + 10); })},  id:"CBC3", },
        {text:"$20", value:20, funcX:()=>{validateAddCashAmount(()=>{setCashValue(prevValue => prevValue + 20); })},  id:"CBC4",},
      ]
    }
  ];

  const  terminalButtons = [
    {
      id:"TB1",
      rowStyle:"default__rowStyle",
      buttonData: [
        {text:"1", value:1, funcX:()=>{addNum(1, 0, 0, selectedNums)} , id:"TBC1",},
        {text:"2", value:2, funcX:()=>{addNum(2, 0, 1, selectedNums)} , id:"TBC2", },
        {text:"3", value:3, funcX:()=>{addNum(3, 0, 2, selectedNums)} , id:"TBC3", },
        {text:"4", value:4, funcX:()=>{addNum(4, 0, 3, selectedNums)} , id:"TBC4", },
        {text:"5", value:5, funcX:()=>{addNum(5, 0, 4, selectedNums)} , id:"TBC5", },
        {text:"6", value:6, funcX:()=>{addNum(6, 0, 5, selectedNums)} , id:"TBC6", },
      ]
    },
    {
      id:"TB2",
      rowStyle:"default__rowStyle",
      buttonData:         [
        {text:"7", value:7, funcX:()=>{addNum(7, 1, 0, selectedNums)} , id:"TBC7", },
        {text:"8", value:8, funcX:()=>{addNum(8, 1, 1, selectedNums)} , id:"TBC8", },
        {text:"9", value:9, funcX:()=>{addNum(9, 1, 2, selectedNums)} , id:"TBC9", },
        {text:"10", value:10, funcX:()=>{addNum(10, 1, 3, selectedNums)} , id:"TBC10", },
        {text:"11", value:11, funcX:()=>{addNum(11, 1, 4, selectedNums)} , id:"TBC11", },
        {text:"12", value:12, funcX:()=>{addNum(12, 1, 5, selectedNums)} , id:"TBC12", },
      ]
    },
    {
      id:"TB3",
      rowStyle:"default__rowStyle",
      buttonData:         [
        {text:"13", value:13, funcX:()=>{addNum(13, 2, 0, selectedNums)} , id:"TBC13", },
        {text:"14", value:14, funcX:()=>{addNum(14, 2, 1, selectedNums)} , id:"TBC14", },
        {text:"15", value:15, funcX:()=>{addNum(15, 2, 2, selectedNums)} , id:"TBC15", },
        {text:"16", value:16, funcX:()=>{addNum(16, 2, 3, selectedNums)} , id:"TBC16", },
        {text:"17", value:17, funcX:()=>{addNum(17, 2, 4, selectedNums)} , id:"TBC17", },
        {text:"18", value:18, funcX:()=>{addNum(18, 2, 5, selectedNums)} , id:"TBC18", },
      ]
    },
    {
      id:"TB4",
      rowStyle:"default__rowStyle",
      buttonData:         [
        {text:"19", value:19, funcX:()=>{addNum(19, 3, 0, selectedNums)}, id:"TBC19", },
        {text:"20", value:20, funcX:()=>{addNum(20, 3, 1, selectedNums)}, id:"TBC20", },
        {text:"CASH", value:0, funcX:()=>{validateCashOut(()=>{ 
          setRefresh(prev => !prev);
        })}, style:"terminalTextButton", id:"TBC21", },
        {text:"CLEAR", value:0, funcX:()=>{ setRefresh(prev => !prev);}, id:"TBC22", },
      ]
    },
  ];

  const addNum = (num, row, col, arrSelected)=>{
    let indx = arrSelected.findIndex(arrNum=>{return arrNum == num});
    if(indx < 0){
      // Check if there are 5 numbers
      if(arrSelected.length < 5){
        arrSelected.push(num);
        setSelectedNums([...arrSelected]);
        terminalButtons[row].buttonData[col].style = "terminalNumberButton_selected"
      } else {
        alert("You have the maximum amount of numbers picked.");
      }
    } else {
      // Toggle if it has already been added
      arrSelected.splice(indx, 1);
      setSelectedNums([...arrSelected]);
      terminalButtons[row].buttonData[col].style = "terminalNumberButton";
    }
  }

  const validateAddCashAmount = (_callback = ()=>{})=> {
    if(selectedNums.length < 5){
      alert("Please select 5 numbers before selecting a cash value");
    } else {
      _callback();
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

  useEffect(()=>{
    // Update the Cash value inside the terminalButton Cash
    terminalButtons[3].buttonData[2].funcX = ()=>{
      validateCashOut(()=>{ 
        setRefresh(prev => !prev);
      });
    }
  },[cashValue, selectedNums]);

  useEffect(()=>{
    setCashValue(0);
    selectedNums.splice(0,selectedNums.length); 
    setSelectedNums([...selectedNums]); 
    terminalButtons.forEach((tb,rowIndex)=>{
      tb.buttonData.forEach((col,colIndex)=>{
        if(col.id != "TBC21" && col.id != "TBC22"){
          // col.style = "terminalNumberButton";
          // tb.buttonData.funcX = addNum(1, 0, 0, selectedNums);
        }
      })
    });
  }, [refresh]);

  return (
    <div>
      <Header title={"WHE WHE on D'Avenue"}/>
      <main className="main_section">
        <div className="left_section">
          <div>
            <p>Image</p>
          </div>
          <ButtonDisplay buttonList={cashButtons}  buttonStyles={cashButtonStyles} containerStyle={"default__containerStyle"}/>
        </div>
        <div className="center_section">
          <ButtonDisplay buttonList={terminalButtons} buttonStyles={terminalButtonStyles} containerStyle={"default__containerStyle"}/>
          <button onClick={()=>{
            console.log(selectedNums.length);
          }}>Random</button>
        </div>
        <div className="right_section">
          <DisplayTotal numbersList={selectedNums} total={cashValue}/>
        </div>
      </main>
    </div>
  )
}

export default App

