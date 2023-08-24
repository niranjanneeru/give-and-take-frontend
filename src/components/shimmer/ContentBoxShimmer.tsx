import './Shimmer.css';
import { ShimmerContentBlock } from 'react-shimmer-effects';

const ContentBoxShimmer = () => {
  return (
    <div className='shimmer-div' style={{ width: '100%' }}>
      <ShimmerContentBlock title text cta thumbnailWidth={370} thumbnailHeight={370} />
    </div>
  );
};

export default ContentBoxShimmer;
