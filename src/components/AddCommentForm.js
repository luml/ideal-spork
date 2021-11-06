import React, { useState } from 'react';
import { Input, Form, Button } from 'antd';

const layout = {
    labelCol: {span: 3},
    wrapperCol: {span: 16}
}

const AddCommentForm = ({ articleName, setArticleInfo }) => {
    const [form] = Form.useForm()
    const [username, setUsername] = useState('');
    const [commentText, setCommentText] = useState('');

    const onFinish = async (values) => {
        const { username, commentText } = values
        const result = await fetch(`/api/articles/${articleName}/add-comment`, {
            method: 'post',
            body: JSON.stringify({ username, text: commentText }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const body = await result.json();
        setArticleInfo(body);
        setUsername('');
        setCommentText('');
    }

    return (
        <Form labelAlign="left" {...layout} form={form} onFinish={onFinish} autoComplete="off">
            <Form.Item name="username" label="Name" rules={[{required: true}]}>
                <Input />
            </Form.Item>
            <Form.Item name="commentText" label="Comment" rules={[{required: true}]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default AddCommentForm;