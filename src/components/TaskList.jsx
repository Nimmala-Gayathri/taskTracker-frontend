import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import './TaskList.css'; // <<< Import the CSS

function TaskList({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`https://tasktracker-backend-1.onrender.com/api/tasks/${projectId}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div className="tasklist-container">
      <h3 className="tasklist-title">Manage Your Tasks</h3>
      <TaskForm projectId={projectId} onTaskCreated={fetchTasks} />
      <div className="tasklist-items">
        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks found. Create your first task!</p>
        ) : (
          tasks.map((task) => (
            <TaskItem key={task._id} task={task} onTaskUpdated={fetchTasks} />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;
