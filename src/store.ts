import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './reducers/employeeReducer';
import employeeApi from './pages/employee/api';

const store = configureStore({
  reducer: { employees: employeeReducer, [employeeApi.reducerPath]: employeeApi.reducer },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), employeeApi.middleware]
});

export default store;
