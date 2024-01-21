import './App.css';
import Calendar from "./Components/Calendar/Calendar";
import TimeForm from "./Components/TimeForm/TimeForm";
import {useState} from "react";

function App() {
    const [timeFormResult, setTimeFormResult] = useState({})
    const [currentDate, setCurrentDate] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="App">
      <TimeForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} currentDate={currentDate} timeFormResult={timeFormResult} setTimeFormResult={setTimeFormResult}/>
      <Calendar timeFormResult={timeFormResult} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setCurrentDate={setCurrentDate}/>
    </div>
  );
}

export default App;
