import React, { useEffect, useState } from 'react'
import Commens from './comment.jsx'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { commentSuccess } from '../../redux/comment.Slice.js';
import { url } from '../utils/domain.jsx';

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;
const CommentButtons = styled.div`
width: 100%;
display: flex;
justify-content: flex-end;`;
const Button = styled.button`
background-color:  #999;
border: 1px solid ${({theme})=> theme.soft};
padding: 5px;
border-radius: 4px;
color: ${({theme})=> theme.text};
cursor: pointer;

`;
export default function Comments({videoId}) {

  const { currentUser } = useSelector((state) => state.user);
  const [userComment, setUserComment] = useState(undefined)
  const dispatch = useDispatch();

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${url}/api/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  const commentHandler = async (id)=>{
    const res = await axios.post(`${url}/api/comments`,{
      desc: userComment,
      videoId: id,
    },{
      withCredentials: true,
    });
    console.log('commentRes', res);
    dispatch(commentSuccess(res.data))
    window.location.reload()
  }

  return (
<Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input placeholder="Add a comment..." onChange={(e)=> setUserComment(e.target.value)} />
        <CommentButtons>
         {userComment && <Button onClick={()=>commentHandler(videoId)}>Comment</Button>}
        </CommentButtons>
      </NewComment>
      {comments.map(comment=>(
  <Commens key={comment._id} comment={comment}/>
))}
    </Container>    
  )
}
