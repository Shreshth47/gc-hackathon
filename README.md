
# General Championship Management System

## Overview
This repository contains the solution for the General Championship 2024-25 Management System. 
The system is designed to streamline the processes of registration, team selection, event scheduling, and leaderboard management for the General Championship.

## Key Features

**Segregated Authorization** :
   We have divided the system into 4 main roles: Admin, Hall Rep, Event Coordinator and General Public. Each role has specific permissions and access to different features.

**Public Access**:
- Participants can view events and register their teams by providing personal details and skills relevant to the event. They can also view the leaderboard and event schedule. They can also view the event details and rules.
  
 **Hall Rep Access**:
- Hall Reps can view the list of participants from their hall, select teams for events, and view the overall points table for their hall. They can also view the event details and rules.
  
**Event Coordinator Access**:
   -ECs can edit event details , providing new info about schedule/rulebooks , and they can enter the scoring for their event which directly adds onto the their hall's points table. They can also view the event details and rules.
   
 **Admin Access**:
   - They have access to everything. Admins can define participating halls, assign Hall Reps,assign ECs, and create events with relevant details (title, description, rulebook, schedule, venue, and prizes).

**Event Scheduling**:
   - Admins can create a conflict-free schedule for events.This is done by implementing a robust algorithm for maximising participation.
   - 
 **Overall user experience and interface**:
   - We have designed a user-friendly interface with a clean and intuitive design. The system is responsive and accessible on all devices.

## Setup and Usage Instructions

### Technologies Used
- **Frontend**: Next.js, HTML, CSS , Typescript
- **Backend**: Firebase Firestore, Firebase Authentication

### Steps to Run the Project
1. Clone the repository:
   ```bash
   git clone <repository-link>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Access the app at `http://localhost:3000`.

### Firebase Setup
1. Set up Firebase project and add Firestore and Authentication.
2. Replace `firebaseConfig` in the code with your Firebase credentials.

## Team Information
- **Team Members**:
  - Name: Shreshth Shukla | Entry Number: 2023MEB1379 | Hall: BHS BOYS
  - Name: Aryan Singh | Entry Number: 2023CSB1102 | Hall: BHS BOYS
  - Name: Nishant Sahni | Entry Number: 2023CSB1140 | Hall: BHS BOYS
  - Name: Ayush Tyagi | Entry Number: 2023CSB1108 | Hall: BHS BOYS  
  - Name: Mayank Kumar Singh | Entry Number: 2023MMB1416 | Hall: BHS BOYS
