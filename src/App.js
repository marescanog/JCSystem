import React from 'react';
import './App.css';
import Header from './components/Header';
import CashButtonGroup from './components/CashButtonGroup';
const App = () => {
  return (
    <div>
      <Header />
      <div>
        <div>
          <div>
            <p>Image</p>
          </div>
          <CashButtonGroup/>
        </div>
        <div>
          <p>Terminal</p>
        </div>
        <div>
          <p>Screen Display</p>
        </div>
      </div>
    </div>
  )
}

export default App

