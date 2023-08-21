import type { FC } from 'react';
import './styles/global.css';
import Login from './pages/login/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeePage from './pages/employee/employee';
import EmployeeDetails from './pages/employeeDetails/employeeDetails';
import CreateEmployee from './pages/createEmployee/createEmployee';
import TaskDetails from './pages/taskDetails/taskDetails';
import TaskListPage from './pages/task/task';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/employees' element={<EmployeePage />} />
        <Route path='/employees/:id' element={<EmployeeDetails />} />
        <Route path='/employees/create' element={<CreateEmployee />} />
        <Route path='/employees/edit/:id' element={<CreateEmployee />} />
        <Route path='/tasks/:id' element={<TaskDetails />} />
        <Route path='/tasks' element={<TaskListPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
