import {Button, Form, Input, Modal, Select, TimePicker} from 'antd';
import {useState} from "react";
const { Option } = Select;
const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Укажите время',
        },
    ],
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const TimeForm = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [form] = Form.useForm();
    const onFinish = (values) => {
        const timeFormat = {
            ...values,
            time : values.time.format('HH:mm:ss'),
        }
        props.setTimeFormResult([...props.timeFormResult, timeFormat])
        form.resetFields();
        console.log(props.timeFormResult)
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Запись
            </Button>
            <Modal title="Запись" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <p><Form.Item
                        label="Имя"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Введите имя',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item></p>
                    <p><Form.Item

                        name="subject"
                        label="Предмет"
                        rules={[
                            {required: true,
                                message: 'Выберите предмет'
                            },
                        ]}
                    >
                        <Select
                            placeholder="Выберите предмет"
                            allowClear
                        >
                            <Option value="Russian">Русский язык</Option>
                            <Option value="Math">Математика</Option>
                            <Option value="English">Английский язык</Option>
                        </Select>
                    </Form.Item></p>
                    <p><Form.Item

                        name="time"
                        label="Время" {...config}
                    >
                        <TimePicker/>
                    </Form.Item></p>
                    <p><Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" onClick={handleOk}>
                            Сохранить
                        </Button>
                    </Form.Item></p>
                </Form>
            </Modal>
        </>
    )
};
export default TimeForm;