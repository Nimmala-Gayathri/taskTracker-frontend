import React, { useState } from 'react';
import axios from 'axios';
import './TaskItem.css'; // <<< Importing CSS

function TaskItem({ task, onTaskUpdated }) {
  const token = localStorage.getItem('token');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description,
    status: task.status
  });

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onTaskUpdated();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        editForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsEditing(false);
      onTaskUpdated();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="task-card">
      {isEditing ? (
        <div className="edit-form">
          <input
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            placeholder="Title"
          />
          <input
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            placeholder="Description"
          />
          <select
            value={editForm.status}
            onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="btn-group">
            <button className="save-btn" onClick={handleSave}>Save</button>
          </div>
        </div>
      ) : (
        <div>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p className={`status ${task.status.replace(/\s/g, '').toLowerCase()}`}>
            {task.status}
          </p>
          <div className="btn-group">
            <button className="edit-btn" onClick={handleEdit}>Edit</button>
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
