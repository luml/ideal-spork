import React from 'react';
import { Button } from 'antd';

const UpvotesSection = ({ articleName, upvotes, setArticleInfo }) => {
    const upvoteArticle = async () => {
        const result = await fetch(`/api/articles/${articleName}/upvote`, {
            method: 'post',
        });
        const body = await result.json();
        setArticleInfo(body);
    }
    return (
        <div id="upvotes-section">
            <Button onClick={() => upvoteArticle()}>Add Upvote</Button>
            <p>This post has been upvoted {upvotes} times</p>
        </div>
    );
}

export default UpvotesSection;