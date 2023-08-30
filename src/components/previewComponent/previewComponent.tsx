import { useEffect, useState } from 'react';
import MarkDownRenderer from '../markdownRenderer/markdownRenderer';
import './style.css';

const PreviewComponent = ({ setVisible, value, sendMarkdown }) => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    setMarkdown(value);
  }, []);

  return (
    <div className='outer-mark-disp'>
      <div className='overlay-markdown'>
        <div className='markdown-editor-container'>
          <div className='markdown-editor-input'>
            <textarea
              className='editor-input'
              placeholder='Type Markdown here...'
              value={markdown}
              onChange={(e) => {
                setMarkdown(e.target.value);
              }}
            />
          </div>
          <div className='markdown-editor-preview'>
            <MarkDownRenderer content={markdown} />
          </div>
        </div>
        <div className='button-container-markdown'>
          <button
            className='send-button-markdown'
            onClick={() => {
              sendMarkdown(markdown);
              setVisible();
            }}
          >
            Send
          </button>
          <button className='cancel-button-markdown' onClick={setVisible}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewComponent;
