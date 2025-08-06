import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    due_date: ''
  });
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/tasks`, newTask);
      setTasks([response.data, ...tasks]);
      setNewTask({ title: '', description: '', priority: 'medium', due_date: '' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingTask.title.trim()) return;

    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${editingTask.id}`, editingTask);
      setTasks(tasks.map(task => task.id === editingTask.id ? response.data : task));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleStatusChange = async (task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${task.id}`, {
        ...task,
        status: newStatus
      });
      setTasks(tasks.map(t => t.id === task.id ? response.data : t));
    } catch (error) {
      console.error('Error updating task status:', error);
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

  const getStatusColor = (status) => {
    return status === 'completed' ? '#10b981' : '#6b7280';
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>Task Management App</h1>
          <p>Organize your tasks efficiently</p>
        </header>

        {/* Add New Task Form */}
        <div className="task-form-container">
          <h2>Add New Task</h2>
          <form onSubmit={handleSubmit} className="task-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Task description (optional)"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="date"
                  value={newTask.due_date}
                  onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              <FaPlus /> Add Task
            </button>
          </form>
        </div>

        {/* Tasks List */}
        <div className="tasks-container">
          <h2>Your Tasks ({tasks.length})</h2>
          {tasks.length === 0 ? (
            <div className="no-tasks">
              <p>No tasks yet. Create your first task above!</p>
            </div>
          ) : (
            <div className="tasks-grid">
              {tasks.map(task => (
                <div key={task.id} className={`task-card ${task.status === 'completed' ? 'completed' : ''}`}>
                  {editingTask?.id === task.id ? (
                    <form onSubmit={handleUpdate} className="edit-form">
                      <input
                        type="text"
                        value={editingTask.title}
                        onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                        required
                      />
                      <textarea
                        value={editingTask.description}
                        onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                      />
                      <div className="edit-controls">
                        <select
                          value={editingTask.priority}
                          onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                        <input
                          type="date"
                          value={editingTask.due_date}
                          onChange={(e) => setEditingTask({ ...editingTask, due_date: e.target.value })}
                        />
                      </div>
                      <div className="edit-actions">
                        <button type="submit" className="btn btn-success">
                          <FaCheck /> Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingTask(null)}
                          className="btn btn-secondary"
                        >
                          <FaTimes /> Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="task-header">
                        <h3>{task.title}</h3>
                        <div className="task-actions">
                          <button
                            onClick={() => handleStatusChange(task)}
                            className={`btn btn-icon ${task.status === 'completed' ? 'btn-success' : 'btn-secondary'}`}
                            title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => setEditingTask(task)}
                            className="btn btn-icon btn-primary"
                            title="Edit task"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="btn btn-icon btn-danger"
                            title="Delete task"
                          >
                            <FaTrash />
                          </button>
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
                        <span
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(task.status) }}
                        >
                          {task.status}
                        </span>
                        {task.due_date && (
                          <span className="due-date">
                            Due: {new Date(task.due_date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <div className="task-date">
                        Created: {new Date(task.created_at).toLocaleDateString()}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
