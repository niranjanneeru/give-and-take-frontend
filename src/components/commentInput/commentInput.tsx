import React, { useState } from 'react';
import FileSelector from '../fileSelector/fileSelector';
import './commentInput.css';
import PreviewComponent from '../previewComponent/previewComponent';

export default function CommentInput({ sendComment, uploadFile }) {
  const [markdownText, setMarkdownText] = useState('');
  const [fileSelection, setFileSelectionPopUp] = useState(false);

  const [showPreview, setShowPreview] = useState(true);

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const receiveMarkdown = (text) => {
    setMarkdownText(text);
  };

  const handleSend = () => {
    if (markdownText.trim() === '') return;
    sendComment(markdownText);
    setMarkdownText('');
  };

  return (
    <div className='commentBox'>
      <div className='comment-text'>
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
          <img className='comment-box-icons' src='assets/img/add.png' />
        </button>
        <button className='preview-button' onClick={togglePreview}>
          {showPreview ? (
            <img className='comment-box-icons' src='assets/img/view.png' />
          ) : (
            <img className='comment-box-icons' src='assets/img/hide.png' />
          )}
        </button>
        <button className='send-button' onClick={handleSend}>
          <img className='comment-box-icons' src='assets/img/send.png' />
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
      {!showPreview && (
        <PreviewComponent
          value={markdownText}
          setVisible={() => {
            togglePreview();
          }}
          sendMarkdown={receiveMarkdown}
        />
      )}
    </div>
  );
}
