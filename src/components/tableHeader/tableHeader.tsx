import './tableHeader.css';
import type { FC } from 'react';

type tableHeaderProps = {
  userRole?: string;
  page: string;
};

const TableHeader: FC<tableHeaderProps> = ({ userRole, page }) => {
  console.log(userRole);
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

  let headerData = [];

  const redeemHeaderData = ['Employee Name', 'Requested Bounty'];

  if (userRole == 'HR') empHeaderData.push('Action') && redeemHeaderData.push('Action');

  if (page == 'task') headerData = taskHeaderData;
  else if (page == 'employee') headerData = empHeaderData;
  else if (page == 'redeemRequestsList') headerData = redeemHeaderData;

  return (
    <th className='tableHeader'>
      {headerData.map((item) => (
        <td key={item}>{item}</td>
      ))}
    </th>
  );
};

export default TableHeader;
