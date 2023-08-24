import { FC } from 'react';
import './tableRow.css';
import Status from '../status/status';
import SkillBlock from '../skillBlock/skillBlock';
import TierLogos from '../tierLogos/tierLogos';
type tableRowProps = {
  row: Object;
  onClick: (e) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  userRole: string;
  pageType?: string;
};

const TableRow: FC<tableRowProps> = ({ row, userRole, pageType, onClick, onDelete, onEdit }) => {
  const empKeys = ['name', 'joiningDate', 'role', 'status', 'experience', 'bounty'];
  const taskKeys = ['title', 'deadline', 'bounty', 'skills', 'status', 'Assignees'];
  const redeemRequestsKeys = ['employee', 'bounty'];

  const pageTypeToKeysMap = {
    taskList: taskKeys,
    redeemRequestsList: redeemRequestsKeys,
    employeeList: empKeys
  };

  const keys = pageTypeToKeysMap[pageType];
  //  clean code

  return (
    <tr className='tabled' onClick={onClick}>
      {keys.map((key) => (
        <td key={row[key]}>
          {key === 'status' ? (
            <Status status={row[key]}></Status>
          ) : key === 'Assignees' ? (
            `${row['employees'].length}/${row['maxParticipants']}`
          ) : key === 'skills' ? (
            <SkillBlock value={row['skills']} />
          ) : key === 'role' || key === 'employee' ? (
            row[key].name
          ) : (
            row[key]
          )}
        </td>
      ))}
      {/* render tier logo on employee list page */}
      {pageType == 'employeeList' && (
        <td>
          <TierLogos bounty={row['bounty']} />
        </td>
      )}
      {/* render actions on employee list page */}
      {userRole == 'HR' && pageType == 'employeeList' && (
        <td className='img-td'>
          <img
            src={`assets/icons/delete.svg`}
            onClick={(e) => {
              onDelete();
              e.stopPropagation();
            }}
          />
          <img
            src={`assets/icons/pencil-edit.svg`}
            onClick={(e) => {
              onEdit();
              e.stopPropagation();
            }}
          />
        </td>
      )}
      {/* render actions on redeem requests list page */}
      {userRole == 'HR' && pageType == 'redeemRequestsList' && (
        <td className='img-td'>
          <img
            src={`assets/icons/check.svg`}
            onClick={(e) => {
              onEdit();
              e.stopPropagation();
            }}
          />
          <img
            src={`assets/icons/cross.svg`}
            onClick={(e) => {
              onDelete();
              e.stopPropagation();
            }}
          />
        </td>
      )}
    </tr>
  );
};

export default TableRow;
