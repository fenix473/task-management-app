# Task Management App - Docker Deployment

This guide explains how to deploy the Task Management App using Docker and Docker Compose.

## 🐳 Docker Setup

### Prerequisites
- Docker installed on your system
- Docker Compose installed
- Git (to clone the repository)

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/fenix473/task-management-app.git
   cd task-management-app
   ```

2. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost
   - Backend API: http://localhost:5000/api

### Production Deployment

#### Using Docker Compose (Recommended)

1. **Build and start services:**
   ```bash
   docker-compose -f docker-compose.yml up -d --build
   ```

2. **Check service status:**
   ```bash
   docker-compose ps
   ```

3. **View logs:**
   ```bash
   docker-compose logs -f
   ```

#### Using Individual Docker Commands

1. **Build backend:**
   ```bash
   docker build -t task-management-backend ./backend
   ```

2. **Build frontend:**
   ```bash
   docker build -t task-management-frontend ./frontend
   ```

3. **Run backend:**
   ```bash
   docker run -d --name backend -p 5000:5000 -v task-db:/app/data task-management-backend
   ```

4. **Run frontend:**
   ```bash
   docker run -d --name frontend -p 80:80 task-management-frontend
   ```

## 🌐 Deployment Options

### 1. Local Development
```bash
docker-compose up --build
```

### 2. Production Server
```bash
# Set environment variables
export NODE_ENV=production

# Deploy with Docker Compose
docker-compose -f docker-compose.yml up -d --build
```

### 3. Cloud Platforms

#### Heroku
1. Install Heroku CLI
2. Create a new Heroku app
3. Add Docker buildpack:
   ```bash
   heroku buildpacks:set heroku/docker
   ```
4. Deploy:
   ```bash
   git push heroku main
   ```

#### Railway
1. Connect your GitHub repository
2. Railway will automatically detect Docker setup
3. Deploy with one click

#### DigitalOcean App Platform
1. Connect your GitHub repository
2. Select Docker as deployment method
3. Configure environment variables
4. Deploy

#### AWS ECS
1. Create ECS cluster
2. Create task definition
3. Create service
4. Deploy using AWS CLI or console

## 🔧 Configuration

### Environment Variables

#### Backend
- `NODE_ENV`: Set to `production` for production deployment
- `PORT`: Port for the backend server (default: 5000)

#### Frontend
- `REACT_APP_API_URL`: API base URL (default: http://localhost:5000/api)

### Database Persistence

The SQLite database is stored in a Docker volume (`task-db`) to persist data across container restarts.

### Ports
- Frontend: 80 (HTTP)
- Backend: 5000 (API)

## 📊 Monitoring

### Health Checks
Both services include health checks:
- Backend: Checks API endpoint availability
- Frontend: Checks web server availability

### Logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f
```

## 🔒 Security

### Production Considerations
1. **Use HTTPS**: Configure SSL/TLS certificates
2. **Environment Variables**: Store sensitive data in environment variables
3. **Network Security**: Use Docker networks for service communication
4. **Regular Updates**: Keep Docker images updated

### Security Headers
The nginx configuration includes security headers:
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Content-Security-Policy

## 🚀 Scaling

### Horizontal Scaling
```bash
# Scale backend services
docker-compose up --scale backend=3

# Scale frontend services
docker-compose up --scale frontend=2
```

### Load Balancing
For production deployments, consider using:
- Nginx as a reverse proxy
- AWS Application Load Balancer
- Kubernetes ingress controllers

## 🛠️ Troubleshooting

### Common Issues

1. **Port conflicts:**
   ```bash
   # Check what's using the ports
   netstat -tulpn | grep :80
   netstat -tulpn | grep :5000
   ```

2. **Database issues:**
   ```bash
   # Remove volume and recreate
   docker-compose down -v
   docker-compose up --build
   ```

3. **Build failures:**
   ```bash
   # Clean Docker cache
   docker system prune -a
   docker-compose build --no-cache
   ```

### Debug Commands
```bash
# Enter running container
docker exec -it task-management-backend sh
docker exec -it task-management-frontend sh

# Check container resources
docker stats

# Inspect container
docker inspect task-management-backend
```

## 📝 Maintenance

### Updates
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up --build -d
```

### Backup
```bash
# Backup database
docker run --rm -v task-db:/data -v $(pwd):/backup alpine tar czf /backup/task-db-backup.tar.gz -C /data .
```

### Cleanup
```bash
# Remove unused containers, networks, and images
docker system prune

# Remove everything including volumes
docker system prune -a --volumes
```

## 🎯 Next Steps

1. **Set up CI/CD pipeline** with GitHub Actions
2. **Configure monitoring** with Prometheus/Grafana
3. **Add logging** with ELK stack
4. **Implement backup strategy** for the database
5. **Set up SSL certificates** for HTTPS

## 📞 Support

For issues and questions:
- Check the troubleshooting section
- Review Docker and Docker Compose logs
- Open an issue on GitHub 