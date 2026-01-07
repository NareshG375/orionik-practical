# 📅 Appointment Booking System

A scalable **Appointment Booking System** that allows users to **book, view, and cancel appointments** efficiently. Including **database partitioning** Task.

---

## 🚀 Features

- ✅ Book appointments with date & time validation
- ❌ Cancel or reschedule appointments
- 📄 View upcoming and past appointments
- 🕒 Prevent overlapping bookings
- 📊 Database partitioning Task
 

---

## 🧱 Tech Stack

### Backend
- Node.js
- Express.js
- Prisma ORM
 

### Database
- PostgreSQL
- Table partitioning  


---

## 🗄️ Database Design
 


## 🔌 API Endpoints


### Appointments
- `POST /api/book-appointment` – Book appointment
- `GET /api/` – List appointments
- `DELETE /api/cancel-appointment/:id` – Cancel appointment


### DataBase Partition
- `GET /api/user/:partition` – User Partition by partition name
- `GET /api/user/:id` –  Get partition by User ID

---

## 🧪 Validation Rules

- No overlapping appointments allowed
- Cannot book appointments in the past
---

## ⚙️ Setup Instructions

1. Clone the repository
 
git clone https://github.com/NareshG375/orionik-practical.git
 

2. Install dependencies
 
npm install
 

3. Configure environment variables

  - Create a **.env** file in the project root
  - Add your database URL config: 
   
  DATABASE_URL=postgresql://user:password@localhost:5432/appointments
 

4. Run database migrations
 
npx prisma migrate dev


5. Run the Seeder file 
  
  npm run seed

6. Start the server
 
npm run dev
 
---

## 📌 Use Cases

- Doctor appointment scheduling
- Salon / service booking
---
## 👨‍💻 Author
**Naresh Kumar**

 
 
