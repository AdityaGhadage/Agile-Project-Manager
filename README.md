# 🚀 Agile Project Management 

## 📌 Overview
This is a full-stack web application for managing projects using a simple agile workflow.

Project → User Story → Task

It allows managing team members and assigning work.

## ✨ Features
- Project management
- Team (user) management
- Story assignment to users
- Task tracking
- Status updates (Todo / In Progress / Completed)
- Background job (node-cron)

## 🧱 Tech Stack
Frontend: React, Axios  
Backend: Node.js, Express  
Database: SQLite, Sequelize  
Async: node-cron  

## 🏗️ Architecture
Frontend → Backend API → Sequelize → SQLite

## 🔗 API
Projects:
```bash
POST /projects  
GET /projects  
PUT /projects/:id  
DELETE /projects/:id  
```

Users:
```bash
POST /users  
GET /users  
```

Stories:
```bash
POST /stories  
GET /stories  
PUT /stories/:id/status  
```

Tasks:
```bash
POST /tasks 
``` 

## 🗄️ Database
```
Project(id, name, description)  
User(id, name)  
UserStory(id, title, status, ProjectId, UserId)  
Task(id, title, status, UserStoryId)
```  

## 🔄 Async Workflow
node-cron background job simulates reminders.

## 🚀 Setup
Backend:
```bash
cd backend  
npm install  
node app.js 
``` 

Frontend:
```bash
cd frontend  
npm install  
npm start 
``` 

## ⚖️ Design Decisions
- SQLite for simplicity  
- Sequelize ORM  
- REST APIs  
- Simple UI  

## 🔐 Security
- Basic validation  
- CORS enabled  
- No auth (future scope)  

## 🤖 AI Usage
Used for debugging and structure. Logic verified manually.

## 🚀 Future Work
- Authentication  
- Kanban board  
- Notifications  
- Deployment