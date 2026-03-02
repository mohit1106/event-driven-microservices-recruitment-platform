# ElevenHire - Event-Driven Microservices Recruitment Platform

Welcome to the **ElevenHire** repository. This is a comprehensive, event-driven microservices-based recruitment platform. It connects recruiters and job seekers using modern technologies and an AI-powered toolkit.

## 🚀 Tech Stack

- **Frontend**: Next.js 16, React 19, TailwindCSS 4, Radix UI Primitives
- **Backend Services**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL (Neon Serverless)
- **Caching & Sessions**: Redis
- **Message Broker (Event-Driven)**: Kafka (KafkaJS)
- **Storage/Media**: Cloudinary
- **AI Integration**: Google Gemini AI (`@google/genai`)
- **Payments**: Razorpay

---

## 🏗 Microservices Architecture

The backend is decomposed into 5 main microservices. They communicate via REST APIs and asynchronous Kafka events.

### 1. High-Level System Design

```mermaid
flowchart TD
    Client[Next.js Frontend]

    subgraph Backend Microservices
        Auth[Auth Service]
        Job[Job Service]
        Payment[Payment Service]
        User[User Service]
        Utils[Utils Service]
    end

    subgraph Infrastructure & External
        DB[(Neon PostgreSQL)]
        Redis[(Redis Cache)]
        Kafka{Kafka Message Broker}
        Cloudinary[Cloudinary]
        Gemini[Google Gemini AI]
        Razorpay[Razorpay API]
        SMTP[SMTP / Email Server]
    end

    %% Client Connections
    Client <-->|REST API| Auth
    Client <-->|REST API| Job
    Client <-->|REST API| Payment
    Client <-->|REST API| User
    Client <-->|REST API| Utils

    %% DB Connections
    Auth & Job & User & Payment -->|SQL Queries| DB
    Auth -->|Set/Get Tokens| Redis

    %% External APIs
    Utils -->|Upload images/documents| Cloudinary
    Utils -->|Analyze Resume/Career| Gemini
    Payment -->|Process Transactions| Razorpay

    %% Event-Driven Kafka Flows
    Auth -->|Publish 'send-mail'| Kafka
    Job -->|Publish 'send-mail'| Kafka
    Kafka -->|Consume 'send-mail'| Utils
    Utils -->|Send Emails| SMTP
```

### 2. Services Overview

| Service | Description | Port | Key Technologies |
|---|---|---|---|
| **Auth** | User registration, login, JWT issuance, and password resets. Emits email events. | ? | Express, Neon, Redis, Kafka, Bcrypt, JWT |
| **Job** | Job postings, company management, application tracking. Emits email events. | ? | Express, Neon, Kafka |
| **User** | Profile management, skill updates, resume/image updates via Utils service. | ? | Express, Neon, Axios |
| **Payment** | Handles Razorpay checkouts and payment verification for subscriptions. | ? | Express, Razorpay |
| **Utils** | General utilities: Cloudinary uploads, AI Resume/Career analysis, and Kafka Mail Consumer. | ? | Express, Cloudinary, Gemini AI, Nodemailer, KafkaJS |

---

## 🗄 Database Schema (ERD)

The microservices share a PostgreSQL instance. The schema relationships are modeled below:

```mermaid
erDiagram
    users {
        int user_id PK
        string name
        string email
        string password
        string phone_number
        enum role "jobseeker or recruiter"
        text bio
        string resume
        string profile_pic
        timestamp subscription
    }

    skills {
        int skill_id PK
        string name
    }

    user_skills {
        int user_id FK
        int skill_id FK
    }

    companies {
        int company_id PK
        string name
        text description
        string website
        string logo
        int recruiter_id FK "References users"
    }

    jobs {
        int job_id PK
        string title
        text description
        numeric salary
        string location
        enum job_type
        enum work_location
        int company_id FK
        int posted_by_recruiter_id FK "References users"
        boolean is_active
    }

    applications {
        int application_id PK
        int job_id FK
        int applicant_id FK "References users"
        string applicant_email
        enum status
        string resume
        timestamp applied_at
    }

    users ||--o{ user_skills : "has"
    skills ||--o{ user_skills : "belongs to"
    users ||--o{ companies : "creates (if recruiter)"
    companies ||--o{ jobs : "posts"
    users ||--o{ applications : "submits (if jobseeker)"
    jobs ||--o{ applications : "receives"
```

---

## 🔌 API Endpoints Summary

### Auth Service (`/api/auth`)
- `POST /register`: Register a new jobseeker or recruiter.
- `POST /login`: Authenticate and receive a JWT.
- `POST /forgot`: Send a password reset email (via Kafka).
- `POST /reset/:token`: Reset password using token.

### Job Service (`/api/job`)
- `POST /company/new`: Create a new company profile.
- `DELETE /company/:companyId`: Delete a company.
- `GET /company/all`: Get all companies created by the logged-in recruiter.
- `GET /company/:id`: Get company details along with its jobs.
- `POST /new`: Post a new job.
- `PUT /:jobId`: Update an existing job.
- `GET /all`: Fetch all active jobs (supports filtering).
- `GET /:jobId`: Fetch single job details.
- `GET /application/:jobId`: Get all applications for a specific job.
- `PUT /application/update/:id`: Update application status (Submits email to Kafka).

### Payment Service (`/api/payment`)
- `POST /checkout`: Generate a Razorpay order ID.
- `POST /verify`: Verify Razorpay signature and grant user subscription.

### User Service (`/api/user`)
- `GET /me`: Get current logged-in user profile.
- `GET /:userId`: Get another user's profile.
- `PUT /update/profile`: Update name, bio, phone number.
- `PUT /update/pic`: Update profile picture (calls Utils service).
- `PUT /update/resume`: Update PDF resume.
- `POST /skill/add`: Add a skill to the user.
- `PUT /skill/delete`: Remove a skill.
- `POST /apply/job`: Apply for a job.
- `GET /application/all`: Fetch all applications submitted by the user.

### Utils Service (`/api/utils`)
- `POST /upload`: Uploads a file (image/pdf) buffer to Cloudinary and returns the URL.
- `POST /career`: Uses Gemini AI to generate career paths, job options, and learning approaches based on given skills.
- `POST /resume-analyser`: Parses a base64 encoded PDF using Gemini AI to generate an ATS score and resume improvement suggestions.

---

## 📋 Running the Project Properly

### 1. Environment Variables Configuration
Ensure each microservice has a `.env` file with the expected connection strings:
- `Redis_url`, `Kafka_Broker`
- `Frontend_Url`, `UPLOAD_SERVICE`
- Database URL (`PGHOST`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`, etc., as per Neon Serverless docs)
- Third-party API keys: `Razorpay_Key`, `Razorpay_Secret`, `API_KEY_GEMINI`, `SMTP_USER`, `SMTP_PASS`, Cloudinary credentials.

### 2. Run Kafka and Redis
Both Kafka and Redis must be running locally or in Docker. See `kafka-docker-setup.txt` inside `services/` for local Kafka provisioning.

### 3. Run Microservices
In each of the five service directories (`services/auth`, `services/job`, `services/payment`, `services/user`, `services/utils`), run:
```bash
npm install
npm run dev
```

### 4. Run Frontend
Navigate to the `frontend/` directory, set `.env` with backend hostnames, and run:
```bash
npm install
npm run dev
```
