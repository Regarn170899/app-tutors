import React from 'react';
import { Calendar } from 'antd';

const getMonthData = (value) => {
    if (value.month() === 8) {
        return 1394;
    }
};
const CalendarCustom = (props) => {
    const getListData = (value) => {
        let listData=[]
        Object.keys(props.timeFormResult).map((item)=>{
            if(value.format('YYYY-MM-DD')===item){
                props.timeFormResult[item].map((currentLesson)=>{
                    listData.push({type:'success',content:`${currentLesson.name} : ${currentLesson.subject} в ${currentLesson.time} `})
                })
            }
        })
        return listData

    };
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
        props.setIsModalOpen(true)
        props.setCurrentDate(current.format('YYYY-MM-DD'))//берём выбранную дату
    }

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <div>
                <ul style={{paddingLeft:0}}>
                    {listData.map((item) => (
                        <div>
                            <li key={item.content} style={{display:"flex",flexWrap:"nowrap",paddingLeft:0}}>

                                <p>{item.content}</p>
                            </li>
                        </div>
                    ))}
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