import './tableHeader.css';

const TableHeader = ({ userRole, isTask }) => {
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

  if (userRole == 'LEAD') empHeaderData.push('Action');
  const headerData = isTask ? taskHeaderData : empHeaderData;

  return (
    <th className='tableHeader'>
      {headerData.map((item) => (
        <td key={item}>{item}</td>
      ))}
    </th>
  );
};

export default TableHeader;
