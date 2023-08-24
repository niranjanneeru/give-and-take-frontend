import React from 'react';
import './tableHeader.css';
import Table from '../table/Table';

type tableHeaderPropsType = {
  userRole: string;
  isTask: boolean;
  showPopup?: () => void;
  hidePopup?: () => void;
};

const TableHeader: React.FC<tableHeaderPropsType> = ({ userRole, isTask }) => {
  const empHeaderData = [
    'Employee Name',
    'Joining Date',
    'Role',
    'Status',
    'Experience',
    'Bounty Points',
    'Tier'
  ];

  const taskHeaderData = [
    'Task Title',
    'Deadline',
    'Bounty',
    'Skills Required',
    'Status',
    'Assignees'
  ];

  const tiersData = [
    { tier: 'Bronze', points: '25 points', rewards: '2000' },
    { tier: 'Silver', points: '50 points', rewards: '3000' },
    { tier: 'Gold', points: '75 points', rewards: '5000' },
    { tier: 'Platinum', points: '100 points', rewards: '8000' }
  ];

  if (userRole == 'LEAD') empHeaderData.push('Action');
  const headerData = isTask ? taskHeaderData : empHeaderData;

  return (
    <div>
      <th className='tableHeader'>
        {headerData.map((item) => (
          <td key={item}>
            {item === 'Tier' ? (
              <div className='tier-header-div'>
                Tier
                <img src='assets/icons/info.svg' alt='info logo' />
                <div className='tier-content-div'>
                  <h5>Bounty Tiers and Rewards</h5>
                  <Table data={tiersData} />
                </div>
              </div>
            ) : (
              item
            )}
          </td>
        ))}
      </th>
    </div>
  );
};

export default TableHeader;
