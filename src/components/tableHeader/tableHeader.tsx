import './tableHeader.css';

const TableHeader = ({ userRole }) => {
  console.log(userRole);
  const headerData = [
    'Employee Name',
    'Employee ID',
    'Joining Date',
    'Role',
    'Status',
    'Experience',
    'Bounty Points',
    userRole == 'HR' ? 'Action' : null
  ];

  return (
    <th className='tableHeader'>
      {headerData.map((item) => (
        <td key={item}>{item}</td>
      ))}
    </th>
  );
};

export default TableHeader;
