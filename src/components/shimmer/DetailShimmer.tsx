import './Shimmer.css';
import { ShimmerPostDetails } from 'react-shimmer-effects';

const DetailShimmer = () => {
  return (
    <div className='shimmer-div'>
      <ShimmerPostDetails card cta variant='SIMPLE' />;
    </div>
  );
};

export default DetailShimmer;
