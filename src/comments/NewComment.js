import { Input, TextareaAutosize, Button } from '@material-ui/core';
import { UserContext } from 'App';
import React, { useContext, useState } from 'react';
import API from '_helpers/api-helpers';
import { accountService, baseUrl } from '_services';

const NewComment = ({ postID, updatePostComments }) => {
  const user = useContext(UserContext);
  console.log('OUTPUT ~ file: NewComment.js ~ line 9 ~ NewComment ~ user', user);
  const [commenting, setCommenting] = useState(false);
  const [content, setContent] = useState('');
  const clickHandler = () => {
    setCommenting((prev) => !prev);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post(`${baseUrl}/comments`, {
        content,
        user_id: accountService.accountValue.id,
        post_id: postID,
      });
      updatePostComments(data);
      setCommenting((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  const onChange = (e) => {
    setContent(e.target.value);
  };
  return (
    <>
      {!commenting && <Button onClick={clickHandler}>Leave comment</Button>}
      {commenting && (
        <div style={{ minWidth: `45px` }}>
          <form onSubmit={onSubmit}>
            <TextareaAutosize onChange={onChange} value={content} rowsMin={10} />
            <Input type='submit' />
          </form>
        </div>
      )}
    </>
  );
};

export default NewComment;
