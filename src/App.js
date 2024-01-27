import './App.css';
import Calendar from "./Components/Calendar/Calendar";
import TimeForm from "./Components/TimeForm/TimeForm";
import {useState} from "react";
import {Route, Router, Routes} from "react-router-dom";
import CustomMenu from "./Components/CustomMenu/CustomMenu";
import InformationPage from "./Pages/InformationPage/InformationPage";

const initialObject={
    '01':[],
    '02':[],
    '03':[],
    '04':[],
    '05':[],
    '06':[],
    '07':[],
    '08':[],
    '09':[],
    '10':[],
    '11':[],
    '12':[],

}
function App() {
    const [timeFormResult, setTimeFormResult] = useState({})
    const [currentDate, setCurrentDate] = useState('')
    const [successfulLessons, setSuccessfulLessons] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="App">
        <div className={'App-header-container'} ></div>
        <div className={'App-header-block'}>
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


    </div>
  );
}

export default App;
