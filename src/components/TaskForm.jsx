import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css'; // <<< Import the CSS

function TaskForm({ projectId, onTaskCreated }) {
  const [form, setForm] = useState({ title: '', description: '', status: 'Pending' });
  const token = localStorage.getItem('token');

  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:5000/api/tasks/${projectId}/tasks`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForm({ title: '', description: '', status: 'Pending' });
      onTaskCreated();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="taskform-container">
      <input
        className="taskform-input"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        className="taskform-input"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <select
        className="taskform-select"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button className="taskform-button" onClick={handleSubmit}>
        Add Task
      </button>
    </div>
  );
}

export default TaskForm;
