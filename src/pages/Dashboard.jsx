import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateProjectModal from '../components/CreateProjectModal';
import TaskList from '../components/TaskList';
import './Dashboard.css'; // <<< Import CSS file

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const token = localStorage.getItem('token');

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/projects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Projects</h2>
      <CreateProjectModal onProjectCreated={fetchProjects} projectId={selectedProject?._id} />
      
      <ul className="project-list">
        {projects.map((project) => (
          <li
            key={project._id}
            className={`project-item ${selectedProject?._id === project._id ? 'active' : ''}`}
            onClick={() => setSelectedProject(project)}
          >
            {project.title}
          </li>
        ))}
      </ul>

      {selectedProject && (
        <div className="tasklist-container">
          <h3 className="tasklist-heading">{selectedProject.title} - Tasks</h3>
          <TaskList projectId={selectedProject._id} />
        </div>
      )}
      
    </div>
  );
}

export default Dashboard;
