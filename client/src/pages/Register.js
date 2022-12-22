import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';


const Register = () => {
    let navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            await axios.post('/users/register', values)
            message.success('Registration Successful');
            navigate('/login')
        } catch (error) {
            console.log('invalid credentials');
        }
    }
    return (
        < >
            <div className="register-page">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <h1 className="text-center my-3">Sign Up</h1>
                    <Form.Item
                        label="name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                    <div className="mb-3">
                        <p>Already an user?</p>
                        <Link className="btn btn-outline-primary" to="/login"> click here</Link>
                    </div>
                </Form>
            </div>

        </>
    )
}

export default Register
