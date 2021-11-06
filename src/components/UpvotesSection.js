import React from 'react';
import { Link } from 'react-router-dom';
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
            <Link key={articleName} to={`/comments/${articleName}`}>
                <p>Read All Comments</p>
            </Link>
            <p>This post has been upvoted {upvotes} times</p>
        </div>
    );
}

export default UpvotesSection;