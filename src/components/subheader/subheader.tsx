import Button from '../button/button';
import './subheader.css';
import type { FC } from 'react';
import { useState } from 'react';

type subheaderProps = {
  heading: string;
  iconText?: string;
  iconImg?: string;
  onClick?: (e) => void;
  handleAccordian?;
  isTaskPage?: boolean;
  userRole?: string;
  isTask: boolean;
  handleApprove?: (e) => void;
};

const Subheader: FC<subheaderProps> = ({
  heading,
  iconText,
  iconImg,
  onClick,
  userRole,
  handleAccordian = null,
  isTask,
  isTaskPage = false, // clean code
  handleApprove = null
}) => {
  const [icon, setIcon] = useState(`assets/img/accordion-logo.png`);

  return (
    <div className='subheader'>
      <div className='header-div'>
        <div className='heading'>{heading}</div>
        {handleAccordian && (
          <div
            className='accordion'
            onClick={() => {
              handleAccordian();
              if (icon === 'assets/img/accordion-logo.png')
                setIcon('assets/img/accordion-logo-opp.png');
              else setIcon('assets/img/accordion-logo.png');
            }}
          >
            <img src={icon} />
          </div>
        )}
      </div>
      {(isTask || userRole === 'LEAD') && iconText ? (
        <a className='subheader-right' onClick={onClick}>
          <div className='icon-edit'>
            <img src={`assets/icons/${iconImg}.svg`} />
          </div>
          <span>{iconText}</span>
        </a>
      ) : (
        <div></div>
      )}
      {isTaskPage && (
        <div className='editTask-button'>
          <Button value='  Join   ' />
          {userRole === 'LEAD' && <Button value='Approve' onClick={handleApprove} />}
          {userRole === 'LEAD' && <Button value='  Edit   ' />}
          {userRole === 'LEAD' && <Button value='Delete ' />}
        </div>
      )}
    </div>
  );
};

export default Subheader;
