import React, {useState} from 'react';
import {Button, Form, Input, Select, TimePicker} from 'antd';
const { Option } = Select;
const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select time!',
        },
    ],
};
const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const initialTimeForm = {
    name : '',
    subject : '',
    time : '',
}
const TimeForm = (props) => {
    const [timeForm, setTimeForm] = useState(initialTimeForm)

    function ArrayTimeForm() {
        props.setTimeFormResult([...props.timeFormResult, timeForm])
        setTimeForm(...initialTimeForm)
    }
    <Form
        name="basic"
        labelCol={{
            span: 8,
        }}
        wrapperCol={{
            span: 16,
        }}
        style={{
            maxWidth: 600,
        }}
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            onChange={(e) => {
                setTimeForm({...timeForm, name: e.target.value})
            }}
            label="Username"
            name="username"
            rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
            ]}
        >
            <Input/>
        </Form.Item>
        <Form.Item
            onChange={(e) => {
                setTimeForm({...timeForm, subject: e.target.value})
            }}
            name="gender"
            label="Gender"
            rules={[{required: true}]}
        >
            <Select
                placeholder="Select a option and change input text above"
                allowClear
            >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
            </Select>
        </Form.Item>
        <Form.Item
            onChange={(e) => {
                setTimeForm({...timeForm, time: e.target.value})
            }}
            name="time-picker"
            label="TimePicker" {...config}
        >
            <TimePicker/>
        </Form.Item>
        <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
        >
            <Button onClick={ArrayTimeForm} type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
};
export default TimeForm;