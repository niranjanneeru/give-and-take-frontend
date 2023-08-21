import './taskListHeader.css';

const TaskListHeader = () => {
  const headerData = ['Task Title', 'Deadline', 'Bounty', 'Skills Required', 'Status', 'Assignees'];

  return (
    <th className='taskListHeader'>
      {headerData.map((item) => (
        <td key={item}>{item}</td>
      ))}
    </th>
  );
};

export default TaskListHeader;
