import React, { useEffect, useState } from "react";
import { Table, Space, Pagination, Modal, Button } from 'antd'

const Comments = ({ match }) => {
    const name = match.params.name

    const [comments, setComments] = useState([])

    const deleteComment = (record) => {
        confirm(record)
    }

    function confirm(record) {
        const { paramSet: { warning: { measures } } } = record
        Modal.confirm({
            title: 'Confirm',
            content: `${record.text} from ${record.username}, and ${measures[0].name}`,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                const removedComments = comments.filter(item => item.index !== record.index)
                setComments(removedComments)
            }
        });
    }

    useEffect(() => {
        const fetchComments = async () => {
            const result = await fetch(`/api/articles/${name}`)
            const body = await result.json()
            const tempComments = body.comments
            let newCommentlist = []
            tempComments.forEach((item, index) => {
                let temp;
                temp = {
                    index: item.username + '-' + index,
                    text: item.text,
                    username: item.username,
                    paramSet: {
                        warning: {
                            measures: [
                                { name: item.username, checked: '0' },
                                { name: item.username, checked: '1' }
                            ]
                        }
                    }
                }

                newCommentlist.push(temp)
            })
            setComments(newCommentlist)
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
            dataIndex: '',
            key: '',
            render: (text, record) => {
                return (
                    <Space size="middle">
                        <Button onClick={() => deleteComment(record)}>Delete</Button>
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
                rowKey={record => record.index}
            />
            <Pagination defaultCurrent={1} total={50}></Pagination>
        </React.Fragment>
    )
}

export default Comments