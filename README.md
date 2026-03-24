# Self-Help-Group (SHG) E-Commerce Platform

The **Self-Help-Group (SHG) E-Commerce Platform** is a full-stack web application designed to digitally empower **Self Help Groups (SHGs)** by enabling them to sell products online and manage orders efficiently.

The platform connects **customers**, **SHG group admins**, and **system administrators** in a single ecosystem.
Customers can browse products and place orders, while SHG admins manage inventory, approve orders, and track deliveries — all with secure authentication, online payments, **Cash on Delivery (COD)**, and automated email notifications.

---

## Key Features

### Customer / User

* **Secure Authentication:** Login & registration using **JWT tokens**
* **Product Browsing:** View products listed by different SHGs
* **Cart & Checkout:** Add items to cart and place orders
* **Payment Options:** Online payment gateway & **Cash on Delivery (COD)**
* **Order Tracking:** View order status (Pending / Approved / Shipped / Delivered)
* **Profile Management:** Update personal details
* **Email Notifications:** Automatic emails for order confirmation and status updates

---

### SHG Group Admin

* **Dedicated Admin Panel:** Manage SHG products and orders
* **Order Management:** View all customer orders
* **Approve / Reject Orders:** Control purchase requests
* **Shipping Updates:** Mark orders as Shipped or Delivered
* **Inventory Management:** Add, update, and delete products
* **Automated Emails:** Customers are notified on every order status change

---

### System Features

* **JWT-based Authentication:** Secure API communication
* **Role-based Access Control:** Separate access for users and SHG admins
* **RESTful APIs:** Built using Django REST Framework
* **Scalable Architecture:** Clean separation of frontend and backend
* **Secure Payments & Communication**

---

## Tech Stack

| **Component**      | **Technology Used**           |
| ------------------ | ----------------------------- |
| **Frontend**       | React, Tailwind CSS           |
| **Backend**        | Django, Django REST Framework |
| **Authentication** | JWT (JSON Web Tokens)         |
| **Database**       | MySQL                         |
| **Payments**       | Online Payment Gateway + COD  |
| **Email Service**  | Automated Email Notifications |
| **Architecture**   | REST API-based Full Stack     |

---

## Getting Started

Follow the steps below to run the project locally for development and testing.

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Abhiraj05/SHG-E-Commerce-Platform.git
```

---

## 2. Backend Setup (Django)

### Create & Activate Virtual Environment

```bash
cd backend
python -m venv env

# Windows
env\Scripts\activate

# macOS / Linux
source env/bin/activate
```

---

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

### Configure Environment Variables

Create a `.env` file inside the `backend` directory:

```env
SECRET_KEY=your_secret_key
DEBUG=True

DB_NAME=your_database_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=3306

EMAIL_HOST_USER=your_email
EMAIL_HOST_PASSWORD=your_email_password
```

---

### Apply Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

### Create Superuser (Admin)

```bash
python manage.py createsuperuser
```

---

### Run Backend Server

```bash
python manage.py runserver
```

Backend will run at:

```
http://127.0.0.1:8000
```

---

## 3. Frontend Setup (React)

### Navigate to Frontend Directory

```bash
cd frontend
```

---

### Install Dependencies

```bash
npm install
```

---

### Start Development Server

```bash
npm run dev
```

Frontend will run at:

```
http://127.0.0.1:5173
```

---

## Screenshots
### Home
![Home Page](assets/screencapture-127-0-0-1-5173-2026-02-04-19_18_33.png)

### User Authentication
![User Signup](assets/screencapture-127-0-0-1-5173-signup-2026-02-04-19_22_24.png)
![User Login](assets/screencapture-127-0-0-1-5173-signin-2026-02-04-19_21_41.png)
![Forgot Password](assets/screencapture-127-0-0-1-5173-forgotpassword-2026-02-04-19_21_11.png)

---

### Product Listing
![Products](assets/screencapture-127-0-0-1-5173-products-2026-02-04-19_19_12.png)

---

### Cart & Checkout
![Cart](assets/screencapture-127-0-0-1-5173-cart-2026-02-04-19_27_00.png)
![Payment](assets/screencapture-127-0-0-1-5173-payment-2026-02-04-19_27_39.png)

---

### User Dashboard
![User Profile](assets/screencapture-127-0-0-1-5173-userprofile-2026-02-04-19_23_30.png)
![Order History](assets/screencapture-127-0-0-1-5173-userprofile-2026-02-04-19_33_42.png)

---

### SHG Groups
![SHG Groups](assets/screencapture-127-0-0-1-5173-shggroups-2026-02-04-19_19_27.png)

---

### SHG Registration
![SHG Registration](assets/screencapture-127-0-0-1-5173-registrationform-2026-02-04-19_20_33.png)

---

### SHG Login
![SHG Login](assets/screencapture-127-0-0-1-5173-shglogin-2026-02-04-19_20_54.png)

---

### SHG Admin Panel
![Admin Dashboard](assets/screencapture-127-0-0-1-5173-adminpanel-2026-02-04-19_24_23.png)
![Admin Orders](assets/screencapture-127-0-0-1-5173-adminpanel-2026-02-04-19_37_21.png)

---

### About Page
![About](assets/screencapture-127-0-0-1-5173-about-2026-02-04-19_20_07.png)

---

### Contact Page
![Contact](assets/screencapture-127-0-0-1-5173-contact-2026-02-04-19_19_53.png)



