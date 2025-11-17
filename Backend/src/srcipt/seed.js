import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Client from '../models/Client.js';
import Project from '../models/Project.js';
import Newsletter from '../models/Newsletter.js';
import ContactForm from '../models/ContactForm.js';

// ES Module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

// 🧑‍💼 Clients Dummy Data
const clientsData = [
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    name: "Sarah Johnson",
    designation: "CEO, InnovateX",
    description: "Working with this team was an exceptional experience. Their design and development quality exceeded our expectations."
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    name: "Michael Smith",
    designation: "Product Designer, SoftCore",
    description: "They delivered our project on time with great attention to detail. Highly recommended!"
  },
  {
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
    name: "Priya Verma",
    designation: "Marketing Head, BrightEdge",
    description: "Excellent communication and impressive results. The website turned out to be modern and smooth."
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    name: "Jason Lee",
    designation: "CTO, WebWorks Labs",
    description: "Professional approach and outstanding technical expertise. A great team to work with."
  },
  {
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    name: "Emma Wilson",
    designation: "Founder, CreativeLabs",
    description: "Amazing experience from start to finish. The team was responsive, creative, and delivered beyond expectations."
  },
  {
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    name: "David Chen",
    designation: "VP Engineering, TechFlow",
    description: "Their technical skills and project management were top-notch. Would definitely work with them again!"
  }
];

// 📦 Projects Dummy Data
const projectsData = [
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    name: "Digital Portfolio Website",
    description: "A modern portfolio website built with React, showcasing creative design elements and responsive layouts."
  },
  {
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    name: "E-Commerce App",
    description: "A full-featured ecommerce platform with product listings, payments, and order management system."
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    name: "Restaurant Management Dashboard",
    description: "A dashboard built for managing orders, staff, and inventory with real-time analytics."
  },
  {
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
    name: "Travel Booking Landing Page",
    description: "A beautiful landing page for a travel agency with animations and dynamic content sections."
  },
  {
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    name: "Healthcare Appointment System",
    description: "A web-based system for booking doctor appointments, managing schedules, and patient records."
  },
  {
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    name: "Social Media Analytics Platform",
    description: "A comprehensive analytics dashboard for tracking social media performance across multiple platforms."
  },
  {
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=600&fit=crop",
    name: "Real Estate Listing Portal",
    description: "An interactive property listing website with advanced search filters and virtual tour capabilities."
  },
  {
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    name: "Learning Management System",
    description: "A complete LMS solution for online courses with video streaming, quizzes, and progress tracking."
  },
  {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    name: "Financial Planning App",
    description: "A mobile-first financial planning application with budgeting tools and investment tracking features."
  }
];

// 📧 Newsletter Subscribers Dummy Data
const newsletterData = [
  { email: "sarah.johnson@email.com", subscribedAt: new Date('2024-11-01T10:30:00Z') },
  { email: "michael.brown@email.com", subscribedAt: new Date('2024-11-03T14:15:00Z') },
  { email: "emma.davis@email.com", subscribedAt: new Date('2024-11-05T09:45:00Z') },
  { email: "james.wilson@email.com", subscribedAt: new Date('2024-11-07T16:20:00Z') },
  { email: "olivia.martinez@email.com", subscribedAt: new Date('2024-11-09T11:00:00Z') },
  { email: "william.anderson@email.com", subscribedAt: new Date('2024-11-10T13:30:00Z') },
  { email: "sophia.garcia@email.com", subscribedAt: new Date('2024-11-12T08:45:00Z') },
  { email: "liam.rodriguez@email.com", subscribedAt: new Date('2024-11-14T15:10:00Z') },
  { email: "ava.hernandez@email.com", subscribedAt: new Date('2024-11-15T10:25:00Z') },
  { email: "noah.lopez@email.com", subscribedAt: new Date('2024-11-16T12:00:00Z') },
  { email: "isabella.gonzalez@email.com", subscribedAt: new Date('2024-11-17T09:15:00Z') },
  { email: "ethan.perez@email.com", subscribedAt: new Date('2024-11-17T14:40:00Z') }
];

