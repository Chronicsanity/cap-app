import {useState} from 'react';
import Calendar from 'react-calendar'; 
//import Date from 'react-calendar';
import express from "express";
const app = express();
app.use(express.json());
const newdate = new Date();
const [date, setdate] = useState(newdate)



module.exports = function () {
 
console.log (date)
      const domContainer = document.querySelector('#calendar_container');
      const root = ReactDOM.createRoot(domContainer);
   
     root.render(e(Calendar), {date: date});
      
    }
  