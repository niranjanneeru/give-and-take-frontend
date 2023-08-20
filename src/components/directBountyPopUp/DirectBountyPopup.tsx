import { FC, useState } from 'react';
import './DirectBountyPopup.css';
import PopupInput from '../popupInput/PopupInput';
import TextArea from '../TextArea/TextArea';

type DirectBountyPopupType = {
  onClose: () => void;
  onConfirm: () => void;
};

const DirectBountyPopup: FC<DirectBountyPopupType> = ({ onClose, onConfirm }) => {
  const [bountyPoints, setBountyPoints] = useState(0);
  const [reason, setReason] = useState('');

  const handleBountyChange = (e: any) => {
    if (+e.target.value <= 0) {
      setBountyPoints(0);

      return;
    }
    setBountyPoints(e.target.value);
  };

  const handleReasonChange = (e: any) => {
    setReason(e.target.value);
  };

  return (
    <div className='modal'>
      <div className='modal-content1'>
        <img src='assets/icons/close.svg' className='close' onClick={onClose} />
        <div className='popHeading1'>Award Direct Bounty</div>
        <div className='award-bounty-form'>
          <div className='bounty-div'>
            <PopupInput
              placeholder='Bounty points'
              label='Bounty points'
              type='number'
              value={bountyPoints}
              onChange={handleBountyChange}
            />
          </div>
          <div className='reason-div'>
            <TextArea
              rows={5}
              cols={60}
              placeholder='Reason'
              label='Reason'
              value={reason}
              onChange={handleReasonChange}
            />
          </div>
        </div>
        <div className='popupButton1'>
          <input type='submit' value='Award' className='pop-confirm' onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default DirectBountyPopup;
