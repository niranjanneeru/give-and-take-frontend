// import './styles.css';
// import { useNavigate } from 'react-router-dom';
// import Layout from '../../components/layout/layout';
// import { useGetUserQuery } from '../employee/api';
// import TableHeader from '../../components/tableHeader/tableHeader';
// import TableRow from '../../components/tableRow/tableRow';

// const RequestListPage = () => {
//     const navigate = useNavigate();

//   //   // add use effect
//     const { data: RequestData } = useGetTasksQuery();

//   //   const onClick = (id) => navigate(`/tasks/${id}`);

//   const { data: user } = useGetUserQuery();

//   const subheaderProps = {
//     heading: 'Redeem Request '
//     //   iconText: 'Create Task',
//     //   iconImg: 'plus',
//     //   onClick: () => navigate('/tasks/create'),
//     //   isTask: true
//   };

//   return (
//     <Layout subheaderProps={subheaderProps} userRole={user?.data.role}>
//       <div className='taskList-container'>
//         <table className='table'>
//           <TableHeader></TableHeader>
//           <div className='scroll-tr'>
//             <TableRow
//             //   key={task['id']}
//             //   row={task}
//             //   onClick={() => onClick(task['id'])}
//             //   isTask={true}
//             //   userRole={user?.data.role}
//             />
//           </div>
//         </table>
//       </div>
//     </Layout>
//   );
// };

// export default RequestListPage;
