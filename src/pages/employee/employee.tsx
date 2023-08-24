import { useEffect, useState } from 'react';
import './styles.css';
import Layout from '../../components/layout/layout';
import TableHeader from '../../components/tableHeader/tableHeader';
import TableRow from '../../components/tableRow/tableRow';
import { useNavigate } from 'react-router-dom';
import { useDeleteEmployeesMutation, useGetEmployeesQuery, useGetUserQuery } from './api';
import DirectBountyPopup from '../../components/directBountyPopUp/DirectBountyPopup';
import { useCreateTaskMutation } from '../createEditTask/api';
import TableShimmer from '../../components/shimmer/TableShimmer';
import Popup from '../../components/deletePopup/deletePopup';

const EmployeePage = () => {
  const [id, setId] = useState('');
  const [open, setOpen] = useState(false);
  const [openDirectBounty, setopenDirectBounty] = useState(false);
  const [bounty, setBounty] = useState(0);
  const [reason, setReason] = useState('');

  const { data: employeesData } = useGetEmployeesQuery();
  const [deleteEmp] = useDeleteEmployeesMutation();
  const { data: user } = useGetUserQuery();
  const [createDirectBounty, { data: directBountyData, isSuccess: directBountySuccess }] =
    useCreateTaskMutation();

  const navigate = useNavigate();
  const onClick = (id) => navigate(`/employees/${id}`);

  const handleDelete = (id) => {
    deleteEmp(id);
    setOpen(false);
    navigate('/employees');
  };

  const handleEdit = (id: string) => {
    navigate(`/employees/edit/${id}`);
  };

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

  const subheaderProps = {
    heading: 'Employee List',
    iconText: 'Create employee',
    iconImg: 'plus',
    onClick: () => navigate(`/employees/create`),
    isTask: false
  };

  useEffect(() => {
    if (directBountyData && directBountySuccess) navigate('/employees');
  }, [directBountyData, directBountySuccess]);

  return (
    <Layout subheaderProps={subheaderProps} userRole={user?.data.role}>
      <table className='table'>
        {employeesData && (
          <>
            <TableHeader userRole={user?.data.role} isTask={false}></TableHeader>
            {employeesData.data.map((employee) => (
              <TableRow
                key={employee.id}
                row={employee}
                onClick={() => onClick(employee.id)}
                onEdit={() => handleEdit(String(employee.id))}
                onDelete={() => {
                  setOpen(true);
                  setId(employee.id);
                }}
                userRole={user?.data.role}
                isTask={false}
              />
            ))}
          </>
        )}
        {open ? (
          <Popup
            onConfirm={() => handleDelete(id)}
            onClose={() => setOpen(false)}
            desc={'Do you really want to delete employee ?'}
          ></Popup>
        ) : null}
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
      </table>
      <div className='loading-div'>{!employeesData && <TableShimmer />}</div>
    </Layout>
  );
};

export default EmployeePage;
