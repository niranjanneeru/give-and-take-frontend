import React, { useState } from 'react';
import './style.css';
import Button from '../button/button';
import Tooltip from '@material-ui/core/Tooltip';

function FileSelector({ setVisible, handleFileUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];

    setSelectedFile(file);
  };

  const uploadFile = () => {
    setVisible();
    handleFileUpload(selectedFile);
  };

  return (
    <div className='outer-dropzone'>
      <div className='mid-dropzone'>
        <Tooltip title={'Close'} arrow placement='top'>
          <img
            className='close-button-drag-nd-drop'
            src='/assets/icons/close.svg'
            onClick={setVisible}
          />
        </Tooltip>
        <div
          className={`dropzone ${isDragging ? 'dragging' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {selectedFile ? (
            <div>
              <p>Selected File: {selectedFile.name}</p>
              <Button
                value='Clear'
                onClick={() => {
                  setSelectedFile(null);
                }}
              ></Button>
              <Button value='Upload' onClick={uploadFile}></Button>
            </div>
          ) : (
            <p>Drag and drop a file here</p>
          )}
        </div>
        {!selectedFile && (
          <input
            type='file'
            onChange={(e) => {
              const file = e.target.files[0];

              setSelectedFile(file);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default FileSelector;
