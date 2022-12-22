import React ,{useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';


const Login = () => {
    let navigate = useNavigate();
    const onFinish = async (values)=>{
        try {
            const {data} = await axios.post('/users/login', values);
            message.success('Login Successful');
            localStorage.setItem('user', JSON.stringify({...data.user, password:""}))
            navigate('/');
        } catch (error) {
            message.error('something went wrong')
        }
    }

    //prevent login for user
    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/');
        }
    },[navigate]);
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
                    <h1 className="text-center my-3">Login</h1>
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
                        <p>Not an user?</p>
                        <Link className="btn btn-outline-primary" to="/register"> click here</Link>
                    </div>
                </Form>
            </div>
        </>
    
  )
}

export default Login
