import Layout from '../../components/layout/layout';
import { useEffect, useState } from 'react';
import './createEditTask.css';
import FormInput from '../../components/formInput/formInput';
import { useNavigate, useParams } from 'react-router-dom';
import MultiValueInput from '../../components/multiValueInput/multiValueInput';
import { useCreateTaskMutation, useUpdateTaskMutation } from './api';

const CreateEditTask = () => {
  const [details, setDetails] = useState({
    title: '',
    deadline: '',
    maxParticipants: 0,
    bounty: 10,
    skills: '',
    description: ''
  });

  const [createTask, { data: createData, isSuccess: isSuccessOnCreate }] = useCreateTaskMutation();
  const [editTask, { data: editData, isSuccess: isSuccessOnEdit }] = useUpdateTaskMutation();

  const handleChange = (key: string, value: string) => {
    const temp = { ...details };

    key == 'maxParticipants' || key == 'bounty' ? (temp[key] = Number(value)) : (temp[key] = value); // type correcting
    setDetails(temp);
  };
  const { id } = useParams();
  const isEditing = !!id;

  const navigate = useNavigate();
  const handleSubmit = () => {
    if (!isEditing) {
      createTask(details);
      navigate('/tasks');
    } else {
      editTask(details);
      navigate('/tasks');
    }
  };

  useEffect(() => {
    if ((createData && isSuccessOnCreate) || (editData && isSuccessOnEdit)) navigate('/tasks');
  }, [createData, isSuccessOnCreate, editData, isSuccessOnEdit]);

  useEffect(() => {}, [id]); // get task using id

  const subheaderProps = {
    heading: isEditing ? 'Edit Task' : 'Create Task'
  };

  return (
    <Layout subheaderProps={subheaderProps}>
      <div className='form'>
        <div className='input-flex-column'>
          <div className='input-flex-row'>
            <FormInput
              name='title'
              label='Task Title'
              type='text'
              placeholder='Enter Task Title'
              value={details.title}
              onChange={handleChange}
            ></FormInput>
            <FormInput
              name='deadline'
              label='Deadline'
              type='date'
              placeholder='Deadline'
              value={details.deadline}
              onChange={handleChange}
            ></FormInput>
            <FormInput
              name='maxParticipants'
              label='Max Participants'
              type='number'
              placeholder='Enter Max Assignees'
              value={String(details.maxParticipants)}
              onChange={handleChange}
            ></FormInput>
          </div>
          <div className='input-flex-row'>
            {/* only if authorised */}
            <FormInput
              name='bounty'
              label='Bounty Points'
              type='number'
              placeholder='Enter Bounty Points'
              value={String(details.bounty)}
              onChange={handleChange}
            ></FormInput>
            <MultiValueInput
              name='skills'
              label='Skills Required'
              placeholder='Enter Skills'
              value={details.skills}
              onChange={handleChange}
            ></MultiValueInput>
          </div>
          <div className='input-flex-row'>
            <FormInput
              name='description'
              label='Description'
              type='textarea'
              placeholder='Enter description'
              value={details.description}
              onChange={handleChange}
            ></FormInput>
          </div>
        </div>
        <div className='end'>
          <input
            type='submit'
            value={isEditing ? 'Save' : 'Create'}
            className='form-create'
            onClick={handleSubmit}
          />
          <input type='submit' value='Cancel' className='form-cancel' />
        </div>
      </div>
    </Layout>
  );
};

export default CreateEditTask;
