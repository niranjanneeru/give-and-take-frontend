import { setRole } from '../actions/employeeActions';
import { createReducer } from '@reduxjs/toolkit';

const initialstate = { userRole: null };

const employeeReducer = createReducer(initialstate, (builder) => {
  builder.addCase(setRole, (state, action) => {
    return { ...state, userRole: action.payload };
  });
});

export default employeeReducer;
