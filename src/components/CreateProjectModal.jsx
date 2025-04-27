import React, { useState } from 'react';
import axios from 'axios';
import './CreateProjectModal.css'; // <<< Import the CSS

function CreateProjectModal({ onProjectCreated, projectId }) {
  const [title, setTitle] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:5000/api/tasks/${projectId}/tasks`, { title }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTitle('');
      onProjectCreated();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className="createproject-container">
      <input
        className="createproject-input"
        placeholder="New Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="createproject-button" onClick={handleSubmit}>
        Create Project
      </button>
    </div>
  );
}

export default CreateProjectModal;
