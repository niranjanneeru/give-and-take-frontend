import { FC } from 'react';
import './tableRow.css';
import Status from '../status/status';
import SkillBlock from '../skillBlock/skillBlock';
import TierLogos from '../tierLogos/tierLogos';
import Tooltip from '@material-ui/core/Tooltip';

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
          <Tooltip title='Delete Employee' arrow placement='top'>
            <img
              src={`assets/icons/delete.svg`}
              onClick={(e) => {
                onDelete();
                e.stopPropagation();
              }}
            />
          </Tooltip>
          <Tooltip title={'Edit Employee'} arrow placement='top'>
            <img
              src={`assets/icons/pencil-edit.svg`}
              onClick={(e) => {
                onEdit();
                e.stopPropagation();
              }}
            />
          </Tooltip>
        </td>
      )}
      {/* render actions on redeem requests list page */}
      {userRole == 'HR' && pageType == 'redeemRequestsList' && (
        <td className='img-td'>
          <Tooltip title={'Approve request'} arrow placement='top'>
            <img
              src={`assets/icons/accept.svg`}
              onClick={(e) => {
                onEdit();
                e.stopPropagation();
              }}
            />
          </Tooltip>
          <Tooltip title={'Reject request'} arrow placement='top'>
            <img
              src={`assets/icons/reject.svg`}
              onClick={(e) => {
                onDelete();
                e.stopPropagation();
              }}
            />
          </Tooltip>
        </td>
      )}
    </tr>
  );
};

export default TableRow;
