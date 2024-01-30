import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Input, Row, Space, Statistic, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import * as PropTypes from "prop-types";
import moment from "moment";

function CountUp(props) {
    return null;
}

CountUp.propTypes = {separator: PropTypes.string};
const InformationPage = (props) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const [monthMoney, setMonthMoney] = useState({});
    const getMoney=()=>{
        let localStorageSuccessfulLessens =JSON.parse(localStorage.getItem('successfulLessons'))
        const initialObject={
            '01':0,
            '02':0,
            '03':0,
            '04':0,
            '05':0,
            '06':0,
            '07':0,
            '08':0,
            '09':0,
            '10':0,
            '11':0,
            '12':0,
        }
        localStorageSuccessfulLessens.map((lesson)=>{
            initialObject[moment(new Date(lesson.date)).format("MM")]+=lesson.money
        })

        setMonthMoney({...initialObject})
    }
    useEffect(()=>{
        getMoney()
    },[props.successfulLessons])
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters && handleReset(clearFilters);
                            handleSearch(selectedKeys, confirm, dataIndex);
                        }}
                        size="small"
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) => (
                text
            ),
    });

    let localStorageSuccessfulLessens =JSON.parse(localStorage.getItem('successfulLessons'))
    const dataSource = localStorageSuccessfulLessens.map((lesson)=>{
        return{
                key: "1",
                name: lesson.name,
                subject: lesson.subject,
                time: lesson.time,
                money: lesson.money,
                date: moment(new Date(lesson.date)).format('YYYY-MM-DD')
            }
    })



    const columns = [

        {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
            ...getColumnSearchProps('date'),
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Предмет',
            dataIndex: 'subject',
            key: 'subject',
            ...getColumnSearchProps('subject'),
        },
        {
            title: 'Время',
            dataIndex: 'time',
            key: 'time',
            ...getColumnSearchProps('time'),
        },
        {
            title: 'Сумма',
            dataIndex: 'money',
            key: 'money',
            ...getColumnSearchProps('money'),
        },
    ];


    return (
        <div style={{width:'100%', paddingTop:'40px'}}>
            <h2>Проведённые занятия</h2>
            <Table   dataSource={dataSource} columns={columns} />
            <Row >
                {Object.keys(monthMoney).map((item)=>{
                    if(monthMoney[item]!==0){
                        return(
                            <Col span={10}>
                                <Statistic title={`Заработок за ${item} месяц`} value={monthMoney[item]}  />
                            </Col>
                        )
                    }
                })}

            </Row>
        </div>
    );
};

export default InformationPage;