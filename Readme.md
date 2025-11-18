# Portfolio Management System

A full-stack web application for managing a portfolio website with admin dashboard. Built with React, Node.js, Express, and MongoDB.

## Features

### Frontend
- **Landing Page** with smooth scrolling sections
- **Hero Section** with portfolio showcase
- **Projects Display** with filtering capabilities
- **Client Testimonials** carousel
- **Contact Form** for visitor inquiries
- **Newsletter Subscription**
- **Admin Dashboard** for content management
- **Authentication System** (User & Admin login)
- **Protected Routes** with role-based access control
- **Responsive Design** with Tailwind CSS

### Backend
- **RESTful API** built with Express.js
- **Authentication & Authorization** with JWT
- **Role-based Access Control** (User & Admin)
- **Image Upload** to Cloudinary
- **Database Models** for Projects, Clients, Contacts, Newsletters, Users
- **CORS** enabled for cross-origin requests
- **Cookie-based** token management
- **MongoDB** for data persistence

## Tech Stack

### Frontend
- React 19
- React Router DOM 7
- Axios
- Tailwind CSS 4
- Vite
- Lucide React (Icons)

### Backend
- Node.js
- Express 5
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt.js for password hashing
- Cloudinary for image storage
- Multer for file uploads
- Cookie Parser
- CORS
- Morgan (HTTP logger)

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd Project
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:
```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/AppDB

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

CLIENT_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

### Start Backend Server
```bash
cd Backend
npm run dev
```
The API will run on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The application will run on `http://localhost:5173`

## Project Structure

```
Project/
├── Backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth & upload middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions (JWT, upload)
│   │   ├── srcipt/         # Database seed scripts
│   │   └── app.js          # Express app configuration
│   ├── server.js           # Server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── assets/         # Static assets
    │   ├── components/     # React components
    │   │   ├── admin/      # Admin dashboard components
    │   │   └── Landing/    # Landing page components
    │   ├── config/         # Axios configuration
    │   ├── Context/        # React Context (Auth)
    │   ├── Pages/          # Page components
    │   ├── Routes/         # Route definitions
    │   ├── services/       # API service functions
    │   ├── App.jsx         # Main App component
    │   └── main.jsx        # Application entry point
    └── package.json

```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user (Protected)

### Admin
- `POST /api/admin/login` - Admin login

### Projects (Public)
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project

### Projects (Admin)
- `POST /api/admin/projects` - Create project
- `GET /api/admin/projects` - Get all projects
- `GET /api/admin/projects/:id` - Get single project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project

### Clients (Public)
- `GET /api/clients` - Get all clients
- `GET /api/clients/:id` - Get single client

### Clients (Admin)
- `POST /api/admin/clients` - Create client
- `GET /api/admin/clients` - Get all clients
- `GET /api/admin/clients/:id` - Get single client
- `PUT /api/admin/clients/:id` - Update client
- `DELETE /api/admin/clients/:id` - Delete client

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/admin/contact` - Get all submissions (Admin)
- `GET /api/admin/contact/:id` - Get single submission (Admin)
- `DELETE /api/admin/contact/:id` - Delete submission (Admin)

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/admin/newsletters` - Get all subscribers (Admin)
- `DELETE /api/admin/newsletters/:id` - Delete subscriber (Admin)

## Default Admin Credentials

After seeding the database, use these credentials:
- **Email**: admin@example.com
- **Password**: Root@1234

## Environment Variables

### Backend
| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/AppDB |
| JWT_SECRET | JWT secret key | - |
| JWT_EXPIRE | JWT expiration time | 7d |
| CLIENT_URL | Frontend URL | http://localhost:3000 |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | - |
| CLOUDINARY_API_KEY | Cloudinary API key | - |
| CLOUDINARY_API_SECRET | Cloudinary API secret | - |

### Frontend
| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:5000/api |

## Features in Detail

### Authentication System
- JWT-based authentication
- Cookie and localStorage token storage
- Protected routes for admin access
- Automatic token refresh on page reload
- Role-based authorization (User/Admin)

### Image Upload
- Cloudinary integration for cloud storage
- Multer middleware for file handling
- Image optimization and transformations
- Automatic old image cleanup on updates

### Admin Dashboard
- Project management (CRUD operations)
- Client testimonial management
- Contact form submissions viewer
- Newsletter subscriber management
- Image upload for projects and clients

### Landing Page
- Smooth scroll navigation
- Hero section with branding
- Projects showcase with images
- Client testimonials carousel
- Contact form with validation
- Newsletter subscription footer

## Scripts

### Backend
```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- HTTP-only cookies
- CORS configuration
- Protected admin routes
- Input validation
- Error handling middleware

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC

## Author

Tanishq Chouhan