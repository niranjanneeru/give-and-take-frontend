import React from 'react';
import TaskCard from '../taskcard/taskcard';
import './column.css';

const Column = ({ title, tasks, navigateToTaskDetail }) => {
  return (
    <div className='column'>
      <h2 className='column-title'>{title}</h2>
      <div className='task-list'>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} navigateToTaskDetail={navigateToTaskDetail} />
        ))}
      </div>
    </div>
  );
};

export default Column;
