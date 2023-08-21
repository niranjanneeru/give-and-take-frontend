import React, { useState } from 'react';
export default function CommentInput() {
  const [showPreview, setShowPreview] = useState(true);

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className='commentBox'>
      <div className='comment-text' contentEditable='true'>
        <textarea className='comment-textbox' placeholder='Type your message...'></textarea>
      </div>
      <div className='send'>
        <button className='file-button'>
          <img src='assets/img/add.png' />
        </button>
        <button className='preview-button' onClick={togglePreview}>
          {showPreview ? <img src='assets/img/view.png' /> : <img src='assets/img/hide.png' />}
        </button>
        <button className='send-button'>
          <img src='assets/img/send.png' />
        </button>
      </div>
    </div>
  );
}
