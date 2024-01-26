import React, { useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Calendar} from 'antd';
import styles from './Calendar.module.css'
import {CheckCircleOutlined, DeleteOutlined} from "@ant-design/icons";
import cx from "classnames";

const getMonthData = (value) => {

    if (value.month() === 8) {
        return 1394;
    }
};
const CalendarCustom = (props) => {
    const [arrayLessonIds,setArrayLessonIds]=useState([])

    const getListData = (value) => {
        console.log('sda')

        let listData=[]
        Object.keys(props.timeFormResult).map((item)=>{//Создаю массив ключей нашего объекта
            if(value.format('YYYY-MM-DD')===item){//Если выбранная дата соответсвует ключу объекта то добавляю в эту дату информацию о нашем занятии
                props.timeFormResult[item].map((currentLesson)=>{
                    listData.push({type:'success',content:`${currentLesson.name} : ${currentLesson.subject} в ${currentLesson.time} `,id:currentLesson.id,
                        time:currentLesson.time,name:currentLesson.name,subject:currentLesson.subject})
                })
            }
        })
        return listData

    };
    useEffect(()=>{
        const arrayIds =[]
        props.successfulLessons.map((lesson)=>{
            arrayIds.push(lesson.id)
        })
        setArrayLessonIds(arrayIds)
    },[props.successfulLessons]) // как только изменяетя массив successfulLessons то мы сразу добавляем id в новое состояние
    const monthCellRender =  (value) => {

        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };
    const setNewSuccessfulLesson=(item)=>{
        const arrayIds =[]
            props.successfulLessons.map((lesson)=>{
                arrayIds.push(lesson.id)
            })

        if(!arrayIds.includes(item.id)){// Если в массиве нету записи с таким id о добавляем её
            props.setSuccessfulLessons([...props.successfulLessons , item])
        }
    }
    const SelectDate=(current)=>{
        props.setIsModalOpen(true)
        props.setCurrentDate(current.format('YYYY-MM-DD'))//берём выбранную дату
    }
    const deleteCurrentLessen=(value,id)=>{

        props.setTimeFormResult({...props.timeFormResult,
            [value.format('YYYY-MM-DD')]:props.timeFormResult[value.format('YYYY-MM-DD')].filter((item)=>item.id!==id)})//Фильтруем массив с записями в конкретной дате
        if(props.successfulLessons.length!==0){
            props.setSuccessfulLessons(props.successfulLessons.filter((item)=>item.id!==id))
        }
    }

    const dateCellRender = useCallback( (value) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const listData = useMemo(()=>getListData(value),[props.timeFormResult]) ;
        return (
            <div>
                <ul style={{paddingLeft:0}}>
                    {listData.map((item) => (
                        <div key={item.id}>
                            <li className={cx(styles.itemDate, { [styles.itemDateActive]: arrayLessonIds.includes(item.id) })}>
                                <p>{item.content}</p>
                                <div onClick={(e)=> {
                                    deleteCurrentLessen(value, item.id)
                                    e.stopPropagation()//предотвращем всплытие
                                }}><DeleteOutlined title={'Удалить занятие'} style={{ fontSize: '20px',paddingLeft:'10px' }}/></div>
                                <div  onClick={(e)=> {
                                    setNewSuccessfulLesson(item)
                                    e.stopPropagation()//предотвращем всплытие
                                }}><CheckCircleOutlined  title={'Занятие проведено'} style={{ fontSize: '20px',paddingLeft:'10px',color:"green" }}/></div>
                            </li>
                        </div>
                    ))}
                </ul>

            </div>

        );
    },[props,arrayLessonIds]);
    const cellRender = (current, info) => {
        if (info.type === 'date') return dateCellRender(current) ;
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };
    return <Calendar cellRender={cellRender} onSelect={SelectDate}/>;
};

export default CalendarCustom;