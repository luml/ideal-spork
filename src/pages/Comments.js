import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Pagination } from 'antd'

const Comments = ({ match }) => {
    const name = match.params.name

    const [comments, setComments] = useState([])

    const deleteComment = () => {
        console.log('Deleting...')
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
                        <a onClick={deleteComment}>Delete</a>
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