# Installation Guide

This is a guide on how to set up and run the Kroger Web App.

# Prerequisites

Install the following:
- Node.js (https://nodejs.org/)
- npm
- A Kroger Developer account for API credentials(https://developer.kroger.com) 
- A Supabase account (https://supabase.io/)

# Clone the Repository

Use Git to clone the project repository:

git clone https://github.com/YOUR_USERNAME/inst377-finalproject-kmathew3.git
cd inst377-finalproject-kmathew3

# Install Dependencies
- npm install (express, dotenv, supabase)

# Create Variables
- touch .env
- input into file with your credentials: SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_key
KROGER_CLIENT_ID=your_kroger_client_id
KROGER_CLIENT_SECRET=your_kroger_client_secret

# Run Locally
- npm run dev