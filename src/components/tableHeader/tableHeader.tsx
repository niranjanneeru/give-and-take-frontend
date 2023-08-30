import React from 'react';
import './tableHeader.css';
import Table from '../table/Table';
import type { FC } from 'react';

type tableHeaderProps = {
  userRole?: string;
  page: string;
};

const TableHeader: FC<tableHeaderProps> = ({ userRole, page }) => {
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

  const tiersHeaderData = ['Tier', 'Points', 'Rewards'];

  const tiersContentData = [
    { tier: 'Bronze', points: '25', rewards: 'Rs 2000' },
    { tier: 'Silver', points: '50', rewards: 'Rs 3000' },
    { tier: 'Gold', points: '75', rewards: 'Rs 5000' },
    { tier: 'Platinum', points: '100', rewards: 'Rs 8000' }
  ];

  let headerData = [];

  const redeemHeaderData = ['Employee Name', 'Requested Bounty'];

  if (userRole == 'HR') empHeaderData.push('Action') && redeemHeaderData.push('Action');

  if (page == 'task') headerData = taskHeaderData;
  else if (page == 'employee') headerData = empHeaderData;
  else if (page == 'redeemRequestsList') headerData = redeemHeaderData;

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
                  <h3 style={{ marginTop: '8px', marginBottom: '-8px' }}>
                    Bounty Tiers and Rewards
                  </h3>
                  <Table headerData={tiersHeaderData} contentData={tiersContentData} />
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
