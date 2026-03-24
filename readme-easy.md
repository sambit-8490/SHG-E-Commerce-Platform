# 🛒 SHG E-Commerce Platform

A full-stack e-commerce platform built using **Django (Backend)** and **React (Frontend)** with **MySQL** database, containerized using **Docker**.

---

## 🚀 Features

* User Registration & Login (JWT Authentication)
* Admin Panel (Django Admin)
* Product Management
* Group (SHG) Management
* Cart & Orders
* Payment Integration (Stripe - optional)
* REST API using Django REST Framework

---

## 🛠️ Tech Stack

### Backend

* Django
* Django REST Framework
* MySQL
* JWT Authentication

### Frontend

* React (Vite)
* Axios

### DevOps

* Docker
* Docker Compose

---

## 📦 Project Structure

```
SHG-E-Commerce-Platform/
│
├── backend/        # Django project
├── frontend/       # React app
├── compose.yml     # Docker Compose file
└── README.md
```

---

## ⚙️ Setup & Run (Docker - Recommended)

### 1. Clone the repo

```
git clone <your-repo-url>
cd SHG-E-Commerce-Platform
```

---

### 2. Start containers

```
docker-compose up --build
```

---

### 3. Run migrations

```
docker-compose exec backend python project/manage.py migrate
```

---

### 4. Create superuserv or admin

```
docker-compose exec backend python project/manage.py createsuperuser
```

---

## 🌐 Access the app

| Service  | URL                         |
| -------- | --------------------------- |
| Frontend | http://localhost:5173       |
| Backend  | http://localhost:8000       |
| Admin    | http://localhost:8000/admin |

---

## 🧪 Useful Commands

### Stop containers

```
docker-compose down
```

### Rebuild containers

```
docker-compose up --build
```

### View logs

```
docker logs shg_backend
```

---

## ⚠️ Notes

* Make sure MySQL container is running before backend starts
* Run migrations after first setup
* Update `SECRET_KEY` for production
* Configure Stripe & Email settings if needed

---

## 🔐 Environment Variables (Optional)

You can move sensitive data to `.env` file:

```
DB_NAME=shgproject
DB_USER=root
DB_PASSWORD=root
DB_HOST=db
DB_PORT=3306
```

---

## 🎯 Future Improvements

* Production deployment (Gunicorn + Nginx)
* Add Redis (for caching)
* Improve UI/UX
* Add unit tests

---

## 👨‍💻 Author

Your Name

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
