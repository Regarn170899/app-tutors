import './App.css';
import Calendar from "./Components/Calendar/Calendar";
import TimeForm from "./Components/TimeForm/TimeForm";
import {useState} from "react";

const [timeFormResult, setTimeFormResult] = useState([])
function App() { /*исправил*/
  return (
    <div className="App">
      <TimeForm timeFormResult={timeFormResult} setTimeFormResult={setTimeFormResult}/>
      <Calendar/>
    </div>
  );
}

export default App;
