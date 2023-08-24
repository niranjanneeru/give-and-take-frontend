import React, { useState } from 'react';
import './participants.css';
import Select from 'react-select';
import { useGetEmployeesQuery } from '../../pages/employee/api';
import { useAddAssigneeMutation, useDeleteAssigneeMutation } from '../../pages/taskDetails/api';

const ParticipantList = ({ participants, maxParticipants, userRole, taskId }) => {
  const [showAddparticipants, setShowAddparticipants] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState(
    participants.map((participant) => {
      return { value: participant.id, label: participant.name };
    })
  );
  const { data: employeeList } = useGetEmployeesQuery();
  const [addAssignee] = useAddAssigneeMutation();
  const [deleteAssignee] = useDeleteAssigneeMutation();
  const optionList = employeeList?.data.map((employee) => {
    return { value: employee.id, label: employee.name };
  });
  const handleSelect = (data) => {
    console.log(data);
    setSelectedParticipants(data);
  };
  const handleAddParticipant = () => {
    console.log('Plus clicked');
    console.log('Participant List ', selectedParticipants);
    setShowAddparticipants(true);
  };
  const handleSubmit = () => {
    const newParticipants = selectedParticipants.map((participant) => participant.value);
    const oldParticipants = participants.map((participant) => participant.id);

    console.log('New', newParticipants);
    console.log('Old', oldParticipants);

    const addEmployees = newParticipants.filter(
      (participant) => !oldParticipants.includes(participant)
    );

    const deleteEmployees = oldParticipants.filter(
      (participant) => !newParticipants.includes(participant)
    );

    deleteEmployees.map((employeeId) => {
      deleteAssignee({ taskId: taskId, assigneeId: employeeId });
    });

    addEmployees.map((employeeId) => {
      addAssignee({ taskId: taskId, assigneeId: employeeId });
    });

    setShowAddparticipants(false);
  };

  return (
    <div className='participant-section'>
      <div className='participant-list'>
        Participants ({participants.length}/{maxParticipants})
        {userRole === 'LEAD' && (
          <button className='plus-btn-task' onClick={handleAddParticipant}>
            +
          </button>
        )}
        {showAddparticipants && (
          <div className='selectParticipants-container'>
            <Select
              options={optionList}
              placeholder='Select Employee'
              value={selectedParticipants}
              onChange={handleSelect}
              isSearchable={true}
              isMulti
            />
            <button className='plus-btn-task' onClick={handleSubmit}>
              Submit
            </button>
            <button
              className='plus-btn-task'
              onClick={() => {
                setShowAddparticipants(false);
              }}
            >
              X
            </button>
          </div>
        )}
      </div>
      {!showAddparticipants && (
        <ul className='participants'>
          {participants.map((participant) => (
            <li key={participant.id}>{participant.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ParticipantList;
