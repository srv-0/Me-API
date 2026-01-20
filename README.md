# Me-API Playground

A full-stack REST API and dashboard built as a Backend Engineering Assessment. This project serves a dynamic portfolio via a RESTful API connected to MongoDB Atlas, featuring a live dashboard for data management.
## Live Links
- **Frontend Dashboard (Vercel): [https://me-api-umber.vercel.app](https://me-api-umber.vercel.app)**
- **Backend API (Render): [https://me-api-sqdk.onrender.com/api](https://me-api-sqdk.onrender.com/api/profile)**
- **Health Check: [https://me-api-sqdk.onrender.com/health](https://me-api-sqdk.onrender.com/health)**
- **Resume : [Click Here to View My Resume](https://drive.google.com/file/d/1ONV7hl9RR3wPi7CkzeHnwWn-h7sWklm1/view?usp=drive_link)**

---
https://github.com/user-attachments/assets/eabb7d5b-c735-42c4-a849-45cd606522a5

## Features
- REST API to serve portfolio data (Profile, Projects, Work, Education)
- Search projects by skill using query params (`?skill=Node`)
- Dashboard UI to view and update profile JSON
- MongoDB Atlas integration via Mongoose schema
- Production deployment using Render + Vercel
- CORS protection + Environment Variables support

## Architecture

This project follows a **Client-Server Architecture** with a decoupled frontend and backend.

* **Frontend (Vercel):** A Vanilla JS/HTML dashboard that consumes the API to display and update profile data.
* **Backend (Render):** A Node.js/Express REST API that handles business logic and routing.
* **Database (MongoDB Atlas):** A cloud NoSQL database storing the profile, projects, and work history schema.
  
```mermaid
flowchart TD
    A["User / Browser"] -- "HTTPS Request" --> B["Frontend (Vercel)"]
    B -- "REST API Call" --> C["Backend API (Render)"]
    C -- "Mongoose Queries" --> D[("MongoDB Atlas")]
    D -- "JSON Data" --> C
    C -- "JSON Response" --> B
    B -- "Render UI" --> A
```

**High-Level Overview:**

```text
+-------------+         +----------------+         +-----------------+
|   Client    |         |    Server      |         |    Database     |
|  (Browser)  | <-----> | (Node/Express) | <-----> | (MongoDB Atlas) |
+-------------+  HTTPS  +----------------+  TCP    +-----------------+
      ^                        ^
      |                        |
Hosted on Vercel        Hosted on Render
```
**Flow:** `Client (Vercel) -> HTTPS Request -> API (Render) -> Mongoose -> MongoDB Atlas`

## Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB Atlas (Mongoose ODM)
* **Hosting:** Render (Backend), Vercel (Frontend)
* **Security:** Strict CORS policy, Environment Variables

---

##  Setup Instructions

### 1. Local Setup (Development)
Prerequisites: Node.js installed, MongoDB URI.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/srv-0/ME-API.git
    ```
2. ```bash
    cd me-api
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    ```

4.  **Configure Environment:**
    Create a `.env` file in the root directory:
    ```env
    MONGO_URI=mongodb+srv://youruser:yourpass@cluster.mongodb.net/?retryWrites=true&w=majority
    PORT=3000
    ```

5.  **Run the Server:**
    ```bash
    node server.js
    ```
    *Server will start on `http://localhost:3000`*

### 2. Production Setup (Deployment)
* **Backend:** Deployed on Render. Connection strings are stored in Render "Environment Variables".
* **Frontend:** Deployed on Vercel with "Build Command" overridden to empty to serve static HTML.

---

##  Database Schema
The data is modeled using a single Mongoose Schema (`Profile.js`):

| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Full Name (Required) |
| `email` | String | Unique Email (Required) |
| `skills` | [String] | Array of technical skills |
| `education` | [Object] | List of degrees/institutions |
| `projects` | [Object] | List of projects with tech stack & links |
| `work` | [Object] | Employment history |
| `links` | Object | Social URLs (GitHub, LinkedIn, etc.) |

---

##  API Documentation & Sample cURL

You can test the live API using these cURL commands.

**Base URL:** `https://me-api-sqdk.onrender.com/api`

### 1. Get Profile (GET)
Fetches the full portfolio data.

curl -X GET "https://me-api-sqdk.onrender.com/api/profile"

### 2. Search Projects (GET)
Filter projects by a specific skill (e.g., "Node").

curl -X GET "https://me-api-sqdk.onrender.com/api/projects?skill=Node"

### 3. Update Profile (POST)
Note: This updates the single user profile.

curl -X POST "https://me-api-sqdk.onrender.com/api/profile" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Saurav Singh",
           "email": "saurav@example.com",
           "skills": ["Node.js", "Express", "MongoDB"]
         }'

### 4. Health Check

curl -X GET "https://me-api-sqdk.onrender.com/health"

### Known Limitations
* Single User Design: The system is currently designed as a personal portfolio, supporting only one "Profile" document in the database.
* No Authentication: The POST endpoint is currently open for demonstration purposes. In a real-world scenario, JWT authentication would be added.
* #### Cold Starts: Hosted on Render's free tier, so the first request after inactivity may take 30-60 seconds to respond.

### Author
Saurav Singh

National Institute of Technology, Delhi
