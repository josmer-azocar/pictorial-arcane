# Pictorial Arcane
**Art Museum Management & Exhibition Platform**

[![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk&logoColor=white)](#)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-Framework-6DB33F?logo=springboot&logoColor=white)](#)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-316192?logo=postgresql&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=0B0B0B)](#)
[![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED?logo=docker&logoColor=white)](#)
[![Azure](https://img.shields.io/badge/Azure-Deployment-0078D4?logo=microsoftazure&logoColor=white)](#)

Pictorial Arcane is a professional-grade web platform for **exhibiting** and **managing** contemporary art collections.  
The system targets the digital transformation needs of art galleries by providing a centralized, secure, and immersive experience for both administrators and collectors.
---

## 🖼️ Preview

<img width="1300" height="676" alt="image" src="https://github.com/user-attachments/assets/a58e2fb3-d783-406b-9599-b07968eaf8c3" />
<img width="1302" height="697" alt="image" src="https://github.com/user-attachments/assets/2378e6bb-5d48-4ca0-b9ea-1aea82dc9291" />


- **Live URL:** https://ambitious-ground-007308f1e.4.azurestaticapps.net/

---

## 🚀 Project Overview

In the era of digital transformation, traditional art collections often struggle with fragmented manual records and static user experiences.  
Pictorial Arcane addresses these issues with a decoupled architecture that focuses on:

- **Data integrity** and relational consistency
- **Scalability** and maintainability
- **Security** for authentication and sensitive operations
- A modern **visual-first** interface for showcasing artworks

---

## ✨ Key Features

### Gallery & User Experience
- **Immersive gallery** built with React for high-resolution artwork visualization without compromising performance.
- Modern browsing experience designed for collectors and visitors.

### Backend & Architecture
- **Decoupled architecture** using a RESTful backend built with Spring Boot.
- **Complex relationship mapping** using Spring Data JPA (Hibernate) for artists, artworks, and multi-genre/multi-type compositions.
- **Professional audit system**: automatic traceability via `created_at` and `modified_at` on core entities.

### Security
- **Spring Security** with **JWT** for stateless authentication.
- Additional multi-step **security code system** for sensitive transactions.

### Administration & Operations
- Administrative suite for **CRUD operations** on artists and artworks.
- Automated billing/invoicing and administrative reporting (project-scope dependent).

### Customer Tools
- National shipping cost calculator.
- Purchase history and personalized tracking.
- Virtual assistant mascot for FAQs.

---

## 🛠️ Tech Stack

### Backend
- **Java 21**
- **Spring Boot**
- **Spring Security + JWT**
- **Spring Data JPA (Hibernate)**

### Frontend
- **React**
- React Router
- Axios
- Chart.js
- HTML5, CSS3, ES6+

### Infrastructure & Tools
- **PostgreSQL**
- **Docker**
- **Microsoft Azure** (hosting & managed services)
- **Postman** for API validation

---

## 🗂️ Repository Structure

This repository is organized into two main modules:

- `backend/` → API, business logic, persistence, security
- `frontend/` → React UI, gallery views, dashboards

---

## 🧩 Backend Structure (Spring Boot)

```text
backend/
├─ src/
│  ├─ main/
│  │  ├─ java/
│  │  │  └─ <base-package>/
│  │  │     ├─ config/                # Security, CORS, app configuration
│  │  │     ├─ jwt/                   # JWT filters, auth utilities, role handling
│  │  │     ├─ domain/                # Business logic, DTOs (request, response, update), custom Exceptions
│  │  │     ├─ persistence/           # Spring Data JPA repositories, JPA entities (AuditableEntity base)
│  │  │     └─ web/                   # REST controllers, Exception handler
│  │  └─ resources/
│  │     ├─ application.properties    # Spring configuration
│  │     └─ db/                       # seeds 
│  └─ test/                           # Unit/integration tests
├─ pom.xml
└─ README.md
```

---

## 🎨 Frontend Structure (React)


```text
frontend/
├─ public/
│  └─ imagen/                         # Static assets 
├─ src/
│  ├─ services/                       # Axios clients, API services
│  ├─ assets/                         # Images, icons, fonts
│  ├─ components/                     # Reusable UI components
│  ├─ pages/                          # Route-level screens 
│  ├─ App.jsx/tsx
│  └─ main.jsx/tsx (or index.js)
├─ index.html
├─ package.json
└─ README.md 
```
---

## ⚙️ Local Setup

### 1) Clone
```bash
git clone https://github.com/josmer-azocar/pictorial-arcane.git
cd pictorial-arcane
```

### 2) Run Backend
```bash
cd backend
mvn spring-boot:run
```

### 3) Run Frontend
```bash
cd ../frontend
npm install
npm start
```

---

## 🧭 System Architecture

### Relational Model (Database)
The database is normalized to support entities for artists, artwork subtypes (Paintings, Sculptures, Photography, etc.), users, sales, and memberships.

![pictorial_arcane_db (EN)](https://github.com/user-attachments/assets/07e23513-f41a-4add-bf1f-1d4d59c3fcea)

### Class Diagram
The backend follows a hierarchical structure where entities extend from a base `AuditableEntity` to enforce system-wide traceability.

![pictorial_arcane UML](https://github.com/user-attachments/assets/ee927f1e-4d62-4cc6-b299-ac10cabea14a)

---

## ☁️ Deployment

The platform is deployed on Microsoft Azure to replicate a real production environment.

- **Public URL:** https://ambitious-ground-007308f1e.4.azurestaticapps.net/

---

## 🧪 API Testing

- Postman is used to validate endpoints, authentication flows, and transactional security steps.

## 👥 Authors

<img width="1199" height="1690" alt="image" src="https://github.com/user-attachments/assets/5244c7ce-1d78-48e2-9be1-06bd75981a62" />


Developed by:
- Josue Azocar (Backend)
- Josmer Azocar (Backend)
- Inés Salazar (Frontend)
- Lismarx Gamboa (Frontend)
- Licett Avendaño (Frontend)
---

## 📄 License
