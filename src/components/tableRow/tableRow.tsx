import { FC } from 'react';
import './tableRow.css';
import Status from '../status/status';
import SkillBlock from '../skillBlock/skillBlock';
type tableRowProps = {
  row: Object;
  onClick: (e) => void;
  onEdit?: (e) => void;
  onDelete?: (e) => void;
  onAward?: (e) => void;
  userRole: string;
  isTask: boolean;
};

const TableRow: FC<tableRowProps> = ({
  row,
  userRole,
  isTask,
  onClick,
  onDelete,
  onEdit,
  onAward
}) => {
  const empKeys = ['name', 'id', 'joiningDate', 'role', 'status', 'experience', 'bounty'];
  const taskKeys = ['title', 'deadline', 'bounty', 'skills', 'status', 'Assignees'];

  const keys = isTask ? taskKeys : empKeys;

  return (
    <tr className='tabled'>
      {keys.map((key) => (
        <td key={row[key]} onClick={onClick}>
          {key === 'status' ? (
            <Status status={row[key]}></Status>
          ) : key === 'Assignees' ? (
            `${row['employees'].length}/${row['maxParticipants']}`
          ) : key === 'skills' ? (
            <SkillBlock value={row['skills']} />
          ) : key === 'role' ? (
            row[key].name
          ) : (
            row[key]
          )}
        </td>
      ))}
      {userRole == 'LEAD' && !isTask && (
        <td className='img-td'>
          <img src={`assets/icons/delete.svg`} onClick={onDelete} />
          <img src={`assets/icons/pencil-edit.svg`} onClick={onEdit} />
          {onAward && <img src={`assets/icons/dollar1.svg`} onClick={onAward} />}
        </td>
      )}
    </tr>
  );
};

export default TableRow;
