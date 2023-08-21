export default function CommentInput() {
  return (
    <div className='commentBox'>
      <div className='comment-text' contentEditable='true'>
        <textarea className='comment-textbox' placeholder='Type your message...'></textarea>
      </div>
      <div className='send'>
        <button className='file-button'>
          <img src='assets/img/add.png' />
        </button>
        <button className='send-button'>
          <img src='assets/img/send.png' />
        </button>
      </div>
    </div>
  );
}
