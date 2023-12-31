import { useEffect, useState } from 'react';
import DetailsItem from '../../components/empDetailsItem/empDetailsItem';
import Layout from '../../components/layout/layout';
import './taskDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import ParticipantList from '../../components/participants/participants';
import {
  useAddAssigneeMutation,
  useAddCommentsMutation,
  useDeleteTaskMutation,
  useGetTaskByIDQuery,
  useUploadFileMutation
} from './api';
import CommentInput from '../../components/commentInput/commentInput';
import Comment from '../../components/comment/Comment';
import { useGetUserQuery } from '../employee/api';
import { useUpdateTaskMutation } from '../createEditTask/api';
import DetailShimmer from '../../components/shimmer/DetailShimmer';
import CustomSnackbar from '../../components/snackbar/snackbar';

const TaskDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [accordian, setAccordian] = useState(true);

  function handleAccordian(): void {
    setAccordian(!accordian);
  }
  const { data: taskData, isSuccess } = useGetTaskByIDQuery(id);

  const { data: user } = useGetUserQuery();
  const userId = user?.data?.id;

  const [fileUrl, setFileUrl] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [severitySnackbar, setSeveritySnackbar] = useState('');

  const handleSnackbarClose = (reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const [
    addAssignee,
    {
      isSuccess: isSuccessOnAddAssignee,
      isError: isErrorOnAddAssignee,
      isLoading: addAssigneeLoading
    }
  ] = useAddAssigneeMutation();

  function handleJoin() {
    if (taskData?.data.assignees.length == taskData?.data.maxParticipants) {
      setOpenSnackbar(true);
      setSeveritySnackbar('error');
      setMessageSnackbar('Cannot join task! Participant limit exceeds');

      return;
    }
    addAssignee({ taskId: id, assigneeId: userId });
  }
  useEffect(() => {
    if (isSuccessOnAddAssignee) {
      setMessageSnackbar('You have successfully joined the task');
      setSeveritySnackbar('success');
      setOpenSnackbar(true);
    } else if (isErrorOnAddAssignee) {
      setMessageSnackbar('Error joining task');
      setSeveritySnackbar('error');
      setOpenSnackbar(true);
    }
  }, [isSuccessOnAddAssignee, isErrorOnAddAssignee]);

  const [approveTask, { isSuccess: approveSuccess, isError: isErrorOnApprove }] =
    useUpdateTaskMutation();
  const [deleteTask, { isError: isErrorOnDelete }] = useDeleteTaskMutation();

  useEffect(() => {
    if (approveSuccess) {
      setMessageSnackbar('Task approved successfully.');
      setSeveritySnackbar('success');
      setOpenSnackbar(true);
    } else if (isErrorOnApprove) {
      setMessageSnackbar('Error approving task.');
      setSeveritySnackbar('error');
      setOpenSnackbar(true);
    }
  }, [approveSuccess, isErrorOnApprove]);

  useEffect(() => {
    if (isErrorOnDelete) {
      setMessageSnackbar('Error deleting task.');
      setSeveritySnackbar('error');
      setOpenSnackbar(true);
    }
  }, [isErrorOnDelete]);

  const [
    addComments,
    { isLoading: commentsIsLoading, isSuccess: isAddCommentSuccess, isError: addCommentError }
  ] = useAddCommentsMutation();

  useEffect(() => {
    if (isAddCommentSuccess) {
      setMessageSnackbar('Comment added successfully');
      setSeveritySnackbar('success');
      setOpenSnackbar(true);
    } else if (addCommentError) {
      setMessageSnackbar('Error adding comment');
      setSeveritySnackbar('error');
      setOpenSnackbar(true);
    }
  }, [isAddCommentSuccess, addCommentError]);

  function sendComment(comment) {
    if (comment.trim().length === 0) {
      setMessageSnackbar('Comment cannot be empty.');
      setSeveritySnackbar('error');
      setOpenSnackbar(true);

      return;
    }
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

  const [addFiles, { data: fileData, isSuccess: isFileUploadSuccess, isError: fileUploadError }] =
    useUploadFileMutation();

  useEffect(() => {
    if (isFileUploadSuccess) {
      setFileUrl(fileData.data.url);
      setOpenSnackbar(true);
      setSeveritySnackbar('success');
      setMessageSnackbar('File uploaded successfully.');
    } else if (fileUploadError) {
      setMessageSnackbar('Error uploading file');
      setSeveritySnackbar('error');
      setOpenSnackbar(true);
    }
  }, [isFileUploadSuccess, fileUploadError]);

  const handleApprove = () => {
    approveTask({
      id: taskData?.data.id,
      status: 'COMPLETED'
    });
  };

  const handleEdit = (id) => {
    navigate(`/tasks/edit/${id}`);
  };

  const handleDelete = (id) => {
    deleteTask(id);
    navigate('/tasks');
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
    handleJoin,
    taskStatus:
      taskData?.data.status !== 'COMPLETED' &&
      taskData?.data.assignees.length < taskData?.data.maxParticipants &&
      !taskData?.data.assignees.find((assignee) => assignee.id === userId)
        ? true
        : false,
    onClick: () => navigate(`/employees/edit/${id}`),
    handleApprove: handleApprove,
    handleEdit: () => {
      handleEdit(id);
    },
    handleDelete: () => {
      handleDelete(id);
    }
  };
  const isAssignee = taskData?.data.assignees.find((assignee) => assignee.id === user?.data.id)
    ? true
    : false;

  return (
    <Layout subheaderProps={subheaderProps} userRole={user?.data.role}>
      {!taskData || addAssigneeLoading ? (
        <DetailShimmer />
      ) : (
        <>
          <div className={accordian ? 'TaskDetailsCard' : 'HiddenCard'}>
            {isSuccess && (
              <>
                <div className='details-row'>
                  <DetailsItem label='Task' value={taskData?.data?.title} type='text' />
                  <DetailsItem label='Deadline' value={taskData?.data?.deadline} type='text' />
                  <DetailsItem label='Bounty Points' value={taskData?.data?.bounty} type='text' />
                  <DetailsItem label='Status' value={taskData?.data?.status} type='status' />
                  <DetailsItem label='Skills' value={taskData?.data?.skills} type='text' />
                  <DetailsItem
                    label='Created By'
                    value={taskData?.data?.createdBy?.name}
                    type='text'
                  />
                </div>
                <div className='description-row'>
                  <div className='description'>
                    <div className='description-heading'>Description</div>
                    <ReactMarkdown>{taskData?.data?.description}</ReactMarkdown>
                  </div>
                  <ParticipantList
                    participants={taskData?.data?.assignees}
                    maxParticipants={taskData?.data?.maxParticipants}
                    userRole={user?.data.role}
                    taskId={id}
                    isApproved={isApproved}
                  ></ParticipantList>
                </div>
              </>
            )}
          </div>
          {commentsIsLoading ? (
            <DetailShimmer />
          ) : (
            <div className='progress'>
              <div className='progress-header'>Comments</div>
              <div className={`progress-content ${accordian ? 'content-with-accordian' : ''}`}>
                {taskData &&
                  taskData?.data?.comments.map((comment) => {
                    console.log(userId, taskData);

                    return (
                      <Comment
                        key={comment.id}
                        author={comment?.postedBy?.name}
                        date={comment?.createdAt}
                        comment={comment?.comment}
                        attachment={comment?.url}
                        isCurrentUserComment={userId === comment?.postedBy?.id}
                      />
                    );
                  })}
              </div>
              {!isApproved && (isAssignee || user?.data.role === 'LEAD') && (
                <CommentInput sendComment={sendComment} uploadFile={uploadFile} />
              )}
            </div>
          )}
        </>
      )}
      <CustomSnackbar
        open={openSnackbar}
        message={messageSnackbar}
        severity={severitySnackbar}
        handleClose={handleSnackbarClose}
      />
    </Layout>
  );
};

export default TaskDetails;
