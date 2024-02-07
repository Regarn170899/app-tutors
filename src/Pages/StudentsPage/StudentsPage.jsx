import React, {useState} from 'react';
import {Button, Form, Input, Modal, Select} from "antd";
const { Option } = Select;
const StudentsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Добавить ученика
            </Button>
            <Modal
                title="Ученик"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={600}>
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
                    autoComplete="off"
                >
                    <Form.Item
                        label="Имя"
                        name="studentFirstName"
                        rules={[
                            {
                                required: true,
                                message: 'Введите имя',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Фамилия"
                        name="studentLastName"
                        rules={[
                            {
                                required: true,
                                message: 'Введите фамилию',
                            },
                        ]}
                    >
                        <Input />
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
    );
};

export default StudentsPage;