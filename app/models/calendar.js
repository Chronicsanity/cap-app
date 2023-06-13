import {useState} from 'react';
import Calendar from 'react-calendar'; 
//import Date from 'react-calendar';
import express from "express";
const app = express();
app.use(express.json());




 async function calendar () {
  const newdate = new Date();
  const [date, setdate] = await useState(newdate)
console.log (date)
      const domContainer = document.querySelector('#calendar_container');
      const root = ReactDOM.createRoot(domContainer);
   
     await root.render(e(Calendar), {date: date});
      
    }
  export default calendar();