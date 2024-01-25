import './App.css';
import Calendar from "./Components/Calendar/Calendar";
import TimeForm from "./Components/TimeForm/TimeForm";
import {useState} from "react";
import {Route, Router, Routes} from "react-router-dom";
import CustomMenu from "./Components/CustomMenu/CustomMenu";
import InformationPage from "./Pages/InformationPage/InformationPage";

function App() {
    const [timeFormResult, setTimeFormResult] = useState({})
    const [currentDate, setCurrentDate] = useState('')
    const [successfulLessons, setSuccessfulLessons] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="App">
        <CustomMenu/>
        <Routes>
            <Route path="/" element={
                <>
                <TimeForm isModalOpen={isModalOpen}
                          setIsModalOpen={setIsModalOpen}
                          currentDate={currentDate}
                          timeFormResult={timeFormResult}
                          setTimeFormResult={setTimeFormResult}/>
                <Calendar setSuccessfulLessons={setSuccessfulLessons}
                          successfulLessons={successfulLessons}
                          setTimeFormResult={setTimeFormResult}
                          timeFormResult={timeFormResult}
                          isModalOpen={isModalOpen}
                          setIsModalOpen={setIsModalOpen}
                          setCurrentDate={setCurrentDate}/>
            </>
            }/>
            <Route path="/about" element={<InformationPage successfulLessons={successfulLessons}/>}/>
        </Routes>

    </div>
  );
}

export default App;
