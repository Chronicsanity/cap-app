import {useState} from 'react';
import Calendar from 'react-calendar';
import express from "express";
const app = express();
app.use(express.json());




 async function Calendar () {
  const newdate = new Date();
  const [date, setdate] = useState(new Date())
console.log ()
      const domContainer = document.querySelector('#calendar_container');
      const root = ReactDOM.createRoot(domContainer);
   
     await root.render(e(Calendar), );
      
    }
  export default Calendar;