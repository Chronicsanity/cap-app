import {useState} from 'react';
import Calendar from 'react-calendar'; 
import express from "express";
const app = express();
app.use(express.json());




module.exports = function (app) {
    const [date, setDate] = useState(new Date())

      const domContainer = document.querySelector('#calendar_container');
      const root = ReactDOM.createRoot(domContainer);
      
      app.get('/schedule', async (req, res) =>{
  
       
          res.render ('schedule', e(Calendar), {date: date}, {setDate:setDate})
        
        })
     // root.render(e(Calendar), {date: date}, {setDate:setDate});
      
    }
  