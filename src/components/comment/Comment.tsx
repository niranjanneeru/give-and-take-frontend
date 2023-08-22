import './Comment.css';
import MarkDownRenderer from '../markdownRenderer/markdownRenderer';
import React from 'react';
import { dateToReadableFormat } from '../../utils/dateSuffix';

type CommentPropsType = {
  author: string;
  date: string;
  comment: string;
  attachment: string;
};

const Comment: React.FC<CommentPropsType> = ({ author, date, comment, attachment }) => {
  return (
    <div className='comment-div'>
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
        <div className='comment-attachment' style={{ color: '#535778' }}>
          <a href={attachment} target='blank'>
            Attachment
          </a>
        </div>
      )}
    </div>
  );
};

export default Comment;
