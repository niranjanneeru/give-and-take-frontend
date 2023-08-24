import { useNavigate } from 'react-router-dom';
import './page404.css';

export default function Page404() {
  const navigate = useNavigate();
  const handleNavigateToHomepage = () => {
    navigate('/');
  };

  return (
    <div className='main-404'>
      <div className='fof'>
        <h1>Error 404</h1>
        <h3>Looks like you are lost</h3>
        <h4 onClick={handleNavigateToHomepage}>Go to homepage</h4>
      </div>
    </div>
  );
}
