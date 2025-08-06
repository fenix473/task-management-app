import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaCalendarDay, FaChartBar, FaArrowLeft } from 'react-icons/fa';
import './Dashboard.css';

const API_BASE_URL = 'http://localhost:5000/api';

function Dashboard({ onBackToTasks }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    completedToday: 0,
    totalToday: 0,
    completionRate: 0
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      const allTasks = response.data;
      
      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];
      
      // Filter tasks completed today
      const completedToday = allTasks.filter(task => {
        const taskDate = new Date(task.updated_at).toISOString().split('T')[0];
        return task.status === 'completed' && taskDate === today;
      });
      
      // Filter all tasks created or updated today
      const tasksToday = allTasks.filter(task => {
        const createdDate = new Date(task.created_at).toISOString().split('T')[0];
        const updatedDate = new Date(task.updated_at).toISOString().split('T')[0];
        return createdDate === today || updatedDate === today;
      });
      
      setTasks(completedToday);
      setStats({
        completedToday: completedToday.length,
        totalToday: tasksToday.length,
        completionRate: tasksToday.length > 0 ? Math.round((completedToday.length / tasksToday.length) * 100) : 0
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <button onClick={onBackToTasks} className="back-button">
          <FaArrowLeft /> Back to Tasks
        </button>
        <h1>Today's Dashboard</h1>
        <p>Your productivity overview for today</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <h3>{stats.completedToday}</h3>
            <p>Tasks Completed Today</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaCalendarDay />
          </div>
          <div className="stat-content">
            <h3>{stats.totalToday}</h3>
            <p>Total Tasks Today</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaChartBar />
          </div>
          <div className="stat-content">
            <h3>{stats.completionRate}%</h3>
            <p>Completion Rate</p>
          </div>
        </div>
      </div>

      <div className="completed-tasks-section">
        <h2>Completed Tasks Today</h2>
        {tasks.length === 0 ? (
          <div className="no-tasks">
            <p>No tasks completed today yet. Keep up the great work!</p>
          </div>
        ) : (
          <div className="completed-tasks-grid">
            {tasks.map(task => (
              <div key={task.id} className="completed-task-card">
                <div className="task-header">
                  <h3>{task.title}</h3>
                  <div className="completion-time">
                    Completed at {formatTime(task.updated_at)}
                  </div>
                </div>
                
                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}
                
                <div className="task-meta">
                  <span
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                  >
                    {task.priority}
                  </span>
                  {task.due_date && (
                    <span className="due-date">
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </span>
                  )}
                </div>
                
                <div className="task-timeline">
                  <div className="timeline-item">
                    <span className="timeline-label">Created:</span>
                    <span className="timeline-value">
                      {new Date(task.created_at).toLocaleDateString()} at {formatTime(task.created_at)}
                    </span>
                  </div>
                  <div className="timeline-item">
                    <span className="timeline-label">Completed:</span>
                    <span className="timeline-value">
                      {new Date(task.updated_at).toLocaleDateString()} at {formatTime(task.updated_at)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {stats.completedToday > 0 && (
        <div className="motivation-section">
          <h3>🎉 Great Job!</h3>
          <p>
            You've completed {stats.completedToday} task{stats.completedToday !== 1 ? 's' : ''} today. 
            {stats.completionRate >= 80 ? ' Outstanding productivity!' : 
             stats.completionRate >= 50 ? ' Good progress!' : ' Keep going!'}
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard; 