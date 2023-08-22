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
  onClick,
  userRole,
  iconImg,
  iconText,
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
      {isTask && userRole === 'LEAD' && (
        <a className='editTask-button'>
          <Button value='Create Task' iconImg={'plus'} onClick={onClick}></Button>
          <Button value='Filter task' iconImg={'filter'}></Button>
        </a>
      )}
      {!isTask && userRole === 'LEAD' && (
        <a className='editTask-button' onClick={onClick}>
          <Button value={iconText} iconImg={iconImg}></Button>
        </a>
      )}
      {isTaskPage && (
        <div className='editTask-button'>
          <Button value='Join' />
          {userRole === 'LEAD' && <Button value='Approve' onClick={handleApprove} />}
          {userRole === 'LEAD' && <Button value='Edit' />}
          {userRole === 'LEAD' && <Button value='Delete ' />}
        </div>
      )}
    </div>
  );
};

export default Subheader;
