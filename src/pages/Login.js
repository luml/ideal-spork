import React from "react";
import { Form, Button, Input, Checkbox } from 'antd'

const Login = () => {
  const [form] = Form.useForm()
  const onFill = () => {
    form.setFieldsValue({
      username: 'admin',
      password: '123456'
    })
  }
  const onReset = () => {
    form.resetFields()
  }
  const onFinish = (values) => {
    console.log('Success:', values, form.getFieldValue('username'));
    if (form.getFieldValue('username') === 'admin') {
      window.sessionStorage.setItem("user", 'admin')
      window.location = "http://localhost:3000/article-list"
    } else {
      // set field error status
      // form
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      form={form}
      style={{ marginTop: '20px' }}
      name="basic"
      // layout="vertical"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' }, {
            len: 6,
            message: 'password must be 6 characters'
          }]}
      >
        <Input.Password placeholder="password" />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>Fill Form</Button>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>

      </Form.Item>
    </Form>
  )
}

export default Login