import './employeeDetails.css';
import Layout from '../../components/layout/layout';
import { useNavigate, useParams } from 'react-router-dom';
import DetailsItem from '../../components/empDetailsItem/empDetailsItem';
import { useCreateRedeemRequestMutation, useGetEmployeeByIDQuery } from './api';
import { useGetUserQuery } from '../employee/api';
import { getTier } from '../../utils/tiers';
import { useEffect, useState } from 'react';
import DirectBountyPopup from '../../components/directBountyPopUp/DirectBountyPopup';
import { useCreateTaskMutation } from '../createEditTask/api';
import Board from '../../components/board/board';
import ContentBoxShimmer from '../../components/shimmer/ContentBoxShimmer';

const EmployeeDetails = () => {
  const { id } = useParams();

  const { data: employee } = useGetEmployeeByIDQuery(id);
  const { data: user } = useGetUserQuery();
  const [createDirectBounty, { data: directBountyData, isSuccess: directBountySuccess }] =
    useCreateTaskMutation();
  const [createRedeemRequest, { data: redeemRequestData, isSuccess: redeemRequestSuccess }] =
    useCreateRedeemRequestMutation();
  const [openDirectBounty, setopenDirectBounty] = useState(false);
  const [bounty, setBounty] = useState(0);
  const [reason, setReason] = useState('');
  const [redeemBounty, setRedeemBounty] = useState(0);
  const [openRedeemRequest, setOpenRedeemRequest] = useState(false);

  console.log('employee', employee);
  const navigate = useNavigate();
  const handleDirectBountyAward = (id: string) => {
    console.log('id', id);
    createDirectBounty({
      title: reason,
      description: reason,
      bounty: +bounty,
      isDirectBounty: true,
      recipientId: id,
      deadline: new Date(),
      skills: ' ',
      maxParticipants: 1
    });
    setopenDirectBounty(false);
  };

  const handleRedeemRequest = (bounty: number) => {
    console.log('bounty', bounty);
    createRedeemRequest(+bounty);
    setOpenRedeemRequest(false);
  };

  const subheaderProps = {
    heading: 'Employee Details',
    iconText: 'Edit Employee',
    iconImg: 'pencil',
    onClick: () => navigate(`/employees/edit/${id}`),
    handleAward: () => {
      setopenDirectBounty(true);
    },
    isEmployeeDetail: true,
    isUser: user?.data.id === id,
    handleRedeemRequest: () => {
      setOpenRedeemRequest(true);
    }
  };

  useEffect(() => {
    if (directBountyData && directBountySuccess) navigate('/employees');
  }, [directBountyData, directBountySuccess]);

  useEffect(() => {
    if (redeemRequestData && redeemRequestSuccess) navigate('/employees');
  }, [redeemRequestData, redeemRequestSuccess]);

  console.log('Employee ', employee?.data);

  return (
    <Layout subheaderProps={subheaderProps} userRole={user?.data.role}>
      <div className='detailsCard'>
        {!employee && <ContentBoxShimmer />}
        {employee && (
          <>
            <DetailsItem label='Employee Name' value={employee.data.name} type='text' />
            <DetailsItem label='Joining Date' value={employee.data.joiningDate} type='text' />
            <DetailsItem label='Experience' value={String(employee.data.experience)} type='text' />
            <DetailsItem label='Role' value={employee.data.role.name} type='text' />
            <DetailsItem label='Status' value={employee.data.status} type='status' />
            <DetailsItem label='Department' value={employee.data.department.name} type='text' />
            <DetailsItem label='Bounty Points' value={String(employee.data.bounty)} type='text' />
            <DetailsItem
              label='Redeemed Points'
              value={String(employee.data.redeemed_bounty)}
              type='text'
            />
            <DetailsItem label='Tier' value={getTier(employee.data.bounty)} type='text' />
            <DetailsItem
              label='Badge'
              type='badge'
              value={employee.data.bounty}
              bounty={employee.data.bounty}
            />
          </>
        )}
      </div>
      {employee && (
        <Board
          taskCompleted={employee.data['tasks'].filter(
            (task) => !task.isDirectBounty && task.status === 'COMPLETED' // Clean Code
          )}
          taskCreated={employee.data['tasksCreated'].filter((task) => !task.isDirectBounty)}
          taskInProgress={employee.data['tasks'].filter(
            (task) => !task.isDirectBounty && task.status === 'IN_PROGRESS' // Clean Code
          )}
          navigateToTaskDetail={(id) => {
            navigate(`/tasks/${id}`);
          }}
        />
      )}
      {openDirectBounty ? (
        <DirectBountyPopup
          onConfirm={() => handleDirectBountyAward(id)}
          onClose={() => setopenDirectBounty(false)}
          bounty={bounty}
          setBounty={setBounty}
          reason={reason}
          setReason={setReason}
        ></DirectBountyPopup>
      ) : null}
      {openRedeemRequest ? (
        <DirectBountyPopup
          onConfirm={() => handleRedeemRequest(redeemBounty)}
          onClose={() => setOpenRedeemRequest(false)}
          bounty={redeemBounty}
          setBounty={setRedeemBounty}
          isDirectBounty={false}
        ></DirectBountyPopup>
      ) : null}
    </Layout>
  );
};

export default EmployeeDetails;
