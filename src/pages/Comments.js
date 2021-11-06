import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from 'antd'

const Comments = ({match}) => {
    const name = match.params.name

    const [comments, setComments] = useState([])

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
            render: text => <a>{text}</a>,
        },
        // {
        //     title: 'Tags',
        //     key: 'tags',
        //     dataIndex: 'tags',
        //     render: tags => (
        //       <>
        //         {tags.map(tag => {
        //           let color = tag.length > 5 ? 'geekblue' : 'green';
        //           if (tag === 'loser') {
        //             color = 'volcano';
        //           }
        //           return (
        //             <Tag color={color} key={tag}>
        //               {tag.toUpperCase()}
        //             </Tag>
        //           );
        //         })}
        //       </>
        //     ),
        // },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
                {/* <a>Invite {record.name}</a> */}
                <a>Delete</a>
              </Space>
            ),
          },
    ]
    return (
        <Table columns={columns} dataSource={comments} />
    )
}

export default Comments