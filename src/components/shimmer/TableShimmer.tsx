import './Shimmer.css';
import { ShimmerTable } from 'react-shimmer-effects';

const TableShimmer = () => {
  return (
    <div className='shimmer-div'>
      <ShimmerTable row={7} col={8} />
    </div>
  );
};

export default TableShimmer;
