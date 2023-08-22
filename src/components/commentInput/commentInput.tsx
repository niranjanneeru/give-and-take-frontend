import React, { useState } from 'react';
import FileSelector from '../fileSelector/fileSelector';

export default function CommentInput({ sendComment, uploadFile }) {
  const [markdownText, setMarkdownText] = useState('');
  const [fileSelection, setFileSelectionPopUp] = useState(false);

  const [showPreview, setShowPreview] = useState(true);

  const togglePreview = () => {
    setShowPreview(!showPreview);

  
  const handleSend = () => {
    if (markdownText.trim() === '') return;
    sendComment(markdownText);
    setMarkdownText('');
  };

  return (
    <div className='commentBox'>
      <div className='comment-text' contentEditable='true'>
        <textarea
          className='comment-textbox'
          placeholder='Type your message...'
          onChange={(e) => {
            setMarkdownText(e.target.value);
          }}
          value={markdownText}
        ></textarea>
      </div>
      <div className='send'>
        <button
          className='file-button'
          onClick={() => {
            setFileSelectionPopUp(true);
          }}
        >
          <img src='assets/img/add.png' />
        </button>
        <button className='preview-button' onClick={togglePreview}>
          {showPreview ? <img src='assets/img/view.png' /> : <img src='assets/img/hide.png' />}
        </button>
        <button className='send-button' onClick={handleSend}>
          <img src='assets/img/send.png' />
        </button>
      </div>
      {fileSelection && (
        <FileSelector
          handleFileUpload={uploadFile}
          setVisible={() => {
            setFileSelectionPopUp(false);
          }}
        />
      )}
    </div>
  );
}
