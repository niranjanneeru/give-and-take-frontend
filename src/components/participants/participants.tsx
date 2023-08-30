import React, { useState } from 'react';
import './participants.css';
import Select from 'react-select';
import { useGetEmployeesQuery } from '../../pages/employee/api';
import { useAddAssigneesMutation } from '../../pages/taskDetails/api';
import CustomSnackbar from '../snackbar/snackbar';

const ParticipantList = ({ participants, maxParticipants, userRole, taskId, isApproved }) => {
  const [showAddparticipants, setShowAddparticipants] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState(
    participants.map((participant) => {
      return { value: participant.id, label: participant.name };
    })
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [severitySnackbar, setSeveritySnackbar] = useState('');
  const { data: employeeList } = useGetEmployeesQuery();
  const [addAssignees] = useAddAssigneesMutation();
  const optionList = employeeList?.data.map((employee) => {
    return { value: employee.id, label: employee.name };
  });
  const handleSelect = (data) => {
    console.log(data);
    if (data.length <= maxParticipants) {
      setSelectedParticipants(data);
    } else {
      setOpenSnackbar(true);
      setMessageSnackbar('Partcipant limit exceeds');
      setSeveritySnackbar('error');
    }
  };
  const handleAddParticipant = () => {
    console.log('Plus clicked');
    console.log('Participant List ', selectedParticipants);
    setShowAddparticipants(true);
  };
  const handleSubmit = () => {
    const newParticipants = selectedParticipants.map((participant) => participant.value);

    console.log(newParticipants);

    addAssignees({ taskId: taskId, assignees: newParticipants });

    setShowAddparticipants(false);
  };

  const handleSnackbarClose = (reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <div className='participant-section'>
      <div className='participant-list'>
        Participants ({participants.length}/{maxParticipants})
        {userRole === 'LEAD' && !isApproved && (
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
      <CustomSnackbar
        open={openSnackbar}
        message={messageSnackbar}
        severity={severitySnackbar}
        handleClose={handleSnackbarClose}
      />
    </div>
  );
};

export default ParticipantList;
