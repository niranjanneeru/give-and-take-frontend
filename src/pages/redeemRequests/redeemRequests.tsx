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
import { useState } from 'react';
import DeletePopup from '../../components/deletePopup/deletePopup';

const RedeemRequestPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');

  // add use effect
  const { data: redeemRequests } = useGetRedeemRequestsQuery();
  const onClick = (id) => navigate(`/employees/${id}`);

  const { data: user } = useGetUserQuery();
  const [deleteRequest] = useDeleteRequestMutation();
  const [aprroveRequest] = useUpdateRequestMutation();

  const handleReject = (id) => {
    deleteRequest(id);
    setOpen(false);
    navigate('/redeem-requests');
  };
  const approveBody = {
    isApproved: true
  };

  const handleApprove = (id: string) => {
    aprroveRequest({ id, ...approveBody });
    navigate('/redeem-requests');
  };

  const subheaderProps = {
    heading: 'REDEEM REQUESTS'
  };

  console.log('data', redeemRequests);
  console.log('id', id);

  return (
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
                  onEdit={() => handleApprove(request['id'])}
                  onDelete={() => {
                    setOpen(true);
                    setId(request['id']);
                  }}
                  pageType='redeemRequestsList'
                />
              ))}
            {open ? (
              <DeletePopup
                value={'reject the request'}
                onConfirm={() => handleReject(id)}
                onClose={() => setOpen(false)}
              ></DeletePopup>
            ) : null}
          </div>
        </table>
      </div>
    </Layout>
  );
};

export default RedeemRequestPage;
