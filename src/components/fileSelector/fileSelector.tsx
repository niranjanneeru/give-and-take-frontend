import React, { useState } from 'react';
import './style.css';
import Button from '../button/button';

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
        <img
          className='close-button-drag-nd-drop'
          src='/assets/icons/close.svg'
          onClick={setVisible}
        />
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
      </div>
    </div>
  );
}

export default FileSelector;
