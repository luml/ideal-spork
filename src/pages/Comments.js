import React, { useEffect, useState } from "react";
import { Table, Space, Pagination, Modal } from 'antd'

const Comments = ({ match }) => {
    const name = match.params.name

    const [comments, setComments] = useState([])

    const deleteComment = (record) => {
        confirm(record)
        // console.log('Deleting... ' + record)
    }

    function confirm(record) {
        Modal.confirm({
            title: 'Confirm',
            content: `${record.text} from ${record.username}`,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                // console.log(`Deleting.. ${record.text}`)
                const removedComments = comments.filter(item => item.index !== record.index)
                setComments(removedComments)
            }
        });
    }

    useEffect(() => {
        const fetchComments = async () => {
            const result = await fetch(`/api/articles/${name}`)
            const body = await result.json()
            const test = body.comments
            let a = []
            test.map((item, index) => {
                item.index = item.username + '-' + index
                a.push(item)
            })

            setComments(a)
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