import Button from '../button/button';
import './subheader.css';
import type { FC } from 'react';
import { useState } from 'react';

type subheaderProps = {
  heading: string;
  iconText?: string;
  iconImg?: string;
  onClick?: (e) => void;
  handleJoin?: (e) => void;
  taskStatus?: boolean;
  handleAccordian?;
  isTaskPage?: boolean;
  userRole?: string;
  isTask: boolean;
  isEmployeeDetail?: boolean;
  handleApprove?: (e) => void;
  handleDelete?: (e) => void;
  handleEdit?: (e) => void;
  handleAward?: (e) => void;
};

const Subheader: FC<subheaderProps> = ({
  heading,
  onClick,
  handleJoin,
  taskStatus,
  userRole,
  iconImg,
  iconText,
  handleAccordian = null,
  isTask,
  isTaskPage = false, // clean code
  isEmployeeDetail = false,
  handleApprove = null,
  handleDelete = null,
  handleEdit = null,
  handleAward = null
}) => {
  const [icon, setIcon] = useState(`assets/img/icons8-expand-arrow-50.png`);

  return (
    <div className='subheader'>
      <div className='header-div'>
        <div className='heading'>{heading}</div>
        {handleAccordian && (
          <div
            className='accordion'
            onClick={() => {
              handleAccordian();
              if (icon === 'assets/img/icons8-expand-arrow-50.png')
                setIcon('assets/img/icons8-collapse-arrow-50.png');
              else setIcon('assets/img/icons8-expand-arrow-50.png');
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
      {!isTask && userRole === 'LEAD' && iconText && (
        <a className='editTask-button'>
          <Button value={iconText} iconImg={iconImg} onClick={onClick}></Button>
          {isEmployeeDetail && (
            <Button value='Award Bounty' iconImg='dollar1' onClick={handleAward} />
          )}
        </a>
      )}
      {isTaskPage && (
        <div className='editTask-button'>
          {taskStatus && <Button value='  Join   ' onClick={handleJoin} />}
          {userRole === 'LEAD' && <Button value='Approve' onClick={handleApprove} />}
          {userRole === 'LEAD' && <Button value='  Edit   ' onClick={handleEdit} />}
          {userRole === 'LEAD' && <Button value='Delete ' onClick={handleDelete} />}
        </div>
      )}
    </div>
  );
};

export default Subheader;
