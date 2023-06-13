import {useState} from 'react';
import Calendar from 'react-calendar'; 




function Calendar() {
    
      const domContainer = document.querySelector('#calendar_container');
      const root = ReactDOM.createRoot(domContainer);
      root.render(e(Calendar));
      
    }
       export default Calendar;