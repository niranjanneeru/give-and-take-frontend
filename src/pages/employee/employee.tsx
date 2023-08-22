import { useEffect, useState } from 'react';
import './styles.css';
import Layout from '../../components/layout/layout';
import TableHeader from '../../components/tableHeader/tableHeader';
import TableRow from '../../components/tableRow/tableRow';
import { useNavigate } from 'react-router-dom';
import DeletePopup from '../../components/deletePopup/deletePopup';
import { useDeleteEmployeesMutation, useGetEmployeesQuery, useGetUserQuery } from './api';
import DirectBountyPopup from '../../components/directBountyPopUp/DirectBountyPopup';
import { useCreateTaskMutation } from '../createEditTask/api';

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

  console.log(user);

  return (
    <Layout subheaderProps={subheaderProps} userRole={user?.data.role}>
      <table className='table'>
        <TableHeader userRole={user?.data.role.name} isTask={false}></TableHeader>
        {employeesData &&
          employeesData.data.map((employee) => (
            <TableRow
              key={employee.id}
              row={employee}
              onClick={() => onClick(employee.id)}
              onEdit={() => handleEdit(String(employee.id))}
              onDelete={() => {
                setOpen(true);
                setId(employee.id);
              }}
              // onAward={() => {
              //   setopenDirectBounty(true);
              //   setId(employee.id);
              // }}
              userRole={user?.data.role.name}
              isTask={false}
            />
          ))}
        {open ? (
          <DeletePopup
            onConfirm={() => handleDelete(id)}
            onClose={() => setOpen(false)}
          ></DeletePopup>
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
    </Layout>
  );
};

export default EmployeePage;
