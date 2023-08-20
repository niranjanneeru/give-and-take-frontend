import type { FC } from 'react';
import './status.css';

type statusProps = {
  status: string;
};

const Status: FC<statusProps> = ({ status }) => {
  const statusMap = {
    ACTIVE: { label: 'Active', color: '#d3f4be' },
    INACTIVE: { label: 'Inactive', color: '#ffbfbf' },
    PROBATION: { label: 'Terminated', color: '#f5ecb8' }
  };

  return (
    <div className='status' style={{ backgroundColor: statusMap[status].color }}>
      {statusMap[status].label}
    </div>
  );
};

export default Status;
