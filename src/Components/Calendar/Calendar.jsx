import React, { useCallback, useEffect, useMemo, useState} from 'react';
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
        let localStorageLessens =JSON.parse(localStorage.getItem('lessens'))
        if(localStorageLessens===null){
            localStorage.setItem("successfulLessons", JSON.stringify([]));
            localStorageLessens=[]
        }
        let listData=[]
        Object.keys(localStorageLessens).map((item)=>{//Создаю массив ключей нашего объекта
            if(value.format('YYYY-MM-DD')===item){//Если выбранная дата соответсвует ключу объекта то добавляю в эту дату информацию о нашем занятии
                localStorageLessens[item].map((currentLesson)=>{
                    listData.push({type:'success',content:`${currentLesson.name} : ${currentLesson.subject} в ${currentLesson.time}, сумма ${currentLesson.money} `,id:currentLesson.id,
                        time:currentLesson.time,name:currentLesson.name,subject:currentLesson.subject, money:currentLesson.money,date:value})
                })
            }
        })
        return listData

    };
    useEffect(()=>{
        let localStorageLessens =JSON.parse(localStorage.getItem('successfulLessons'))
        const arrayIds =[]
        localStorageLessens.map((lesson)=>{
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
        let localStorageLessens =JSON.parse(localStorage.getItem('successfulLessons'))
        if(localStorageLessens===null){
            localStorage.setItem("successfulLessons", JSON.stringify([]));
            localStorageLessens=[]
        }
        const arrayIds =[]
        localStorageLessens?.map((lesson)=>{
                arrayIds.push(lesson.id)
            })

        if(!arrayIds.includes(item.id)){// Если в массиве нету записи с таким id о добавляем её
            props.setSuccessfulLessons([...props.successfulLessons , item])
            localStorage.setItem("successfulLessons", JSON.stringify(
                [...localStorageLessens,item]));
        }
    }
    const SelectDate=(current)=>{
        props.setIsModalOpen(true)
        props.setCurrentDate(current.format('YYYY-MM-DD'))//берём выбранную дату
    }
    const deleteCurrentLessen=(value,id)=>{
        const localStorageLessens =JSON.parse(localStorage.getItem('lessens'))
        let localStorageSuccessfulLessens =JSON.parse(localStorage.getItem('successfulLessons'))
        const deleteLocalStorageLessensItem=localStorageLessens[value.format('YYYY-MM-DD')].filter((item)=>item.id!==id)
        localStorage.setItem("lessens", JSON.stringify(
            {...localStorageLessens,[value.format('YYYY-MM-DD')]:deleteLocalStorageLessensItem}));
        props.setTimeFormResult({...props.timeFormResult,
            [value.format('YYYY-MM-DD')]:props.timeFormResult[value.format('YYYY-MM-DD')].filter((item)=>item.id!==id)})//Фильтруем массив с записями в конкретной дате
        if(props.successfulLessons.length!==0){
            props.setSuccessfulLessons(props.successfulLessons.filter((item)=>item.id!==id))
        }
        localStorage.setItem("successfulLessons", JSON.stringify(
            localStorageSuccessfulLessens.filter((item)=>item.id!==id)));
    }

    const dateCellRender = (value) => {
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
    }
    const cellRender = (current, info) => {
        if (info.type === 'date') return dateCellRender(current) ;
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };
    return <Calendar cellRender={cellRender} onSelect={SelectDate}/>;
};

export default CalendarCustom;