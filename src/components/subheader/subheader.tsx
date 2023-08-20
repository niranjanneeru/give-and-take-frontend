import Button from '../button/button';
import './subheader.css';
import type { FC } from 'react';
import { useState } from 'react';

type subheaderProps = {
  heading: string;
  iconText?: string;
  iconImg?: string;
  onClick?: (e) => void;
  userRole: string;
  handleAccordian;
  isTaskPage?: boolean;
};

const Subheader: FC<subheaderProps> = ({
  heading,
  iconText,
  iconImg,
  onClick,
  userRole,
  handleAccordian = () => {},
  isTaskPage = false
}) => {
  const [icon, setIcon] = useState(`assets/img/accordion-logo.png`);

  return (
    <div className='subheader'>
      <div className='header-div'>
        <div className='heading'>{heading}</div>
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
      </div>
      {userRole == 'admin' && iconText ? (
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
          <Button value='Approve' />
          <Button value='Edit Task' />
        </div>
      )}
    </div>
  );
};

export default Subheader;
