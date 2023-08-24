import './Comment.css';
import MarkDownRenderer from '../markdownRenderer/markdownRenderer';
import React from 'react';
import { dateToReadableFormat } from '../../utils/dateSuffix';

type CommentPropsType = {
  author: string;
  date: string;
  comment: string;
  attachment: string;
  isCurrentUserComment: boolean;
};

const Comment: React.FC<CommentPropsType> = ({
  author,
  date,
  comment,
  attachment,
  isCurrentUserComment
}) => {
  console.log(attachment);

  return (
    <div className={isCurrentUserComment ? 'send-comment' : 'received-comment'}>
      <div className='comment-creator'>
        <div>
          <span style={{ fontWeight: 600 }}>{`${author}  `} </span>
          <span className='comment-date'>{dateToReadableFormat(date)}</span>
        </div>
      </div>
      <div className='comment-content'>
        <MarkDownRenderer content={comment} />
      </div>
      {attachment && (
        <div
          className='comment-attachment'
          style={{ color: '#535778' }}
          onClick={() => {
            window.open(`http://localhost:8000${attachment}`, '_blank');
          }}
        >
          Attachment
        </div>
      )}
    </div>
  );
};

export default Comment;
