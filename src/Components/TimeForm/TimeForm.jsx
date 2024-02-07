import {Button, Form, Input, InputNumber, Modal, Radio, Select, TimePicker} from 'antd';
import {v4 as uuidv4} from 'uuid';
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
const format = 'HH:mm';
const TimeForm = (props) => {
    const [valueRadioTimeLesson, setValueRadioTimeLesson] = useState("30 мин.");
    const onChange = (e) => {
        setValueRadioTimeLesson(e.target.value);
    }
    const selectAfter = (
        <Select
            defaultValue="RUB"
            style={{
                width: 50,
            }}
        >
            <Option value="RUB">₽</Option>
            <Option value="USD">$</Option>
            <Option value="EUR">€</Option>
        </Select>
    );

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
        let localStorageLessens =JSON.parse(localStorage.getItem('lessens'))
        if(localStorageLessens===null){
            localStorage.setItem("lessens", JSON.stringify({}));
            localStorageLessens={}
        }
        const timeFormat = {
            ...values,
            time : values.time.format('HH:mm'),
            id:uuidv4() // добавляем уникальный id для каждой записи
        }
        if((localStorageLessens.hasOwnProperty(props.currentDate))){
            const currentLessenArray =localStorageLessens[props.currentDate]
            currentLessenArray.push(timeFormat)
            localStorage.setItem("lessens", JSON.stringify(
            {...localStorageLessens,[props.currentDate]:[...currentLessenArray]}));
        }else{
            localStorage.setItem("lessens", JSON.stringify({...localStorageLessens,[props.currentDate]:[timeFormat]}));
        }
        props.setTimeFormResult({...props.timeFormResult,
            [props.currentDate]: createCorrectFormDataArray(timeFormat),//ключ это дата , а значение это массив из записей(запись - объект)
        })
        form.resetFields();
        props.setIsModalOpen(false);
    };
    return (
        <>
            <Modal
                title="Запись"
                open={props.isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={600}>
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
                            <Option value="Английский язык">Английский язык</Option>
                            <Option value="Итальянский язык">Итальянский язык</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item

                        name="time"
                        label="Время" {...config}
                    >
                        <TimePicker  format={format}/>
                    </Form.Item>
                    <Form.Item
                        name="timeLesson"
                        label="Время урока"
                        rules={[
                            {
                                required: true,
                                message: 'Укажите время урока',
                            },
                        ]}
                    >
                        <Radio.Group onChange={onChange} value={valueRadioTimeLesson}>
                            <Radio value={"30 мин."}>30 мин.</Radio>
                            <Radio value={"45 мин."}>45 мин.</Radio>
                            <Radio value={"60 мин."}>60 мин.</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Введите сумму'
                            },
                        ]}
                        name="money"
                        label="Сумма"
                    >
                        <InputNumber type='number'  addonAfter={selectAfter} defaultValue={0} />
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