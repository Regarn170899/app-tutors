import React, {useState} from 'react';
import { Badge, Calendar } from 'antd';
import dayjs from 'dayjs';
const getListData = (value,arr) => {
    let listData
   if(arr.includes(value.format('YYYY-MM-DD'))) {
       listData = [
           {
               type: 'warning',
               content: 'This is warning event.',
           },
           {
               type: 'success',
               content: 'This is usual event.',
           },
       ];
   }else{
       listData=[];
   }
   return listData

};
const getMonthData = (value) => {
    if (value.month() === 8) {
        return 1394;
    }
};
const CalendarCustom = () => {
    const [arr,setArr]=useState([])
    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };
    const SelectDate=(current)=>{
        if(!arr.includes(current.format('YYYY-MM-DD'))){
            setArr([...arr,current.format('YYYY-MM-DD')])
            console.log(arr);
        }

    }
    const deleteSelectedDate=(valueDate)=>{
        const newArr=arr.filter((item)=>item!==valueDate.format('YYYY-MM-DD'))
        setArr(newArr)
    }
    const dateCellRender = (value) => {
        const listData = getListData(value,arr);
        return (
            <div>
                <ul className="events">
                    {listData.map((item) => (
                        <div>
                            <li key={item.content}>
                                <Badge status={item.type} text={item.content} />
                            </li>
                        </div>
                    ))}
                    {arr.includes(value.format('YYYY-MM-DD'))&&<button onClick={() => deleteSelectedDate(value)}>Удалить</button>}
                </ul>

            </div>

        );
    };
    const cellRender = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };
    return <Calendar cellRender={cellRender} onSelect={SelectDate}/>;
};
export default CalendarCustom;