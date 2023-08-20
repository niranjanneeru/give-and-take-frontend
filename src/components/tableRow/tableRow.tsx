import { FC } from 'react';
import './tableRow.css';
import Status from '../status/status';
type tableRowProps = {
  employee: Object;
  onClick: (e) => void;
  onEdit: (e) => void;
  onDelete: (e) => void;
  onAward: (e) => void;
  userRole: string;
};

const TableRow: FC<tableRowProps> = ({
  employee,
  onClick,
  onDelete,
  onEdit,
  onAward,
  userRole
}) => {
  const keys = ['name', 'id', 'joiningDate', 'role', 'status', 'experience', 'bounty'];

  return (
    <tr className='tabled'>
      {keys.map((key) => (
        <td key={employee[key]} onClick={onClick}>
          {key === 'status' ? <Status status={employee[key]}></Status> : employee[key]}
        </td>
      ))}
      {userRole == 'HR' && (
        <td className='img-td'>
          <img src={`assets/icons/delete.svg`} onClick={onDelete} />
          <img src={`assets/icons/pencil-edit.svg`} onClick={onEdit} />
          <img src={`assets/icons/dollar1.svg`} onClick={onAward} />
        </td>
      )}
    </tr>
  );
};

export default TableRow;
