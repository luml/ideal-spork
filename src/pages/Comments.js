import React, { useEffect, useState } from "react";
import { Table, Space, Pagination, Modal } from 'antd'

function confirm(record) {
    Modal.confirm({
        title: 'Confirm',
        // icon: <ExclamationCircleOutlined />,
        content: `${record.text} from ${record.username}`,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
            console.log(`Deleting.. ${record.text}`)
        }
    });
}

const Comments = ({ match }) => {
    const name = match.params.name

    const [comments, setComments] = useState([])

    const deleteComment = (record) => {
        confirm(record)
        console.log('Deleting... ' + record )
    }

    useEffect(() => {
        const fetchComments = async () => {
            const result = await fetch(`/api/articles/${name}`)
            const body = await result.json()
            setComments(body.comments)
        }
        fetchComments()
    }, [name])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Text',
            dataIndex: 'text',
            key: 'text',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                console.log(text, record)
                return (
                    <Space size="middle">
                        {/* <a>Invite {username}{text}</a> */}
                        <a onClick={() => deleteComment(record)}>Delete</a>
                    </Space>
                )
            }
        },
    ]
    return (
        <React.Fragment>
            <Table
                loading="true"
                columns={columns}
                dataSource={comments}
                pagination={{ position: ['none', 'none'] }}
            />
            <Pagination defaultCurrent={1} total={50}></Pagination>
        </React.Fragment>
    )
}

export default Comments