import React from 'react';
import './taskcard.css';

const TaskCard = ({ task, navigateToTaskDetail }) => {
  return (
    <div
      className='task-card'
      onClick={() => {
        navigateToTaskDetail(task.id);
      }}
    >
      <div className='task-header'>
        <div className='task-title'>{task.title}</div>
        <div className='task-bounty'>{task.bounty}</div>
      </div>
      <div className='task-skills'>
        <div className='skills-label'>Skills:</div>
        <div className='skills-list'>
          {task.skills.split(',').map((skill, index) => (
            <span key={index} className='skill'>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
