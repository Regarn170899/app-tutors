import React from 'react';
import {Table} from "antd";

const InformationPage = (props) => {
    const dataSource = props.successfulLessons.map((lesson)=>{
        debugger;
        return{
                key: "1",
                name: lesson.name,
                subject: lesson.subject,
                time: lesson.time,
            }
    })

    const columns = [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Предмет',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Время',
            dataIndex: 'time',
            key: 'time',
        },
    ];


    return (
        <div>
            <h2>Проведённые занятия</h2>
            <Table style={{width:'100vw', paddingTop:'40px'}}  dataSource={dataSource} columns={columns} />
        </div>
    );
};

export default InformationPage;