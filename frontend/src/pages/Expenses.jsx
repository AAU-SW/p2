import { Button } from '../components/button';
import { Popup } from '../components/PopUp';
import { useState } from 'react';

export const Expenses = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
    return (
      <div>
        <h1>Expenses</h1>
      
      <Button onClick = {() => setShowPopup(!showPopup)} label="Add Expense"/>
      
      {showPopup && (<Popup close={() => setShowPopup(false)}>
        <h2>Add Expense</h2>
        <p>What is the category of the expense?</p>
        <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="E.g. Food, Rent, etc."
          />
        <p>What is the date of the expense?</p>
        <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="DD/MM/YYYY"
          />
        <p>What is the cost of the expense?</p>
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="DKK"
          />
          
        <p>Total amount: {inputValue} kr </p>
        <Button onClick = {() => setShowPopup(false)} label="Submit"/>
          
        </Popup>

      )}
    </div>
  );
};

  /* Detailed view of each expense */
  /* add monthly expenses (routes og controllers)*/


  /* Table og monthly expenses */
  /* Filtering of monthly expenses */
