import React from 'react';
import './participants.css';

const ParticipantList = ({ participants }) => {
  return (
    <div className='participant-section'>
      <div className='participant-list'>Participants</div>
      <ul className='participants'>
        {participants.map((participant) => (
          <li key={participant.id}>{participant.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;
