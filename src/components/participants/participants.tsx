import React from 'react';
import './participants.css';

const ParticipantList = ({ participants, maxParticipants }) => {
  return (
    <div className='participant-section'>
      <div className='participant-list'>
        Participants ({participants.length}/{maxParticipants})
      </div>
      <ul className='participants'>
        {participants.map((participant) => (
          <li key={participant.id}>{participant.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;
