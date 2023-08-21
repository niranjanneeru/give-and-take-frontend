import { useState } from 'react';
import DetailsItem from '../../components/empDetailsItem/empDetailsItem';
import Layout from '../../components/layout/layout';
import './taskDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import ParticipantList from '../../components/participants/participants';
import { useGetTaskByIDQuery } from './api';

const TaskDetails = () => {
  const [icon] = useState('pencil');
  const navigate = useNavigate();
  const { id } = useParams();
  const [accordian, setAccordian] = useState(true);

  const { data: taskData, isSuccess } = useGetTaskByIDQuery(id);

  const subheaderProps = {
    heading: 'Task Details',
    iconText: 'Edit',
    iconImg: icon,
    isTaskPage: true,
    handleAccordian,
    onClick: () => navigate(`/employees/edit/${id}`)
  };

  function handleAccordian(): void {
    setAccordian(!accordian);
  }
  console.log(taskData);

  return (
    <Layout subheaderProps={subheaderProps}>
      <div className={accordian ? 'TaskDetailsCard' : 'HiddenCard'}>
        {isSuccess && (
          <>
            <DetailsItem label='Task' value={taskData?.data?.title} type='text' />
            <DetailsItem label='Deadline' value={taskData?.data?.deadline} type='text' />
            <DetailsItem label='Bounty Points' value={taskData?.data?.bounty} type='text' />
            <DetailsItem label='Status' value={taskData?.data?.status} type='status' />
            <DetailsItem label='Skills' value={taskData?.data?.skills} type='text' />
            <DetailsItem label='Created By' value={taskData?.data?.createdBy?.name} type='text' />
            <div className='description'>
              <div className='description-heading'>Description</div>
              <ReactMarkdown>{taskData?.data?.description}</ReactMarkdown>
            </div>
            <ParticipantList participants={taskData?.data?.assignees}></ParticipantList>
            <div className='description-dummy'>
              <div>Description</div>
              <div className='description-heading'>Description</div>
              <ReactMarkdown>{taskData?.data?.description}</ReactMarkdown>
            </div>
          </>
        )}
      </div>
      <div className='progress-subheader'>
        <div className='progress'>Progress</div>
      </div>
      <div className='commentBox'>
        <div className='comment-text' contentEditable='true'>
          <textarea className='comment-textbox' placeholder='Type your message...'></textarea>
        </div>
        <div className='send'>
          <button className='file-button'>
            <img src='assets/img/add.png' />
          </button>
          <button className='send-button'>
            <img src='assets/img/send.png' />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default TaskDetails;
