import React, {  useEffect, useMemo, useState} from 'react';
import {Calendar, DatePicker} from 'antd';
import styles from './Calendar.module.css'
import {CheckCircleOutlined, DeleteOutlined, RetweetOutlined} from "@ant-design/icons";
import cx from "classnames";
import moment from "moment/moment";
import CustomPopover from "../UI/CustomPopover/CustomPopover";

const getMonthData = (value) => {

    if (value.month() === 8) {
        return 1394;
    }
};
const CalendarCustom = (props) => {
    const [arrayLessonIds,setArrayLessonIds]=useState([])
    const [newDate,setNewDate]=useState('')
    const [newTime,setNewTime]=useState('')


    const getListData = (value) => {
        let localStorageLessens =JSON.parse(localStorage.getItem('lessens'))
        if(localStorageLessens===null){
            localStorage.setItem("successfulLessons", JSON.stringify([]));
            localStorageLessens=[]
        }
        let listData=[]
        // eslint-disable-next-line array-callback-return
        Object.keys(localStorageLessens).map((item)=>{//Создаю массив ключей нашего объекта
            if(value.format('YYYY-MM-DD')===item){//Если выбранная дата соответсвует ключу объекта то добавляю в эту дату информацию о нашем занятии
                // eslint-disable-next-line array-callback-return
                localStorageLessens[item].map((currentLesson)=>{
                    listData.push({type:'success',content:`${currentLesson.subject} в ${currentLesson.time}, сумма ${currentLesson.money}, время урока: ${currentLesson.timeLesson}, `,id:currentLesson.id,
                        time:currentLesson.time,name:currentLesson.name,subject:currentLesson.subject, money:currentLesson.money, timeLesson:currentLesson.timeLesson,date:value})
                })
            }
        })
        return listData

    };
    useEffect(()=>{
        let localStorageLessens =JSON.parse(localStorage.getItem('successfulLessons'))
        const arrayIds =[]
        // eslint-disable-next-line array-callback-return
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
        // eslint-disable-next-line array-callback-return
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
        let localStorageSuccessfulLessens =(JSON.parse(localStorage.getItem('successfulLessons'))||[])
        const correctDate=(value.format('YYYY-MM-DD'))||moment(new Date(value)).format("MM")
        const deleteLocalStorageLessensItem=localStorageLessens[correctDate].filter((item)=>item.id!==id)
        localStorage.setItem("lessens", JSON.stringify(
            {...localStorageLessens,[correctDate]:deleteLocalStorageLessensItem}));

        props.setTimeFormResult({...props.timeFormResult,
            [correctDate]:localStorageLessens[correctDate].filter((item)=>item.id!==id)})//Фильтруем массив с записями в конкретной дате

        if(props.successfulLessons.length!==0){
            props.setSuccessfulLessons(props.successfulLessons.filter((item)=>item.id!==id))
        }

        localStorage.setItem("successfulLessons", JSON.stringify(
            localStorageSuccessfulLessens.filter((item)=>item.id!==id)));
    }
    const createCorrectFormDataArray=(timeFormat)=>{// Корректирует массив данных для даты
        if(newDate in props.timeFormResult){
            return [...props.timeFormResult?.[newDate],timeFormat]
        }else{
            return [timeFormat]
        }
    }

    const rescheduleLesson= (item,id,value)=>{//Функция переноса даты занятия
        if(newDate!==''){
            let localStorageLessens =JSON.parse(localStorage.getItem('lessens'))
            props.setTimeFormResult({...localStorageLessens,
                [newDate]: createCorrectFormDataArray({...item,time:newTime}),
            })
            if(localStorageLessens.hasOwnProperty(newDate)){
                const currentLessenArray =localStorageLessens[newDate]
                currentLessenArray.push({...item,time:newTime})
                localStorage.setItem("lessens", JSON.stringify(
                    {...localStorageLessens,[newDate]:[...currentLessenArray]}));
            }else{
                localStorage.setItem("lessens", JSON.stringify({...localStorageLessens,[newDate]:[{...item,time:newTime}]}));
            }deleteCurrentLessen(value,id)
            setNewDate('')
        }
    }
    const onChange = (value) => {
        setNewDate(value.format('YYYY-MM-DD'))
        setNewTime(value.format('HH:mm'))
    };

    const dateCellRender = (value) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const listData = useMemo(()=>getListData(value),[value]);

       listData.sort((a, b) => parseFloat(a.time) - parseFloat(b.time))

        return (
            <div >
                <ul  onClick={(e)=>e.stopPropagation()} style={{paddingLeft:0}}>
                    {/* eslint-disable-next-line no-unused-expressions */}
                    {listData.map((item) => (
                        <div  key={item.id}>
                            <CustomPopover content={<li className={cx(styles.itemDate, { [styles.itemDateActive]: arrayLessonIds.includes(item.id) })}>
                                <h2>{item.name}</h2>
                                <p>{item.content}</p>
                                <div>
                                    <div style={{display:"flex"}}>
                                        <div onClick={(e)=> {
                                            deleteCurrentLessen(value, item.id)
                                            e.stopPropagation()//предотвращем всплытие
                                        }}><DeleteOutlined title={'Удалить занятие'} style={{ fontSize: '20px',paddingLeft:'10px' }}/>
                                        </div>
                                        <div  onClick={(e)=> {
                                            setNewSuccessfulLesson(item)
                                            e.stopPropagation()//предотвращем всплытие
                                        }}><CheckCircleOutlined  title={'Занятие проведено'} style={{ fontSize: '20px',paddingLeft:'10px',color:"green" }}/>
                                        </div>
                                    </div>
                                    <div style={{display:"flex",alignItems:'center', padding:'5px' }} >
                                        <DatePicker showTime={{ format: 'HH:mm' }}
                                                    format="YYYY-MM-DD HH:mm"  placeholder={'Дата переноса'}  onChange={onChange} />
                                        <div onClick={()=>rescheduleLesson(item,item.id,value,)}><RetweetOutlined
                                            style={{ fontSize: '20px',paddingLeft:'10px',color:"orange" }} /></div>
                                    </div>
                                </div>
                            </li>}>
                                <div className={cx(styles.itemDate, { [styles.itemDateActive]: arrayLessonIds.includes(item.id) })}><b>{item.name}</b> в {item.time}
                                </div>
                                </CustomPopover>

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