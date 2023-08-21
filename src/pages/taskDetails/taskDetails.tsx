import { useState } from 'react';
import DetailsItem from '../../components/empDetailsItem/empDetailsItem';
import Layout from '../../components/layout/layout';
import './taskDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import ParticipantList from '../../components/participants/participants';

const TaskDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [accordian, setAccordian] = useState(true);

  const subheaderProps = {
    heading: 'Task Details',
    isTaskPage: true,
    handleAccordian,
    onClick: () => navigate(`/employees/edit/${id}`)
  };

  function handleAccordian(): void {
    setAccordian(!accordian);
  }
  const markdown =
    'A paragraph with *emphasis* and **strong importance**. A paragraph with *emphasis* and **strong importance**. A paragraph with *emphasis* and **strong importance**. A paragraph with *emphasis* and **strong importance**.';

  return (
    <Layout subheaderProps={subheaderProps}>
      <div className={accordian ? 'TaskDetailsCard' : 'HiddenCard'}>
        <>
          <DetailsItem label='Task' value='Task Title' type='text' />
          <DetailsItem label='Deadline' value='11th November 2023' type='text' />
          <DetailsItem label='Bounty Points' value='100' type='text' />
          <DetailsItem label='Status' value='ACTIVE' type='status' />
          <DetailsItem label='Skills' value='React,TypeScript' type='text' />
          <DetailsItem label='Created By' value='Sam' type='text' />
          <div className='description'>
            <div className='description-heading'>Description</div>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
          <ParticipantList></ParticipantList>
          <div className='description-dummy'>
            <div>Description</div>
            <div className='description-heading'>Description</div>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </>
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
