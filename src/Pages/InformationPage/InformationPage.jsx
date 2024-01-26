import React, {useRef, useState} from 'react';
import {Button, Input, Space, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const InformationPage = (props) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
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
    const dataSource = props.successfulLessons.map((lesson)=>{
        return{
                key: "1",
                name: lesson.name,
                subject: lesson.subject,
                time: lesson.time,
                money: lesson.money,
            }
    })

    const columns = [
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
        </div>
    );
};

export default InformationPage;