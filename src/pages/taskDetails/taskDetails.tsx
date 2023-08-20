import { useState } from 'react';
import DetailsItem from '../../components/empDetailsItem/empDetailsItem';
import Layout from '../../components/layout/layout';
import './taskDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import ParticipantList from '../../components/participants/participants';

const TaskDetails = () => {
  const [icon] = useState('pencil');
  const navigate = useNavigate();
  const { id } = useParams();
  const subheaderProps = {
    heading: 'Task Details',
    iconText: 'Edit',
    iconImg: icon,
    onClick: () => navigate(`/employees/edit/${id}`)
  };

  return (
    <Layout subheaderProps={subheaderProps}>
      <div className='TaskDetailsCard'>
        <>
          <DetailsItem label='Task' value='Task Title' type='text' />
          <DetailsItem label='Deadline' value='11th November 2023' type='text' />
          <DetailsItem label='Bounty Points' value='100' type='text' />
          <DetailsItem label='Status' value='ACTIVE' type='status' />
          <DetailsItem label='Skills' value='React,TypeScript' type='text' />
          <DetailsItem label='Created By' value='Sam' type='text' />
          <div className='description'>
            <div className='description-heading'>Description</div>
            dcervcervrvv rbrevysxsofclenjcjerycejcn v jnvkwhcuevbkjenvkevnejm nbdjkscehb jbjbhbchyh
            hdbcugeycnsehcvyecnujcn ysxsofclenjcjerycejcn v jnvkwhcuevbkjenvkevnejm nbdjkscehb
            jbjbhbchyh hdbcugeycnsehcv dcervcervrvv rbrevysxsofclenjcjerycejcn v
            jnvkwhcuevbkjenvkevnejm nbdjkscehb jbjbhbchyh hdbcugeycnsehcvyecnujcn
            hdbcugeycnsehcvyecnujcn ysxsofclenjcjerycejcn v jnvkwhcuevbkjenvkevnejm nbdjkscehb
            jbjbhbchyh hdbcugeycnsehcv dcervcervrvv rbrevysxsofclenjcjerycejcn v
            jnvkwhcuevbkjenvkevnejm nbdjkscehb jbjbhbchyh hdbcugeycnsehcvyecnujcn
          </div>
          <ParticipantList></ParticipantList>
          <div className='description-dummy'>
            <div>Description</div>
            dcervcervrvv rbrevysxsofclenjcjerycejcn v jnvkwhcuevbkjenvkevnejm nbdjkscehb jbjbhbchyh
            hdbcugeycnsehcvyecnujcn ysxsofclenjcjerycejcn v jnvkwhcuevbkjenvkevnejm nbdjkscehb
            jbjbhbchyh hdbcugeycnsehcv dcervcervrvv rbrevysxsofclenjcjerycejcn v
            jnvkwhcuevbkjenvkevnejm nbdjkscehb jbjbhbchyh hdbcugeycnsehcvyecnujcn
            hdbcugeycnsehcvyecnujcn ysxsofclenjcjerycejcn v jnvkwhcuevbkjenvkevnejm nbdjkscehb
            jbjbhbchyh hdbcugeycnsehcv dcervcervrvv rbrevysxsofclenjcjerycejcn v
            jnvkwhcuevbkjenvkevnejm nbdjkscehb jbjbhbchyh hdbcugeycnsehcvyecnujcn
          </div>
        </>
      </div>
    </Layout>
  );
};

export default TaskDetails;
