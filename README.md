# NoteVue - A Modern Todo & Notes Application

NoteVue is a full-stack productivity application that combines task management with note-taking capabilities, helping users organize their work and thoughts in one place.

[Watch Demo Video](YOUR_YOUTUBE_LINK_HERE)

## Features

- **Task Management**

  - Create, update, and delete tasks
  - Organize tasks with lists
  - Set due dates and track progress
  - Mark tasks as completed
  - View tasks by different timeframes (Today, Upcoming)

- **Note Taking**

  - Rich text editor powered by Tiptap
  - Create and organize sticky notes
  - Support for markdown formatting
  - Tags for better organization

- **Dashboard**

  - Quick overview of tasks and notes
  - Progress tracking
  - Today's tasks at a glance
  - Quick notes section

- **User Management**
  - Secure authentication system
  - User profiles
  - Personal settings

## Tech Stack

### Frontend

- **React** (v19) - UI Framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Tiptap** - Rich text editor
- **Framer Motion** - Animations
- **Axios** - API requests
- **React Router** - Navigation
- Additional libraries:
  - react-datepicker
  - dompurify
  - lucide-react

### Backend

- **Node.js** & **Express** - Server framework
- **MongoDB** with **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- Security features:
  - Helmet for security headers
  - CORS configuration
  - Express validator

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/NoteVue-A_todo_app.git
cd NoteVue-A_todo_app
```

2. Install Backend Dependencies

```bash
cd Todo_backend
npm install

# Create a config.env file in the config folder with the following variables:
# PORT=5000
# MONGO_URI=your_mongodb_uri
# JWT_SECRET=your_jwt_secret
# JWT_EXPIRE=30d
```

3. Install Frontend Dependencies

```bash
cd ../todo_frontend
npm install
```

### Running the Application

1. Start the Backend Server

```bash
cd Todo_backend
npm run dev
```

2. Start the Frontend Development Server

```bash
cd todo_frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
├── Todo_backend/               # Backend server
│   ├── config/                # Configuration files
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Custom middleware
│   ├── models/                # Database models
│   ├── routes/                # API routes
│   └── utils/                 # Utility functions
│
└── todo_frontend/             # Frontend application
    ├── public/                # Static files
    └── src/
        ├── components/        # Reusable components
        ├── contexts/          # React contexts
        ├── layouts/           # Page layouts
        ├── pages/             # Application pages
        └── services/          # API services
```

## Key Features Breakdown

1. **Dashboard**

   - Progress tracking cards
   - Quick access to today's tasks
   - Notes overview
   - Activity summary

2. **Task Management**

   - Create and organize tasks in lists
   - Set due dates
   - Track completion status
   - Filter tasks by date and status

3. **Note Taking**

   - Rich text editor with formatting options
   - Sticky notes view
   - Tag organization system
   - Search and filter capabilities

4. **User Features**
   - Secure authentication
   - Profile customization
   - Settings management
   - Data persistence

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- React team for the amazing UI library
- Tiptap for the powerful rich text editor
- All other open-source contributors

[Add your YouTube demo video link here when available]
