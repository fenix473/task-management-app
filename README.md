# Task Management App

A modern, full-stack task management application built with React frontend, Node.js backend, and SQLite database.

## Features

- ✨ **Create, Read, Update, Delete** tasks
- 🎯 **Priority levels** (Low, Medium, High)
- 📅 **Due dates** for tasks
- ✅ **Status tracking** (Pending, Completed)
- 📝 **Task descriptions**
- 🎨 **Modern, responsive UI**
- 🔄 **Real-time updates**

## Tech Stack

### Frontend
- React 19
- Axios for API calls
- React Icons
- Modern CSS with responsive design

### Backend
- Node.js
- Express.js
- SQLite database
- CORS enabled
- RESTful API

## Project Structure

```
task-management-app/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── tasks.db (created automatically)
├── frontend/
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── App.js
│       ├── App.css
│       └── index.js
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

The backend will start on `http://localhost:5000` and automatically create the SQLite database.

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend will start on `http://localhost:3000` and automatically open in your browser.

## 🐳 Docker Deployment (Recommended)

For easy deployment and hosting, use Docker:

### Quick Start with Docker
```bash
# Clone the repository
git clone https://github.com/fenix473/task-management-app.git
cd task-management-app

# Build and run with Docker Compose
docker-compose up --build

# Access the application
# Frontend: http://localhost
# Backend API: http://localhost:5000/api
```

### Production Deployment
```bash
# Deploy to production
docker-compose -f docker-compose.yml up -d --build
```

For detailed Docker deployment instructions, see [DOCKER_README.md](DOCKER_README.md).

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Task Object Structure
```json
{
  "id": 1,
  "title": "Task Title",
  "description": "Task description",
  "status": "pending",
  "priority": "medium",
  "due_date": "2024-01-15",
  "created_at": "2024-01-01T10:00:00.000Z",
  "updated_at": "2024-01-01T10:00:00.000Z"
}
```

## Usage

1. **Adding Tasks**: Use the form at the top to create new tasks with title, description, priority, and due date.

2. **Managing Tasks**: 
   - Click the checkmark icon to toggle task completion
   - Click the edit icon to modify task details
   - Click the trash icon to delete tasks

3. **Task Organization**: 
   - Tasks are displayed in a responsive grid layout
   - Priority levels are color-coded (Red: High, Yellow: Medium, Green: Low)
   - Completed tasks are visually distinguished with strikethrough text

## Database Schema

The SQLite database automatically creates a `tasks` table with the following structure:

```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  priority TEXT DEFAULT 'medium',
  due_date TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Development

### Running Both Servers

You can run both servers simultaneously by opening two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

### Making Changes

- Frontend changes will automatically reload in the browser
- Backend changes will restart the server automatically (when using `npm run dev`)
- The SQLite database file (`tasks.db`) will be created automatically in the backend directory

## Troubleshooting

1. **Port already in use**: If port 5000 or 3000 is already in use, you can change the ports in the respective configuration files.

2. **Database issues**: Delete the `tasks.db` file in the backend directory to reset the database.

3. **CORS errors**: The backend is configured with CORS to allow requests from the frontend. If you change the frontend port, update the CORS configuration in `server.js`.

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE). 