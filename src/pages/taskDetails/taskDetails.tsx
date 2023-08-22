import { useEffect, useState } from 'react';
import DetailsItem from '../../components/empDetailsItem/empDetailsItem';
import Layout from '../../components/layout/layout';
import './taskDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import ParticipantList from '../../components/participants/participants';
import { useAddCommentsMutation, useGetTaskByIDQuery, useUploadFileMutation } from './api';
import CommentInput from '../../components/commentInput/commentInput';
import Comment from '../../components/comment/Comment';
import { useGetUserQuery } from '../employee/api';
import { useUpdateTaskMutation } from '../createEditTask/api';

const TaskDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [accordian, setAccordian] = useState(true);
  const [fileUrl, setFileUrl] = useState(null);

  const { data: taskData, isSuccess } = useGetTaskByIDQuery(id);
  const { data: user } = useGetUserQuery();

  const [addComments] = useAddCommentsMutation();
  const [addFiles, { data: fileData, isSuccess: isFileUploadSuccess }] = useUploadFileMutation();
  const [approveTask, { data: approveData, isSuccess: approveSuccess }] = useUpdateTaskMutation();

  function handleAccordian(): void {
    setAccordian(!accordian);
  }

  function sendComment(comment) {
    const data = {
      id,
      body: {
        comment
      }
    };

    if (fileUrl) data.body['url'] = fileUrl;

    addComments(data);
    setFileUrl(null);
  }

  const handleApprove = () => {
    console.log('Approve clicked');
    console.log(taskData?.data);
    approveTask({
      id: taskData?.data.id,
      status: 'COMPLETED'
    });
  };

  function uploadFile(file) {
    const formData = new FormData();

    formData.append('file', file);
    addFiles(formData);
  }

  const isApproved = taskData?.data.status === 'COMPLETED';

  const subheaderProps = {
    heading: 'Task Details',
    isTaskPage: isApproved ? false : true,
    handleAccordian,
    onClick: () => navigate(`/employees/edit/${id}`),
    handleApprove: handleApprove
  };

  useEffect(() => {
    if (isFileUploadSuccess) setFileUrl(fileData.data.url);
  }, [isFileUploadSuccess]);

  useEffect(() => {
    if (approveData && approveSuccess) navigate(`/tasks/${id}`);
  }, [approveData, approveSuccess]);

  return (
    <Layout subheaderProps={subheaderProps} userRole={user?.data.role}>
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
      <div className='progress'>
        <div className='progress-header'>Comments</div>
        <div className={`progress-content ${accordian ? 'content-with-accordian' : ''}`}>
          {taskData &&
            taskData?.data?.comments.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  author={comment?.postedBy?.name}
                  date={comment?.createdAt}
                  comment={comment?.comment}
                  attachment={comment?.url}
                />
              );
            })}
        </div>
      </div>
      {!isApproved && <CommentInput sendComment={sendComment} uploadFile={uploadFile} />}
    </Layout>
  );
};

export default TaskDetails;
