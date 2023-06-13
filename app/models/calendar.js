import {useState} from 'react';
import Calendar from 'react-calendar'; 
import express from "express";
const app = express();
app.use(express.json());

const [date, setDate] = useState(new Date())



module.exports = function () {
 
console.log (date)
      const domContainer = document.querySelector('#calendar_container');
      const root = ReactDOM.createRoot(domContainer);
   
     root.render(e(Calendar), {date: date}, {setDate:setDate});
      
    }
  