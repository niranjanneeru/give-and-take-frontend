import { useEffect, useState } from 'react';
import Input from '../../components/Input/input';
import Button from '../../components/button/button';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useLoginMutation } from './api';
import { useDispatch } from 'react-redux';
import { setRole } from '../../actions/employeeActions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const [login, { data, isSuccess }] = useLoginMutation();

  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    if (email.length == 0 || password.length == 0) setError(true);
    else
      login({
        email: email,
        password: password
      });
  };

  useEffect(() => {
    if (data && isSuccess) {
      localStorage.setItem('token', data.data.token);
      dispatch(setRole(data.data.role));
      navigate('/employees');
    }
  }, [data, isSuccess]);

  return (
    <section>
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
            <Input label='Password' type='password' value={password} onChange={setPassword}></Input>
            {error && <div>Provide username and Password</div>}
            <Button value='Login' onClick={submit}></Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