// 📞 Contact Form Submissions Dummy Data
const contactFormsData = [
  {
    fullName: "Alex Thompson",
    email: "alex.thompson@company.com",
    mobile: "+1-555-0101",
    city: "New York",
    submittedAt: new Date('2024-11-10T09:30:00Z')
  },
  {
    fullName: "Rachel Green",
    email: "rachel.green@startup.io",
    mobile: "+1-555-0202",
    city: "San Francisco",
    submittedAt: new Date('2024-11-11T14:20:00Z')
  },
  {
    fullName: "David Kumar",
    email: "david.kumar@tech.com",
    mobile: "+91-98765-43210",
    city: "Mumbai",
    submittedAt: new Date('2024-11-12T11:15:00Z')
  },
  {
    fullName: "Lisa Anderson",
    email: "lisa.anderson@design.co",
    mobile: "+44-7700-900123",
    city: "London",
    submittedAt: new Date('2024-11-13T16:45:00Z')
  },
  {
    fullName: "Carlos Rodriguez",
    email: "carlos.r@business.mx",
    mobile: "+52-55-1234-5678",
    city: "Mexico City",
    submittedAt: new Date('2024-11-14T10:00:00Z')
  },
  {
    fullName: "Yuki Tanaka",
    email: "yuki.tanaka@corp.jp",
    mobile: "+81-3-1234-5678",
    city: "Tokyo",
    submittedAt: new Date('2024-11-15T08:30:00Z')
  },
  {
    fullName: "Sophie Martin",
    email: "sophie.martin@agency.fr",
    mobile: "+33-1-23-45-67-89",
    city: "Paris",
    submittedAt: new Date('2024-11-16T13:20:00Z')
  },
  {
    fullName: "Ahmed Hassan",
    email: "ahmed.hassan@ventures.ae",
    mobile: "+971-50-123-4567",
    city: "Dubai",
    submittedAt: new Date('2024-11-16T15:00:00Z')
  },
  {
    fullName: "Emily Chen",
    email: "emily.chen@solutions.ca",
    mobile: "+1-416-555-0303",
    city: "Toronto",
    submittedAt: new Date('2024-11-17T10:45:00Z')
  },
  {
    fullName: "Marco Silva",
    email: "marco.silva@digital.br",
    mobile: "+55-11-98765-4321",
    city: "São Paulo",
    submittedAt: new Date('2024-11-17T12:30:00Z')
  }
];

// 🌱 Seed Database Function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Client.deleteMany({});
    await Project.deleteMany({});
    await Newsletter.deleteMany({});
    await ContactForm.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Insert Clients
    console.log('👥 Inserting clients...');
    const clients = await Client.insertMany(clientsData);
    console.log(`✅ ${clients.length} clients inserted successfully\n`);

    // Insert Projects
    console.log('📦 Inserting projects...');
    const projects = await Project.insertMany(projectsData);
    console.log(`✅ ${projects.length} projects inserted successfully\n`);

    // Insert Newsletter Subscribers
    console.log('📧 Inserting newsletter subscribers...');
    const newsletters = await Newsletter.insertMany(newsletterData);
    console.log(`✅ ${newsletters.length} newsletter subscribers inserted successfully\n`);

    // Insert Contact Form Submissions
    console.log('📞 Inserting contact form submissions...');
    const contacts = await ContactForm.insertMany(contactFormsData);
    console.log(`✅ ${contacts.length} contact forms inserted successfully\n`);

    // Display summary
    console.log('🎉 Database seeded successfully!');
    console.log('━'.repeat(50));
    console.log(`📊 Summary:`);
    console.log(`   • Clients: ${clients.length}`);
    console.log(`   • Projects: ${projects.length}`);
    console.log(`   • Newsletter Subscribers: ${newsletters.length}`);
    console.log(`   • Contact Form Submissions: ${contacts.length}`);
    console.log('━'.repeat(50));

    // Close connection
    await mongoose.connection.close();
    console.log('\n👋 MongoDB connection closed');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed function
seedDatabase();
