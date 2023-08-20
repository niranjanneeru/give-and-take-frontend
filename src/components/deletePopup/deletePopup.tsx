import { FC } from 'react';
import './deletePopup.css';

type deletePopupTypes = {
  onClose: () => void;
  onConfirm: () => void;
};

const DeletePopup: FC<deletePopupTypes> = ({ onClose, onConfirm }) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <img src='assets/icons/close.svg' className='close' onClick={onClose} />
        <div className='popHeading'>Are you sure ?</div>
        <div className='popSubheading'>Do you really want to delete employee ?</div>
        <div className='popupButton'>
          <input type='submit' value='Confirm' className='pop-confirm' onClick={onConfirm} />
          <input type='submit' value='Cancel' className='pop-cancel' onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
