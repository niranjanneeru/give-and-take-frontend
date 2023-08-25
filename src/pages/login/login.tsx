import { useEffect, useState } from 'react';
import Input from '../../components/Input/input';
import Button from '../../components/button/button';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useLoginMutation } from './api';
import { useDispatch } from 'react-redux';
import { setRole } from '../../actions/employeeActions';
import CustomSnackbar from '../../components/snackbar/snackbar';
import RotateLoader from 'react-spinners/RotateLoader';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();


  const [login, { data, isSuccess, isError, error: errLogin, isLoading }] = useLoginMutation();

  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    if (email.length == 0 || password.length == 0) {
      setMessage('Empty Fields');
      setError(true);
    } else {
      login({
        email: email,
        password: password
      });
    }
  };

  useEffect(() => {
    if (isError) {
      if (errLogin['status'] === 400) {
        setMessage('Invalid Email or Password');
        setError(true);

        return;
      }
      setMessage(errLogin['data']['message']);
      setError(true);
    }
  }, [isError]);

  useEffect(() => {
    if (data && isSuccess) {
      localStorage.setItem('token', data.data.token);
      dispatch(setRole(data.data.role));
      navigate('/employees');
    }
  }, [data, isSuccess]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;

    setError(false);
  };

  return (
    <section>
      {isLoading ? (
        <div className='spinner-div'>
          <RotateLoader color='#fff' loading speedMultiplier={0.75} />
        </div>
      ) : (
        <>
          <div className='section1'>
            <div>
              <img src='assets/img/banner.png' className='login' />
            </div>
          </div>
          <div className='section2'>
            <div>
              <div className='logo'>
                <img src='assets/img/kv logo.png' className='logo' />
              </div>
              <div className='login-form'>
                <Input label='Email' type='text' value={email} onChange={setEmail}></Input>
                <Input
                  label='Password'
                  type='password'
                  value={password}
                  onChange={setPassword}
                ></Input>
                <Button value='Login' onClick={submit}></Button>
              </div>
            </div>
          </div>
          <CustomSnackbar
            open={error}
            handleClose={handleClose}
            message={message}
            severity='error'
          />
        </>
      )}
    </section>
  );
};

export default Login;
