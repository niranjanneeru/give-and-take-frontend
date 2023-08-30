import Layout from '../../components/layout/layout';
import { useEffect, useState } from 'react';
import './createEmployee.css';
import FormInput from '../../components/formInput/formInput';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCreateEmployeeMutation,
  useGetDepartmentOptionsQuery,
  useGetRolesOptionsQuery,
  useUpdateEmployeeMutation
} from './api';
import { useLazyGetEmployeeByIDQuery } from '../employeeDetails/api';
import { useGetUserQuery } from '../employee/api';
import DetailShimmer from '../../components/shimmer/DetailShimmer';
import Button from '../../components/button/button';

const CreateEmployee = () => {
  const [details, setDetails] = useState({
    name: '',
    username: 'mockusername',
    password: 'mockpassword',
    joiningDate: '',
    experience: null,
    departmentId: '',
    role: '',
    status: '',
    address: {
      line1: '',
      line2: 'Kakkanad',
      city: 'Ernakulam',
      state: 'Kerala',
      country: 'India',
      pincode: '682024'
    }
  });

  const handleChange = (key: string, value: string) => {
    const temp = { ...details };

    key == 'address'
      ? (temp.address['line1'] = value)
      : key == 'experience'
      ? (temp[key] = Number(value))
      : (temp[key] = value);
    setDetails(temp);
  };
  const { id } = useParams();
  const isEditing = !!id;

  const { data: departments } = useGetDepartmentOptionsQuery();
  const { data: roles } = useGetRolesOptionsQuery();
  const [getEmp, { data: results, isSuccess }] = useLazyGetEmployeeByIDQuery();
  const [createEmployee, { isLoading: createLoading }] = useCreateEmployeeMutation();
  const [updateEmployee, { isLoading: editLoading }] = useUpdateEmployeeMutation();
  const { data: user } = useGetUserQuery();

  const navigate = useNavigate();
  const handleSubmit = () => {
    if (!isEditing) {
      createEmployee(details);
      navigate('/employees');
    } else {
      updateEmployee({ id, ...details });
      navigate('/employees');
    }
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  useEffect(() => {
    if (id) getEmp(id);
  }, [id]);

  useEffect(() => {
    if (isSuccess) {
      const updateDetails = results.data;

      const editableData = { ...updateDetails, role: updateDetails['role']['name'] };

      setDetails(editableData);
    }
  }, [isSuccess]);

  const subheaderProps = {
    heading: isEditing ? 'Edit Employee' : 'Create Employee'
  };

  console.log(createLoading, editLoading);

  return (
    <Layout subheaderProps={subheaderProps} userRole={user?.data.role.name}>
      {!departments && !roles && <DetailShimmer />}
      {departments && roles && (
        <div className='form'>
          <div className='input-flex'>
            {departments && roles && (
              <>
                {console.log('details', details)}
                <FormInput
                  name='name'
                  label='Employee Name'
                  type='text'
                  placeholder='Employee name'
                  value={details.name}
                  onChange={handleChange}
                ></FormInput>
                <FormInput
                  name='joiningDate'
                  label='Joining Date'
                  type='text'
                  placeholder='Joining Date'
                  value={details.joiningDate}
                  onChange={handleChange}
                ></FormInput>
                <FormInput
                  name='experience'
                  label='Experience'
                  type='text'
                  placeholder='Experience'
                  value={details.experience}
                  onChange={handleChange}
                ></FormInput>
                <FormInput
                  name='departmentId'
                  label='Department'
                  type='select'
                  placeholder={isEditing ? details.departmentId : 'Choose Department'}
                  options={departments.data.map((department) => department.id)}
                  value={details.departmentId}
                  onChange={handleChange}
                ></FormInput>
                <FormInput
                  name='role'
                  label='Role'
                  type='select'
                  placeholder={isEditing ? details.role : 'Choose Role'}
                  value={details.role}
                  options={roles.data.map((role) => role.name)}
                  onChange={handleChange}
                ></FormInput>
                <FormInput
                  name='status'
                  label='Status'
                  type='select'
                  placeholder={isEditing ? details.status : 'Status'}
                  options={['ACTIVE', 'PROBATION', 'INACTIVE']}
                  value={details.status}
                  onChange={handleChange}
                ></FormInput>
                <FormInput
                  name='address'
                  label='Address'
                  type='text'
                  placeholder='Address'
                  value={details.address?.line1}
                  onChange={handleChange}
                ></FormInput>
                {isEditing ? (
                  <FormInput
                    name='employeeid'
                    label='Employee ID'
                    type='text'
                    placeholder=''
                    value={id}
                  ></FormInput>
                ) : null}
              </>
            )}
          </div>
          <div className='end' style={{ width: '25%' }}>
            <Button
              value={isEditing ? 'Save' : 'Create'}
              onClick={handleSubmit}
              className='pop-confirm'
            ></Button>
            <Button value='Cancel' className='pop-cancel' onClick={handleCancel}></Button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CreateEmployee;
