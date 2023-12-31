import { FC } from 'react';
import './DirectBountyPopup.css';
import PopupInput from '../popupInput/PopupInput';
import TextArea from '../textArea/TextArea';
import Button from '../button/button';
import Tooltip from '@material-ui/core/Tooltip';

type DirectBountyPopupType = {
  onClose: () => void;
  onConfirm: () => void;
  bounty: number;
  reason?: string;
  setBounty: (number) => void;
  setReason?: (string) => void;
  isDirectBounty?: boolean;
};

const DirectBountyPopup: FC<DirectBountyPopupType> = ({
  onClose,
  onConfirm,
  bounty,
  reason,
  setBounty,
  setReason,
  isDirectBounty = true
}) => {
  const handleBountyChange = (e: any) => {
    if (+e.target.value < 0) {
      setBounty(0);

      return;
    }
    setBounty(e.target.value);
  };

  const handleReasonChange = (e: any) => {
    setReason(e.target.value);
  };

  const class_popup = isDirectBounty ? 'direct-popup' : 'redeem-popup';
  const popup_text = isDirectBounty ? 'Award Direct Bounty' : 'Redeem Bounty(multiple of 25)';

  return (
    <div className='modal'>
      <div className='modal-content1'>
        <Tooltip title={'Close'} arrow placement='bottom'>
          <img src='assets/icons/close.svg' className='close' onClick={onClose} />
        </Tooltip>
        <div className={class_popup}>{popup_text}</div>
        <div className='award-bounty-form'>
          <div className='bounty-div'>
            <PopupInput
              placeholder='Bounty points'
              label='Bounty points'
              type='number'
              value={bounty}
              onChange={handleBountyChange}
            />
          </div>
          {isDirectBounty && (
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
          )}
        </div>
        <div className='popupButton1'>
          <Button
            value='Confirm'
            onClick={() => {
              onConfirm();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DirectBountyPopup;
