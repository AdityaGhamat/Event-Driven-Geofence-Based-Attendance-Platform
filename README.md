# Event-Driven Geofence-Based Attendance Platform

A scalable, event-driven attendance management system that automatically tracks employee presence using geofencing and real-time location updates.  
The platform is designed to work without manual punch-in/punch-out and supports distributed processing for high reliability and scalability.

---

## Overview

This project implements an **event-driven architecture** where location updates and attendance calculations are handled asynchronously using queues.  
It supports multiple clients while ensuring accurate attendance tracking based on geographical boundaries and working hours.

The system is suitable for organizations that require:

- Automated attendance tracking
- Location-based validation
- High scalability and fault tolerance
- Clean separation of concerns

---

## System Architecture

![System Architecture](docs/architecture.png)

### Components

- **Admin Panel (React)**  
  Used by administrators to manage offices, employees, attendance rules, and reports.

- **Mobile App (React Native)**  
  Runs on employee devices and periodically sends location updates to the backend.

- **Node.js API (Express)**  
  Central orchestration layer that validates requests, emits events, handles business logic, and communicates with the database.

- **Redis (Queue / Cache)**  
  Acts as an event bus for decoupled processing of location updates, attendance jobs, and aggregation tasks.

- **Geofencing Engine**  
  Uses the Haversine formula to calculate distances between user location and office geofence.

- **MongoDb Database**  
  Stores users, offices, attendance slots, daily summaries, and historical analytics.

---

## Monorepo Structure

```txt
.
├── apps
│   ├── backend        # Node.js + Express API
│   ├── frontend       # React Admin Panel
│   └── mobile         # React Native (Expo) Mobile App
│
├── packages           # Shared types and utilities
│
├── docs
│   └── architecture.png
│
├── compose.yaml       # Docker Compose setup
├── turbo.json         # Turborepo configuration
├── package.json
└── README.md
```

Event-Driven Attendance Flow

Mobile application sends periodic location updates.

Backend validates the request and publishes a location event to Redis.

Background workers consume the event and:

Validate geofence constraints

Update attendance slots

Office-level workers detect office close events.

Aggregation jobs compute:

Total working hours

Daily attendance status

Weekly and monthly summaries

Results are stored in PostgreSQL and exposed to the Admin Panel.

Geofencing Logic

Distance calculation is done using the Haversine formula

Attendance is marked only if:

User is within the allowed geofence radius

Time falls within office working hours

Slot-based tracking ensures accurate working-hour calculation

Technology Stack
Backend

Node.js

Express

TypeScript

Redis

MongoDb

Docker

Frontend

React

TypeScript

Vite

Mobile

React Native

Expo

Background location tracking

Infrastructure

Turborepo

Docker Compose

Event-driven background workers

Local Development

# Install dependencies

npm install

# Start all services

docker compose up

# Backend

cd apps/backend
npm run dev

# Frontend

cd apps/frontend
npm run dev

# Mobile

cd apps/mobile
npx expo start

Key Design Decisions

Event-driven processing instead of synchronous cron-based logic

Redis queues for horizontal scalability

Slot-based attendance tracking for accuracy

Separation of concerns between API, workers, and clients

Monorepo architecture for shared types and consistency

Use Cases

Enterprise attendance systems

Location-restricted workforce management

Distributed employee monitoring

Real-time analytics and reporting

License

MIT License
