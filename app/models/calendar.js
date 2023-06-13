import {useState} from 'react';
import Calendar from 'react-calendar'; 




function calendar() {
    const [date, setDate] = useState(new Date())
      const domContainer = document.querySelector('#calendar_container');
      const root = ReactDOM.createRoot(domContainer);
      root.render(e(Calendar), e(date), e(setDate));
      
    }
       module.exports = calendar;