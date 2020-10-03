import React, { useState, useEffect } from "react";
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
function Boasts(){
    const [posts, setPosts] = useState([]);
    const handle_upvote = (id) => {
        axios.post(`http://localhost:8000/api/posts/${id}/upvote/`)
        .then((res) => console.log(res.data))
    }
    const handle_downvote = (id) => {
        axios.post(`http://localhost:8000/api/posts/${id}/downvote/`)
        .then((res) => console.log(res.data))
    }
    useEffect(() => {
        axios.get("http://localhost:8000/api/posts/boastsonly/")
        .then((res) => setPosts(res.data))
    }, []);
    return (
        <div className="container-md">
            {posts.map((post) => (
                <Card style={{ width: '25rem' }} key={post.id}>
                <Card.Body>
                  <Card.Title>{post.boast ? 'Boast' : 'Roast'}</Card.Title>
                  <Card.Text>
                    {post.text} <br/>
                    Posted Date: {post.postdate} <br/>
                    Up Votes: {post.upvote} <br/>
                    Down Votes: {post.downvote} <br/>
                    Total Score: {post.score} <br/>
                  </Card.Text>
                  <Button 
                    variant="info" 
                    as="input" 
                    type="button"
                    onClick={() => handle_upvote(post.id)}
                    value="Up Vote" />
                    <Button 
                    variant="dark" 
                    as="input" 
                    type="button"
                    onClick={() => handle_downvote(post.id)}
                    value="Down Vote" />
                </Card.Body>
              </Card>
            )
            )}
        </div>
    )
}
export default Boasts