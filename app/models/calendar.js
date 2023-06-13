import {useState} from 'react';
import Calendar from 'react-calendar'; 
import express from "express";
const app = express();
app.use(express.json());




module.exports = function () {
    const [date, setDate] = useState(new Date())
console.log (date)
      const domContainer = document.querySelector('#calendar_container');
      const root = ReactDOM.createRoot(domContainer);
   
     root.render(e(Calendar), {date: date}, {setDate:setDate});
      
    }
  