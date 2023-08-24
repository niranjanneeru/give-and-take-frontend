import { FC } from 'react';
import './deletePopup.css';
import Button from '../button/button';

type deletePopupTypes = {
  onClose: () => void;
  onConfirm: () => void;
  desc: string;
};

const Popup: FC<deletePopupTypes> = ({ onClose, onConfirm, desc }) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <img src='assets/icons/close.svg' className='close' onClick={onClose} />
        <div className='popHeading'>Are you sure ?</div>
        <div className='popSubheading'>{desc}</div>
        <div className='popupButton'>
          <Button value='Confirm' onClick={onConfirm} className='pop-confirm'></Button>
          <Button value='Cancel' onClick={onClose} className='pop-cancel'></Button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
