import React from 'react';
import './participants.css';

const ParticipantList = () => {
  const participants = ['John Doe', 'Maria Sen', 'Julia Albert'];

  return (
    <div className='participant-section'>
      <div className='participant-list'>Participants</div>
      <ul className='participants'>
        {participants.map((participant, index) => (
          <li key={index}>{participant}</li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;
