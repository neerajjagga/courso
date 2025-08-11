## Courso

A modern Learning Management System (LMS) that supports instructor course creation and management, student enrollment and learning, secure authentication with access and refresh tokens and Redis-backed sessions, media uploads via Cloudinary, and integrated Razorpay payments for checkout, order creation, and webhook-based verification. The platform enables structured courses with modules and lectures, progress tracking, and analytics. It includes email notifications and bot/rate-limit protection.


### Table of Contents
- Overview
- Tech Stack
- Project Structure
- Environment Variables
- Local Development
  - Manual setup
  - Docker setup
- API Reference
  - Auth
  - User
  - Courses
  - Modules
  - Lectures
  - Payments
  - Course Progress
- Frontend Overview

### Overview
Courso enables instructors to create and publish courses composed of modules and lectures, and enables learners to explore, purchase, and track progress through courses. The backend exposes REST APIs secured with cookie-based JWT auth and validations; the frontend consumes these APIs using React Query. Payments are processed via Razorpay and verified by a server-side webhook. Videos and images are stored on Cloudinary.

### Tech Stack
- Frontend: React 19, Vite 6, React Router 7, React Query 5, Zustand 5, Tailwind CSS, TipTap, Axios
- Backend: Node.js, Express, TypeScript, Mongoose, Joi, Multer + Cloudinary, Razorpay, ioredis, Nodemailer, Helmet, CORS, Morgan
- Infra/Utilities: MongoDB, Redis, Arcjet

### Project Structure
- `client/`: React app
  - `src/pages/`: route pages (auth, dashboard, course manage/learn)
  - `src/components/`: UI and feature components
  - `src/api/`: API wrappers
  - `src/hooks/`: React Query hooks
  - `src/lib/axios.ts`: Axios instance with base URL and interceptors
- `server/`: Express API server
  - `src/routes/`: route definitions
  - `src/controllers/`: business logic
  - `src/middlewares/`: auth/role/validation/error handling
  - `src/models/`: Mongoose models
  - `src/lib/`: integrations (Cloudinary, Razorpay, Redis, Nodemailer, Arcjet)
  - `src/validators/`: Joi schemas
  - `src/utils/`: helpers (Cloudinary utilities, user/course utils)
- `docker-compose.yml`: local dev services (Mongo, Redis, frontend, backend)

### Environment Variables

Create `server/.env` with:
- PORT=3000
- MONGO_URI=... (Docker: `mongodb://mongodb:27017/courso`; local: `mongodb://localhost:27017/courso`)
- ACCESS_TOKEN_SECRET=... (JWT)
- REFRESH_TOKEN_SECRET=... (JWT)
- REDIS_URL=... (Docker: `redis://redis:6379`; local: `redis://localhost:6379`)
- ARCJET_KEY=... (Arcjet API key)
- CLOUDINARY_CLOUD_NAME=...
- CLOUDINARY_API_KEY=...
- CLOUDINARY_API_SECRET=...
- RAZORPAY_KEY_ID=...
- RAZORPAY_KEY_SECRET=...
- RAZORPAY_WEBHOOK_SECRET=... (used to verify webhook signature)
- EMAIL_USER=... (Gmail address or SMTP user)
- EMAIL_PASS=... (Gmail App Password or SMTP password)
- FRONTEND_DEPLOYED_URL=https://your-frontend-domain (for CORS in production)

Create `client/.env` (only needed for production builds):
- VITE_BACKEND_DEPLOYED_URL=https://your-backend-domain/api

Notes:
- Cookies are used with `withCredentials: true`. For cross-origin production, configure CORS, HTTPS, and cookie attributes properly (SameSite, Secure, Domain).

### Local Development

Manual setup
1) Prerequisites: Node 20+ (recommended 22+), npm 10+, MongoDB, Redis
2) Install dependencies:
   - In `server/`: `npm install`
   - In `client/`: `npm install`
3) Environment:
   - Create `server/.env` as above
   - For development, `client` uses `http://localhost:3000/api` by default, so no client env needed
4) Run apps:
   - Terminal A (server): `npm run dev` (watches TS and restarts)
   - Terminal B (client): `npm run dev` (Vite on 5173)
5) Open: `http://localhost:5173`

Docker setup
1) Ensure `server/.env` exists with Docker-friendly URLs (see above for `MONGO_URI` and `REDIS_URL`)
2) From repo root: `docker compose up --build`
3) Services:
   - MongoDB: 27017
   - Redis: 6379
   - Backend: 3000
   - Frontend: 5173
