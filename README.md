# HAULLER
SIT 725 TEAM 40 FINAL PROJECT
# Hauller

## Overview

Hauller is a logistics-based platform that connects users with drivers for transportation. This project serves as the boilerplate for the application, with basic CRUD operations integrated and real-time email notifications for user updates.

---

## Features Added:[THIRUMAL/CORE DEV]

- Boilerplate Setup: Set up the foundational structure of the application.
- CRUD Operations: Implemented create, read, update, and delete functionality for core features.
- Real-Time Email Notifications: Integrated a service for real-time email notifications when important updates occur (e.g., booking updates, driver assignments).
- MVC Model: Followed the Model-View-Controller design pattern using EJS as the view engine.
- Database: Utilized MongoDB to store and manage application data.

## Features Added:[SUJAY/ROLES BASED ACCESS]

- Admin Role: 
            -Login authentication
            -viewing all registered members
            -View and monitor ads for every member
            -ability to request information from -selected members with customizable  description box.

-Guest Role: 
            -No login and can enter platform without registration
            -viewing all ads
            -restricting interaction with registered members
            -limited privileges with no ad listing

- CRUD Operations: modified create, read, update, and delete functionality individually for guest and admin roles.

- Database: Utilized MongoDB to manage application data for guest and admin access restriction.

- MVC Model: Followed the Model-View-Controller design pattern using EJS as the view engine.

---

## Technologies Used:

- Frontend: EJS (Embedded JavaScript templates)
- Backend: Node.js, Express.js
- Database: MongoDB
- Email Service: Integrated real-time mail notifications
- Model-View-Controller (MVC): Architectural pattern used for organizing the app’s structure

---

## Setup Instructions:

1. Clone the repository:bash
   
   git clone https://github.com/Thirus224849242/HAULLER.git
   cd HAULLER
   
## RUN Instructions:
   cd HAULLER
   node server.js or nodemon server.js

## Versions:
   Node- v22.14.0
   @sendgrid/mail: v8.1.5,
   express: v4.17.2,
