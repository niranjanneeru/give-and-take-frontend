import React from 'react';
import Column from '../column/column';
import './board.css';

const Board = ({ taskInProgress, taskCompleted, taskCreated, navigateToTaskDetail }) => {
  return (
    <div className='board'>
      <Column
        title='In Progress'
        tasks={taskInProgress}
        navigateToTaskDetail={navigateToTaskDetail}
      />
      <Column title='Completed' tasks={taskCompleted} navigateToTaskDetail={navigateToTaskDetail} />
      <Column title='Created' tasks={taskCreated} navigateToTaskDetail={navigateToTaskDetail} />
    </div>
  );
};

export default Board;