4) Open: `http://localhost:5173`

### API Reference

Auth (`/api/auth`)
- POST `/signup` — Create user; body: `{ fullname, email, password, role: "user"|"instructor" }`
- POST `/login` — Login user; sets cookies; body: `{ email, password }`
- POST `/logout` — Clears auth cookies
- POST `/send-otp` — Send email verification code; auth required
- POST `/verify-otp` — Verify email using `code`; body: `{ code }`; auth required

User (`/api/user`)
- GET `/` — Get current user profile; auth required
- PATCH `/profile` — Update profile; auth + validation required

Courses (`/api/courses`)
- POST `/` — Create course; instructor only; body: `{ title, subtitle?, description?, language, level, courseImageUrl?, price, category? }`
- GET `/` — List courses; query: `page?`, `limit?`, `category?`, `search?`; auth required
- GET `/me/enrolled` — List my enrolled courses; auth required
- GET `/me/enrolled/:titleSlug` — Get a specific enrolled course + progress; auth required
- GET `/me/created` — List my created courses; instructor only
- GET `/:titleSlug` — Get course details (public to authenticated users)
- PATCH `/:courseId` — Update course; instructor only; partial body
- DELETE `/:courseId` — Delete course; instructor only

Modules (`/api/modules`)
- POST `/` — Create module; instructor only; body: `{ title, courseId }`
- GET `/:courseId` — Get modules for a course; instructor only
- PATCH `/:moduleId` — Update module; instructor only; body: `{ title? }`
- DELETE `/:moduleId` — Delete module; instructor only

Lectures (`/api/lectures`)
- POST `/` — Create lecture; instructor only; body: `{ moduleId, title, description?, isFreePreview? }`
- GET `/:lectureId` — Get single lecture; auth required
- PATCH `/:lectureId` — Update lecture; instructor only; body: `{ title?, description?, videoUrl?, isFreePreview? }`
- DELETE `/:lectureId` — Delete lecture; instructor only
- POST `/:lectureId/upload-video` — Upload video to Cloudinary; instructor only; multipart form field `video`; limit 100MB

Payments (`/api/payments`)
- POST `/create-order` — Create Razorpay order for a course; auth required; body: `{ courseId }`
- POST `/webhook` — Razorpay webhook; verifies signature using `RAZORPAY_WEBHOOK_SECRET`
- POST `/verify` — Verify a payment from orderId; auth required; body: `{ orderId }`
- GET `/history` — Get user payment history; auth required

Course Progress (`/api/progress`)
- PATCH `/:courseId/lecture/:lectureId` — Update lecture completion; auth required; body: `{ isCompleted: boolean }`

Auth, Roles, and Validation
- Authentication: cookie-based JWT (`access_token`, `refresh_token`);
  - Access token verified on each request; auto-refresh via refresh token if present
  - Refresh tokens stored in Redis (`refresh_token:<userId>`) to support revocation on logout
- Roles: `checkInstructor` gatekeeps instructor-only endpoints
- Validation: Joi schemas validate request bodies for courses/modules/lectures/profile
- Global protection: Arcjet applies shield, bot detection (allows search engines), and token-bucket rate limiting

Media & Email
- Image uploads and lecture video storage via Cloudinary
- Email services (OTP, receipts, failures) via Nodemailer (Gmail). Use an App Password for Gmail

Payments
- Creates an order via Razorpay; stores payment intent in DB
- Webhook updates payment status, enrolls the user, initializes progress, and sends a receipt
- Client should open Razorpay Checkout with the returned `order.keyId` and `order.orderId`

### Frontend Overview
- Routing: public and protected routes with `ProtectedRoute`
- State: global user via Zustand store (`useUserStore`)
- Data fetching: React Query hooks in `src/hooks/*` wrapping `src/api/*` modules
- Axios: `src/lib/axios.ts` sets base URL to `http://localhost:3000/api` in dev, or `VITE_BACKEND_DEPLOYED_URL` in prod; adds response interceptors for 401/403/429
- Pages:
  - Auth: Login, SignUp, InstructorSignUp
  - Dashboard: overview, courses, enrollments, performance, settings, history
  - Courses: new course wizard, manage course (landing, curriculum), learn course
  - Components include editors (TipTap), video player, course cards, and curriculum management UI
