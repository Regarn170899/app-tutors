import './App.css';
import Calendar from "./Components/Calendar/Calendar";
import TimeForm from "./Components/TimeForm/TimeForm";
import {useState} from "react";

function App() {
    const [timeFormResult, setTimeFormResult] = useState([])
  return (
    <div className="App">
      <TimeForm timeFormResult={timeFormResult} setTimeFormResult={setTimeFormResult}/>
      <Calendar/>
    </div>
  );
}

export default App;
