import { FC } from 'react';
import './taskListRow.css';
import Status from '../status/status';
type taskListRowProps = {
  task: Object;
  onClick: (e) => void;
};

const TaskListRow: FC<taskListRowProps> = ({ task, onClick }) => {
  const keys = ['title', 'deadline', 'bounty', 'skills', 'status', 'Assignees'];

  return (
    <tr className='taskListRow'>
      {keys.map((key) => (
        <td key={task[key]} onClick={onClick} style={key === 'title' ? { color: '#000' } : {}}>
          {key === 'status' ? (
            <Status status={task[key]}></Status>
          ) : key === 'Assignees' ? (
            `${task['employees'].length}/${task['maxParticipants']}`
          ) : (
            task[key]
          )}
        </td>
      ))}
    </tr>
  );
};

export default TaskListRow;
