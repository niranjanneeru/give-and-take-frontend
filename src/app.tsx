import type { FC } from 'react';
import './styles/global.css';
import Login from './pages/login/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeePage from './pages/employee/employee';
import EmployeeDetails from './pages/employeeDetails/employeeDetails';
import CreateEmployee from './pages/createEmployee/createEmployee';
import CreateEditTask from './pages/createEditTask/createEditTask';
import TaskDetails from './pages/taskDetails/taskDetails';
import TaskListPage from './pages/task/task';
import HomePage from './pages/homepage/homepage';
import AboutPage from './pages/about/About';
import RedeemRequestPage from './pages/redeemRequests/redeemRequests';



const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/employees' element={<EmployeePage />} />
        <Route path='/employees/:id' element={<EmployeeDetails />} />
        <Route path='/employees/create' element={<CreateEmployee />} />
        <Route path='/employees/edit/:id' element={<CreateEmployee />} />
        <Route path='/tasks/create' element={<CreateEditTask />} />
        <Route path='/tasks/edit/:id' element={<CreateEditTask />} />
        <Route path='/tasks/:id' element={<TaskDetails />} />
        <Route path='/tasks' element={<TaskListPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/redeem-requests' element={<RedeemRequestPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
