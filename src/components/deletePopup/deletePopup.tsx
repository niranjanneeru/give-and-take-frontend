import { FC } from 'react';
import './deletePopup.css';
import Button from '../button/button';
import Tooltip from '@material-ui/core/Tooltip';

type deletePopupTypes = {
  onClose: () => void;
  onConfirm: () => void;
  desc: string;
};

const Popup: FC<deletePopupTypes> = ({ onClose, onConfirm, desc }) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <Tooltip title={'Preview'} arrow placement='right'>
          <img src='assets/icons/close.svg' className='close' onClick={onClose} />
        </Tooltip>
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
