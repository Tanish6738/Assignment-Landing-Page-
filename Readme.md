# Portfolio Management System

A full-stack web application for managing a portfolio website with admin dashboard. Built with React, Node.js, Express, and MongoDB.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Database Models](#database-models)
- [API Endpoints](#api-endpoints)
- [Frontend Services](#frontend-services)
- [Features in Detail](#features-in-detail)
- [Scripts](#scripts)
- [Security Features](#security-features)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The Portfolio Management System is a modern, full-stack web application designed to help businesses and professionals showcase their work, manage client testimonials, and engage with visitors. The platform features a beautiful landing page for public visitors and a comprehensive admin dashboard for content management.

### Key Highlights
- 🎨 Modern, responsive UI with Tailwind CSS
- 🔐 Secure JWT-based authentication
- 🖼️ Advanced image cropping and upload
- 📊 Comprehensive admin dashboard
- 📧 Contact form and newsletter management
- ☁️ Cloud-based image storage with Cloudinary
- 🚀 Fast performance with React 19 and Vite

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
- React Image Crop (Image cropping)

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

## Database Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (default: "user"),
  createdAt: Date (default: now)
}
```

### Project Model
```javascript
{
  image: String (required, Cloudinary URL),
  name: String (required),
  description: String (required),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

### Client Model
```javascript
{
  image: String (required, Cloudinary URL),
  name: String (required),
  description: String (required),
  designation: String (required),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

### ContactForm Model
```javascript
{
  fullName: String (required),
  email: String (required),
  mobile: String (required),
  city: String (required),
  submittedAt: Date (default: now)
}
```

### Newsletter Model
```javascript
{
  email: String (required, unique),
  subscribedAt: Date (default: now)
}
```

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Access | Description | Request Body |
|--------|----------|--------|-------------|--------------|
| POST | `/api/auth/register` | Public | Register new user | `{ "name": "John Doe", "email": "john@example.com", "password": "SecurePass123" }` |
| POST | `/api/auth/login` | Public | User login | `{ "email": "john@example.com", "password": "SecurePass123" }` |
| POST | `/api/auth/logout` | Public | Logout user | - |
| GET | `/api/auth/me` | Protected | Get current user | - |

### Admin Routes (`/api/admin`)

| Method | Endpoint | Access | Description | Request Body |
|--------|----------|--------|-------------|--------------|
| POST | `/api/admin/login` | Public | Admin login | `{ "email": "admin@example.com", "password": "AdminPass123" }` |

### Project Routes

#### Public Routes (`/api/projects`)

| Method | Endpoint | Access | Description | Request Body |
|--------|----------|--------|-------------|--------------|
| GET | `/api/projects` | Public | Get all projects | - |
| GET | `/api/projects/:id` | Public | Get single project by ID | - |

#### Admin Routes (`/api/admin/projects`)

| Method | Endpoint | Access | Description | Request Body |
|--------|----------|--------|-------------|--------------|
| POST | `/api/admin/projects` | Admin Only | Create new project | `multipart/form-data` - Fields: `name`, `description`, `image` (file) |
| GET | `/api/admin/projects` | Admin Only | Get all projects | - |
| GET | `/api/admin/projects/:id` | Admin Only | Get single project by ID | - |
| PUT | `/api/admin/projects/:id` | Admin Only | Update project | `multipart/form-data` - Fields: `name`, `description`, `image` (optional) |
| DELETE | `/api/admin/projects/:id` | Admin Only | Delete project | - |

### Client Routes

#### Public Routes (`/api/clients`)

| Method | Endpoint | Access | Description | Request Body |
|--------|----------|--------|-------------|--------------|
| GET | `/api/clients` | Public | Get all clients | - |
| GET | `/api/clients/:id` | Public | Get single client by ID | - |

#### Admin Routes (`/api/admin/clients`)

| Method | Endpoint | Access | Description | Request Body |
|--------|----------|--------|-------------|--------------|
| POST | `/api/admin/clients` | Admin Only | Create new client | `multipart/form-data` - Fields: `name`, `description`, `designation`, `image` (file) |
| GET | `/api/admin/clients` | Admin Only | Get all clients | - |
| GET | `/api/admin/clients/:id` | Admin Only | Get single client by ID | - |
| PUT | `/api/admin/clients/:id` | Admin Only | Update client | `multipart/form-data` - Fields: `name`, `description`, `designation`, `image` (optional) |
| DELETE | `/api/admin/clients/:id` | Admin Only | Delete client | - |

### Contact Routes

#### Public Route

| Method | Endpoint | Access | Description | Request Body |
|--------|----------|--------|-------------|--------------|
| POST | `/api/contact` | Public | Submit contact form | `{ "fullName": "John Doe", "email": "john@example.com", "mobile": "+1234567890", "city": "New York" }` |

#### Admin Routes (`/api/admin/contact`)

| Method | Endpoint | Access | Description | Request Body |
|--------|----------|--------|-------------|--------------|
| GET | `/api/admin/contact` | Admin Only | Get all contact submissions | - |
| GET | `/api/admin/contact/:id` | Admin Only | Get single contact submission | - |
| DELETE | `/api/admin/contact/:id` | Admin Only | Delete contact submission | - |

### Newsletter Routes

#### Public Route

| Method | Endpoint | Access | Description | Request Body |
|--------|----------|--------|-------------|--------------|
| POST | `/api/newsletter/subscribe` | Public | Subscribe to newsletter | `{ "email": "subscriber@example.com" }` |

#### Admin Routes (`/api/admin/newsletters`)

| Method | Endpoint | Access | Description | Request Body |
|--------|----------|--------|-------------|--------------|
| GET | `/api/admin/newsletters` | Admin Only | Get all newsletter subscribers | - |
| DELETE | `/api/admin/newsletters/:id` | Admin Only | Delete subscriber | - |

## Frontend Services

### Authentication Service (`authService.js`)
```javascript
- register(userData)           // Register new user
- login(credentials)            // User login
- adminLogin(credentials)       // Admin login
- logout()                      // Logout user
- getCurrentUser()              // Get current authenticated user
- isAuthenticated()             // Check if user is authenticated
- getStoredUser()               // Get user from localStorage
- isAdmin()                     // Check if user has admin role
```

### Project Service (`projectService.js`)
```javascript
- getAll()                      // Get all projects (public)
- getById(id)                   // Get single project by ID
```

### Client Service (`clientService.js`)
```javascript
- getAll()                      // Get all clients (public)
- getById(id)                   // Get single client by ID
```

### Contact Service (`contactService.js`)
```javascript
- submit(formData)              // Submit contact form
```

### Newsletter Service (`newsletterService.js`)
```javascript
- subscribe(data)               // Subscribe to newsletter
```

### Admin Service (`adminService.js`)

#### Project Management
```javascript
- projects.create(formData)     // Create project (with image)
- projects.getAll()             // Get all projects
- projects.getById(id)          // Get project by ID
- projects.update(id, formData) // Update project (with image)
- projects.delete(id)           // Delete project
```

#### Client Management
```javascript
- clients.create(formData)      // Create client (with image)
- clients.getAll()              // Get all clients
- clients.getById(id)           // Get client by ID
- clients.update(id, formData)  // Update client (with image)
- clients.delete(id)            // Delete client
```

#### Contact Management
```javascript
- contacts.getAll()             // Get all contact submissions
- contacts.getById(id)          // Get contact submission by ID
- contacts.delete(id)           // Delete contact submission
```

#### Newsletter Management
```javascript
- newsletters.getAll()          // Get all subscribers
- newsletters.delete(id)        // Delete subscriber
```

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
- **JWT-based authentication** with secure token generation
- **Dual storage strategy**: Cookie and localStorage for token persistence
- **Protected routes** with role-based access control (User/Admin)
- **Automatic token refresh** on page reload
- **Password hashing** using bcrypt (10 salt rounds)
- **Email validation** with regex patterns
- **Password strength requirements**:
  - Minimum 6 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number

### Image Upload System
- **Cloudinary integration** for cloud-based image storage
- **Multer middleware** for multipart/form-data handling
- **Interactive Image Cropper** with two aspect ratios:
  - Free Form: Custom dimensions
  - Standard: 450 × 350 (recommended for projects and clients)
- **Real-time crop preview** with adjustable crop area
- **Canvas-based processing** for high-quality cropped images
- **Image optimization** and automatic transformations
- **Automatic cleanup**: Old images deleted when updating
- **Supported formats**: JPEG, PNG, WebP
- **File size validation**: Maximum 5MB per image
- **Drag and drop** file upload support

### Admin Dashboard
- **Project Management**:
  - Create, Read, Update, Delete operations
  - Interactive image cropper with aspect ratio selection
  - Rich text descriptions
  - Image preview before upload
  
- **Client Management**:
  - Testimonial CRUD operations
  - Client image uploads with cropping
  - Designation tracking
  - Preview and change uploaded images
  
- **Contact Submissions**:
  - View all contact form submissions
  - Delete individual submissions
  - Email and mobile tracking
  
- **Newsletter Management**:
  - View all subscribers
  - Remove subscribers
  - Subscription date tracking

### Landing Page Components
- **Hero Section**: Eye-catching introduction with branding
- **Projects Showcase**: Grid display with images and descriptions
- **Client Testimonials**: Carousel/slider with client feedback
- **Contact Form**: 
  - Full name, email, mobile, city fields
  - Real-time validation
  - Success/error feedback
- **Newsletter Subscription**: 
  - Email collection footer
  - Validation and duplicate prevention

### Form Validation
- **Email Validation**: Proper regex pattern matching
- **Phone Validation**: International format support (min 10 digits)
- **Name Validation**: Minimum 2 characters, trimmed
- **Real-time Feedback**: Error messages appear on blur/submit
- **Visual Indicators**: Red borders for invalid fields
- **Comprehensive Error Messages**: User-friendly guidance

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

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the production bundle:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `dist` folder to your hosting service
3. Update environment variables with production API URL

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables on your hosting platform
2. Ensure MongoDB connection string is configured
3. Deploy using Git or Docker
4. Run database migrations if needed

### Environment Configuration
- Update `VITE_API_URL` in frontend to point to production backend
- Update `CLIENT_URL` in backend to point to production frontend
- Configure Cloudinary credentials for production
- Use strong `JWT_SECRET` in production

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly

## 📄 License

ISC

## 👨‍💻 Author

**Tanishq Chouhan**

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js community
- MongoDB team
- Cloudinary for image hosting
- All open-source contributors

## 📞 Support

For support, email: [your-email@example.com]

## 🔗 Links

- [Live Demo](#) - (Add your demo link)
- [Documentation](./DESCRIPTION.md)
- [API Documentation](#api-endpoints)
- [GitHub Repository](https://github.com/Tanish6738/Assignment-Landing-Page-)

---

**Made with ❤️ by Tanishq Chouhan**