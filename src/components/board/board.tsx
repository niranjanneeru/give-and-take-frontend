import React from 'react';
import Column from '../column/column';
import './board.css';

const Board = ({ taskInProgress, taskCompleted, taskCreated }) => {
  console.log(taskCreated);

  return (
    <div className='board'>
      <Column title='In Progress' tasks={taskInProgress} />
      <Column title='Completed' tasks={taskCompleted} />
      <Column title='Created' tasks={taskCreated} />
    </div>
  );
};

export default Board;
