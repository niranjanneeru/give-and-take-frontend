import { useState } from 'react';
import DetailsItem from '../../components/empDetailsItem/empDetailsItem';
import Layout from '../../components/layout/layout';
import './taskDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import ParticipantList from '../../components/participants/participants';
import { useGetTaskByIDQuery } from './api';
import CommentInput from '../../components/commentInput/commentInput';

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
            <ParticipantList
              participants={taskData?.data?.assignees}
              maxParticipants={taskData?.data?.maxParticipants}
            ></ParticipantList>
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
      <CommentInput></CommentInput>
    </Layout>
  );
};

export default TaskDetails;
