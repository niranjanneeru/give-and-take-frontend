import Button from '../button/button';
import './subheader.css';
import type { FC } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import _ from 'lodash';

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
  isUser?: boolean;
  handleRedeemRequest?: (e) => void;
  handleApprove?: (e) => void;
  handleDelete?: (e) => void;
  handleEdit?: (e) => void;
  handleFilter?: (e) => void;
  handleAward?: (e) => void;
  setSearchText?: (e) => void;
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
  isTaskPage = false,
  isEmployeeDetail = false,
  isUser = false,
  handleApprove = null,
  handleDelete = null,
  handleEdit = null,
  handleFilter,
  handleAward = null,
  handleRedeemRequest = null,
  setSearchText = null
}) => {
  const [icon, setIcon] = useState(`assets/img/icons8-expand-arrow-50.png`);
  const searchDebounce = useMemo(
    () =>
      _.debounce(
        (e) => {
          setSearchText(e.target.value);
        },
        250,
        { maxWait: 1000 }
      ),
    []
  );

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

      <a className='editTask-button'>
        {setSearchText && (
          <div className='search-input'>
            <input className='search-button' placeholder='Search' onChange={searchDebounce}></input>
          </div>
        )}
        {isTask && (
          <>
            <Button value='Create task' iconImg={'plus'} onClick={onClick}></Button>
            <Button value='Filter task' iconImg={'filter'} handleFilter={handleFilter}></Button>
          </>
        )}
      </a>
      {!isTask && iconText && (
        <a className='editTask-button'>
          {userRole === 'HR' && (
            <Button value={iconText} iconImg={iconImg} onClick={onClick}></Button>
          )}
          {isEmployeeDetail && userRole === 'LEAD' && (
            <Button value='Award Bounty' iconImg='dollar1' onClick={handleAward} />
          )}
          {isEmployeeDetail && isUser && (
            <Button value='Redeem Bounty' iconImg='dollar1' onClick={handleRedeemRequest} />
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
