import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header';
import ButtonDisplay from './components/ButtonDisplay'; 
import DisplayTotal from './components/DisplayTotal';
const App = () => {

  const cashButtons = [
    {
      id:"CB1",
      rowStyle:"default__rowStyle",
      buttonData:     [
        {text:"$1", value:1, funcX:()=>{}, style:"cashButton", id:"CBC1", },
        {text:"$5", value:5, funcX:()=>{}, style:"cashButton" , id:"CBC2",},
      ]
    },
    {
      id:"CB2",
      rowStyle:"default__rowStyle",
      buttonData:     [
        {text:"$10", value:10, funcX:()=>{}, style:"cashButton", id:"CBC3", },
        {text:"$20", value:20, funcX:()=>{}, style:"cashButton" , id:"CBC4",},
      ]
    }
  ];

  const  terminalButtonsInit = [
    {
      id:"TB1",
      rowStyle:"default__rowStyle",
      buttonData: [
        {text:"1", value:1, funcX:()=>{addNum(1, 0, 0)}, style:"terminalNumberButton" , id:"TBC1",},
        {text:"2", value:2, funcX:()=>{}, style:"terminalNumberButton", id:"TBC2", },
        {text:"3", value:3, funcX:()=>{}, style:"terminalNumberButton", id:"TBC3", },
        {text:"4", value:4, funcX:()=>{}, style:"terminalNumberButton", id:"TBC4", },
        {text:"5", value:5, funcX:()=>{}, style:"terminalNumberButton", id:"TBC5", },
        {text:"6", value:6, funcX:()=>{}, style:"terminalNumberButton", id:"TBC6", },
      ]
    },
    {
      id:"TB2",
      rowStyle:"default__rowStyle",
      buttonData:         [
        {text:"7", value:1, funcX:()=>{}, style:"terminalNumberButton", id:"TBC7", },
        {text:"8", value:5, funcX:()=>{}, style:"terminalNumberButton", id:"TBC8", },
        {text:"9", value:1, funcX:()=>{}, style:"terminalNumberButton", id:"TBC9", },
        {text:"10", value:5, funcX:()=>{}, style:"terminalNumberButton", id:"TBC10", },
        {text:"11", value:1, funcX:()=>{}, style:"terminalNumberButton", id:"TBC11", },
        {text:"12", value:5, funcX:()=>{}, style:"terminalNumberButton", id:"TBC12", },
      ]
    },
    {
      id:"TB3",
      rowStyle:"default__rowStyle",
      buttonData:         [
        {text:"13", value:1, funcX:()=>{}, style:"terminalNumberButton", id:"TBC13", },
        {text:"14", value:5, funcX:()=>{}, style:"terminalNumberButton", id:"TBC14", },
        {text:"15", value:1, funcX:()=>{}, style:"terminalNumberButton", id:"TBC15", },
        {text:"16", value:5, funcX:()=>{}, style:"terminalNumberButton", id:"TBC16", },
        {text:"17", value:1, funcX:()=>{}, style:"terminalNumberButton", id:"TBC17", },
        {text:"18", value:5, funcX:()=>{}, style:"terminalNumberButton", id:"TBC18", },
      ]
    },
    {
      id:"TB4",
      rowStyle:"default__rowStyle",
      buttonData:         [
        {text:"19", value:1, funcX:()=>{}, style:"terminalNumberButton", id:"TBC19", },
        {text:"20", value:5, funcX:()=>{}, style:"terminalNumberButton", id:"TBC20", },
        {text:"CASH", value:0, funcX:()=>{}, style:"terminalTextButton", id:"TBC21", },
        {text:"CLEAR", value:0, funcX:()=>{ setSelectedNums([]); setTerminalButtons(terminalButtonsInit); }, style:"terminalTextButton", id:"TBC22", },
      ]
    },
  ];

  const [selectedNums, setSelectedNums] = useState([]);
  const [terminalButtons, setTerminalButtons] = useState(terminalButtonsInit);

  const addNum = (num, row, col)=>{
    // Check if number has already been added
alert(    JSON.stringify(selectedNums.findIndex(arrNum=>{console.log(arrNum == num); return arrNum == num})))

    if(selectedNums.findIndex(arrNum=>{return arrNum == num}) < 0){
      // Check if there are 5 numbers
      if(selectedNums.length < 5){
        setSelectedNums([...selectedNums, num]);
        terminalButtons[0].buttonData[0].style = "default"
      } else {
        alert("You have the maximum amount of numbers picked.");
      }
    } else {
      // Toggle if it has already been added
      alert("here");
      setSelectedNums([...(selectedNums.filter(arrNum => arrNum != num))]);
      terminalButtons[0].buttonData[0].style = "terminalNumberButton";
    }
  }

  return (
    <div>
      <Header title={"WHE WHE on D'Avenue"}/>
      <main className="main_section">
        <div className="left_section">
          <div>
            <p>Image</p>
          </div>
          <ButtonDisplay buttonList={cashButtons}  containerStyle={"default__containerStyle"}/>
        </div>
        <div className="center_section">
          <ButtonDisplay buttonList={terminalButtons} containerStyle={"default__containerStyle"}/>
        </div>
        <div className="right_section">
          <DisplayTotal numbersList={selectedNums}/>
        </div>
      </main>
    </div>
  )
}

export default App

