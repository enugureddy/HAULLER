# HAULLER  
SIT 725 TEAM 40 FINAL PROJECT  

# Hauller

## Overview

Hauller is a logistics-based platform that connects users with drivers for transportation. This project serves as the boilerplate for the application, with basic CRUD operations integrated and real-time email notifications for user updates.

---

## Features Added: [THIRUMAL / CORE DEV]

### Sprint 1 – Core Development

- **Boilerplate Setup:**  
  Established the foundational backend structure using Node.js and Express.js. This setup includes server configuration, middleware integration, modular route handling, and environment-based configurations for clean, maintainable code.

- **CRUD Operations:**  
  Implemented core Create, Read, Update, and Delete functionality for ads, bookings, and user accounts. These operations were organized using controller modules and model files for better scalability and reuse.

- **Real-Time Email Notifications:**  
  Integrated SendGrid to send automatic emails during key events like ad creation, driver assignments, or booking confirmations. This ensures timely updates and better user engagement without requiring users to be online.

- **MVC Model:**  
  The application follows the Model-View-Controller (MVC) design pattern.  
  - **Models:** Handle MongoDB schema and data interactions.  
  - **Views:** EJS templates render dynamic content to the user.  
  - **Controllers:** Contain application logic and routing behavior.

- **Database Integration:**  
  Connected to MongoDB with Mongoose to define schemas for users, ads, chats, and other entities. All data transactions are abstracted via models, ensuring clean separation of concerns.

### Sprint 2 – Real-Time & Communication Features

- **Real-Time Notification System:**  
  Implemented a Web Push-based notification system that sends instant alerts for events like driver bookings, admin communications, or message receipts. This improves user responsiveness and creates a more engaging experience.

- **Live Messaging Between Users:**  
  Developed a private messaging feature using `socket.io` that allows real-time, two-way communication between members.  
  - Chat messages are transmitted instantly.  
  - Messages are associated with the respective ads for context.  
  - Enhances the user experience with modern app-like interaction.

---

## Features Added: [SUJAY / SPRINT 1 – ROLES BASED ACCESS]

- **Admin Role:**  
  - Login authentication for admin access  
  - View all registered members and manage user records  
  - View and monitor all ads  
  - Request information from selected users via a description input box  

- **Guest Role:**  
  - No registration required to access the platform  
  - Guests can view ads but cannot post or contact owners  
  - Limited functionality and read-only privileges  

- **Role-Specific CRUD Operations:**  
  Implemented access control logic for CRUD functionalities, allowing full access for admins while restricting guests to read-only access.

- **Role-Based Database Logic:**  
  MongoDB queries are customized to enforce data access rules based on the user’s role.

- **MVC Adherence:**  
  Maintained MVC architecture for separation of user logic and role-specific actions across the application.

---

## Features Added: [SUJAY / SPRINT 2 – FEATURE ENHANCEMENTS]

### Popularity-Based Ad Sorting and Display

- Created a system that tracks the number of times the "Contact Owner" button is clicked for each ad.  
- Ads are sorted in descending order of popularity.  
- In the case of equal popularity, alphabetical order is used as a secondary sort.  
- Extended the ad schema to store and update contact counts.

### Keyword-Based Search

- Implemented a basic keyword search that checks ad titles for matches.  
- The search is case-insensitive for improved user experience.

### Ad Wishlist & Member View

- Added a bookmarking feature where users can save ads to a "wishlist".  
- A separate wishlist view page is created for easy access.  
- Users can also remove ads from the wishlist.  
- An empty wishlist is displayed with a user-friendly message and layout.

---

## Features Added: [ASHOK / UNIT TESTING]

- **Unit Testing Across Functional Modules:**  
  Conducted comprehensive unit testing to ensure reliability and correctness of all implemented features.  
  - Authentication and login/logout validation  
  - Admin functionalities like user management  
  - Guest read-only access restrictions  
  - Member ad posting and wishlist management  
  - Popularity counter logic and ad display  
  - Chat and messaging services  
  - Search and sort algorithms  
  Testing was done using assertion libraries and mock data to simulate various edge cases and user flows.

---

## Features Added: [SAKETH / UI-UX & INTERACTION]

- **Complete Web App UI:**  
  Designed and implemented responsive UI views using EJS with attention to layout consistency and user-friendly interfaces across all pages.

- **Branding and UI Consistency:**  
  Created a clean, branded user experience including logos, color schemes, and consistent styling for buttons, forms, and navigation.

- **Real-Time Typing Indicator in Chat:**  
  Introduced a typing indicator feature using socket events that notifies users when the other party is actively typing, enhancing live interaction realism.

---

## Technologies Used

- **Frontend:** EJS (Embedded JavaScript Templates)  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose  
- **Email Notifications:** SendGrid  
- **Real-Time Features:** Socket.io for chat and notifications  
- **Architecture:** Model-View-Controller (MVC)

---

## Setup Instructions

1. Clone the repository:  
   ```bash
   git clone https://github.com/Thirus224849242/HAULLER.git  
   cd HAULLER  
   
---

## Run Instructions

1.   cd HAULLER  
     node server.js
      
