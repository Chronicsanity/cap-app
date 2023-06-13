import {useState} from 'react';
import Calendar from 'react-calendar'; 




module.exports = function (calendar) {
    const [date, setDate] = useState(new Date())
    const currDate = Date.now;
      const domContainer = document.querySelector('#calendar_container');
      const root = ReactDOM.createRoot(domContainer);
      root.render(e(Calendar), {date: currDate}, {setDate:setDate});
      
    }
  