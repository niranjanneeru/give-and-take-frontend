import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../employee/api';
import Layout from '../../components/layout/layout';
import TableHeader from '../../components/tableHeader/tableHeader';
import TableRow from '../../components/tableRow/tableRow';
import {
  useDeleteRequestMutation,
  useGetRedeemRequestsQuery,
  useUpdateRequestMutation
} from './api';
import { useEffect, useState } from 'react';
import DeletePopup from '../../components/deletePopup/deletePopup';

const RedeemRequestPage = () => {
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [id, setId] = useState('');

  const { data: redeemRequests } = useGetRedeemRequestsQuery();
  const onClick = (id) => navigate(`/employees/${id}`);

  const { data: user, isSuccess } = useGetUserQuery();
  const [deleteRequest] = useDeleteRequestMutation();
  const [aprroveRequest] = useUpdateRequestMutation();

  const handleReject = (id) => {
    deleteRequest(id);
    setOpenDelete(false);
    navigate('/redeem-requests');
  };
  const approveBody = {
    isApproved: true
  };

  const handleApprove = (id: string) => {
    aprroveRequest({ id, ...approveBody });
    setOpenApprove(false);
    navigate('/redeem-requests');
  };

  const subheaderProps = {
    heading: 'REDEEM REQUESTS'
  };

  useEffect(() => {
    console.log(user);
    if (user?.data.role != 'HR' && isSuccess) navigate('/404');
  }, [user, isSuccess]);

  const isAuthorised = () => (user?.data.role === 'HR' ? true : false);

  return (
    <>
      {isAuthorised && (
        <Layout subheaderProps={subheaderProps} userRole={user?.data.role}>
          <div className='taskList-container'>
            <table className='table'>
              <TableHeader userRole={user?.data.role} page={'redeemRequestsList'}></TableHeader>
              <div className='scroll-tr'>
                {redeemRequests &&
                  redeemRequests.data.map((request) => (
                    <TableRow
                      key={request['id']}
                      row={request}
                      onClick={() => onClick(request['employee'].id)}
                      userRole={user?.data.role}
                      onEdit={() => {
                        setOpenApprove(true);
                        setId(request['id']);
                      }}
                      onDelete={() => {
                        setOpenDelete(true);
                        setId(request['id']);
                      }}
                      pageType='redeemRequestsList'
                    />
                  ))}
                {openDelete ? (
                  <DeletePopup
                    desc={'Do you really want to reject the request'}
                    onConfirm={() => handleReject(id)}
                    onClose={() => setOpenDelete(false)}
                  ></DeletePopup>
                ) : null}
                {openApprove ? (
                  <DeletePopup
                    desc={'Do you really want to approve the request'}
                    onConfirm={() => handleApprove(id)}
                    onClose={() => setOpenApprove(false)}
                  ></DeletePopup>
                ) : null}
              </div>
            </table>
          </div>
        </Layout>
      )}
    </>
  );
};

export default RedeemRequestPage;
