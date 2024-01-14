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
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const TimeForm = (props) => {
    const onFinish = (values) => {
        const timeFormat = {
            ...values,
            time : values.time.format('HH:mm:ss'),
        }
        props.setTimeFormResult([...props.timeFormResult, timeFormat])
        console.log(props.timeFormResult)
    };
    return (
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
            label="Username"
            name="name"
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

            name="subject"
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

            name="time"
            label="TimePicker" {...config}
        >
            <TimePicker
            />
        </Form.Item>
        <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
        >
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
    )
};
export default TimeForm;