# student-repo
 
This repository was created for you as part of a course project. You are required to use this project for any course work and contact 
the lecturer in case you encounter any problems with the settings and configuration of the project.

Any code or related work done in other, self-created Gitlab projects is **not considered for grading**.


## Web Frontend

- The frontend shall work in the following browser versions:
  - Chrome >= 119
  - Firefox >= 122
  - Safari >= 16.1

- The frontend can be created in **JavaScript** or **TypeScript**, using **HTML** and **CSS** as appropriate.

- The source code for the frontend shall be written as a **Single Page Application (SPA)** using either **React** or **Vue**.

- The frontend shall be optimized for **mobile screens**.

- **Unit and Integration tests** for all JavaScript/TypeScript code shall be written using the respective test frameworks for Vue or React.

- All functional requirements for the web app shall be verified in terms of **End-to-End (E2E) tests**.

- **E2E tests** shall be written using **Cypress** or **Playwright**.

- The **reverse proxy** shall be part of the web frontend service.

- The reverse proxy shall:
  - Route all external traffic to the respective internal service.
  - Serve the static files for the web frontend.


## Directory structure

```bash
web-frontend/
│
├── public/
│   └── index.html
│
├── src/
│   ├── assets/                # Images, icons, etc.
│   ├── components/            # Reusable UI components
│   │   ├── common/            # Buttons, Inputs, Modals, etc.
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Loader.tsx
│   │
│   ├── features/              # Feature-based structure
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── authSlice.ts   # Redux slice for auth
│   │   │   └── authAPI.ts
│   │   │
│   │   ├── calculator/
│   │   │   ├── CalculatorPage.tsx
│   │   │   ├── CalculatorForm.tsx
│   │   │   ├── ModelSelector.tsx
│   │   │   ├── PredictionResult.tsx
│   │   │   └── calculatorSlice.ts
│   │   │
│   │   ├── history/
│   │   │   ├── PredictionHistory.tsx
│   │   │   └── historySlice.ts
│   │   │
│   │   ├── admin/
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── ModelList.tsx
│   │   │   ├── FeatureSelector.tsx
│   │   │   └── adminSlice.ts
│   │   │
│   │   └── ad/
│   │       └── AdvertisementPage.tsx
│
│   ├── pages/                 # Top-level page views
│   │   ├── LandingPage.tsx
│   │   ├── NotFound.tsx
│   │   └── ProtectedRoute.tsx
│
│   ├── routes/                # React Router config
│   │   └── AppRoutes.tsx
│
│   ├── redux/                 # Store and root reducer setup
│   │   ├── store.ts
│   │   └── rootReducer.ts
│
│   ├── styles/                # Global styles, Tailwind or CSS modules
│   │   └── index.css
│
│   ├── utils/                 # Utility functions and constants
│   │   ├── validation.ts
│   │   ├── api.ts
│   │   └── constants.ts
│
│   ├── App.tsx
│   ├── main.tsx               # Entry point (Vite or CRA)
│   └── vite.config.ts         # If using Vite (recommended)
│
├── tests/
│   ├── unit/
│   │   └── CalculatorForm.test.tsx
│   ├── integration/
│   │   └── LoginFlow.test.tsx
│
├── cypress/
│   ├── e2e/
│   │   └── survival_calculator.cy.ts
│   └── support/
│       ├── commands.ts
│       └── e2e.ts
│
├── Dockerfile
├── docker-compose.yml         # (Reverse proxy + backend + frontend setup)
├── nginx/
│   └── default.conf            # NGINX reverse proxy config
├── .dockerignore
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```