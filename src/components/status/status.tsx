import type { FC } from 'react';
import './status.css';

type statusProps = {
  status: string;
};

const Status: FC<statusProps> = ({ status }) => {
  const statusMap = {
    ACTIVE: { label: 'Active', color: '#d3f4be' },
    INACTIVE: { label: 'Inactive', color: '#ffbfbf' },
    PROBATION: { label: 'Terminated', color: '#f5ecb8' },
    CREATED: { label: 'Created', color: '#e3dc8f' },
    IN_PROGRESS: { label: 'In Progress', color: '#cae386' },
    COMPLETED: { label: 'Completed', color: '#37e640' },
    REQUEST_CHANGE: { label: 'Change Required', color: '#c4877e' }
  };

  return (
    <div className='status' style={{ backgroundColor: statusMap[status].color }}>
      {statusMap[status].label}
    </div>
  );
};

export default Status;
