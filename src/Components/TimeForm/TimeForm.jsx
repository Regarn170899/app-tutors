import {Button, Form, Input, Modal, Select, TimePicker} from 'antd';
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

    const handleCancel = () => {
        props.setIsModalOpen(false);
    };
    const createCorrectFormDataArray=(timeFormat)=>{// Корректирует массив данных для даты
        if(props.currentDate in props.timeFormResult){
            return [...props.timeFormResult?.[props.currentDate],timeFormat]
        }else{
            return [timeFormat]
        }
    }
    const [form] = Form.useForm();
    const onFinish = (values) => {
        const timeFormat = {
            ...values,
            time : values.time.format('HH:mm:ss'),
        }
        props.setTimeFormResult({...props.timeFormResult,
            [props.currentDate]: createCorrectFormDataArray(timeFormat),//ключ это дата , а значение это массив из записей(запись - объект)
        })
        form.resetFields();
        props.setIsModalOpen(false);
    };
    return (
        <>
            <Modal title="Запись" open={props.isModalOpen} onCancel={handleCancel} footer={null}>
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
                    <Form.Item
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
                    </Form.Item>
                    <Form.Item

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
                    </Form.Item>
                    <Form.Item

                        name="time"
                        label="Время" {...config}
                    >
                        <TimePicker/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};
export default TimeForm;