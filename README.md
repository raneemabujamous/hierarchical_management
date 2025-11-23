## Notes

- The **database is locally**.

---
## install dep 
npm i 
## Backend

# Start the API server:

npm run start:dev


# Runs on: http://localhost:8080

# Swagger docs ( api documantation ): http://localhost:8080/docs#

# Database (PostgreSQL / Neon)
connect it to your local db 


📊 Database Relationships 
Hierarchy
Organization → Department → Project → Task

Relationships


Organization has many Departments -- admin just can add it 


Department belongs to Organization, has many Projects, may have a Manager (User) ( admin just can add it )


Project belongs to Department, has many Tasks, may have a Manager (User)


Task belongs to Project, and has many-to-many relation with Users (assignees)


User belongs to Organization, may manage Departments/Projects, and can be assigned to many Tasks


Notification belongs to Project


Assignment Table
task_assignees (task_id, user_id)




🔑 Role Descriptions
1-ADMIN


Full access to all Organizations, Departments, Projects, and Tasks


Can create, update, delete any entity

2-MANAGER


Manages their  Department


Can view and edit their Department, its Projects, and all Tasks inside


Can assign employees to tasks


Cannot access other Departments


3-EMPLOYEE


Can view and edit only the Tasks assigned to them


Cannot access Departments or Projects they are not part of





example for notifiaction  =>> notification_2025.csv



This service populates the database with realistic test data for development and testing.

Features

Generates hierarchical data:
Organization → Departments → Projects → Tasks

Supports scalable data generation with a scale factor.

Automatically clears existing data before seeding.

How to Use
form api /seed

scale (optional) adjusts the size of the dataset:

1 → full-size dataset

0.5 → half-size dataset

2 → double-size dataset

Example Output

1 Organization

~100 Departments × scale

~50–80 Projects per Department × scale

~100–200 Tasks per Project × scale