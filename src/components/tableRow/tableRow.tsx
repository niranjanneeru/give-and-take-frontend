import { FC } from 'react';
import './tableRow.css';
import Status from '../status/status';
import SkillBlock from '../skillBlock/skillBlock';
import { getTier } from '../../utils/tiers';
type tableRowProps = {
  row: Object;
  onClick: (e) => void;
  onEdit?: (e) => void;
  onDelete?: (e) => void;
  userRole: string;
  isTask: boolean;
};

const TableRow: FC<tableRowProps> = ({ row, userRole, isTask, onClick, onDelete, onEdit }) => {
  const empKeys = ['name', 'joiningDate', 'role', 'status', 'experience', 'bounty'];
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
      {!isTask && (
        <td>
          <img className='tier' src={`/assets/img/tiers/${getTier(row['bounty'])}.png`} />
        </td>
      )}
      {userRole == 'LEAD' && !isTask && (

        <td className='img-td'>
          <img src={`assets/icons/delete.svg`} onClick={onDelete} />
          <img src={`assets/icons/pencil-edit.svg`} onClick={onEdit} />
        </td>
      )}
    </tr>
  );
};

export default TableRow;
