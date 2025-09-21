# Posts Viewer

<img src="logo.png" alt="Project Icon" width="120" height="120">

A modern, responsive web application for viewing, creating, updating, and managing posts with comments. Built with vanilla JavaScript and enhanced with comprehensive validation and a beautiful UI.

## 🎨 Design Features

- **Modern Color Palette**: Uses a sophisticated dark theme with colors:
  - Primary Background: `#09122C` (Dark Blue)
  - Secondary Background: `#872341` (Dark Red)
  - Accent Color: `#E17564` (Coral)
  - Danger Color: `#BE3144` (Red)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Clean UI**: No shadows or scaling effects for a minimalist approach
- **Professional Typography**: Uses modern font stack for better readability

## ✨ Enhanced Features

### 📝 Post Management
- **Create Posts**: Add new posts with title and body
- **Update Posts**: Edit existing posts inline
- **Delete Posts**: Remove posts with confirmation
- **Real-time Search**: Search posts by title or body with debouncing
- **Loading States**: Visual feedback during API operations

### 💬 Comments System
- **View Comments**: Display all comments for each post
- **Add Comments**: Create new comments with validation
- **Email Validation**: Proper email format validation for comments
- **Loading Indicators**: Shows loading state while fetching comments

### ✅ Comprehensive Validation

#### Post Validation
- **Title**: Required, 3-100 characters
- **Body**: Required, 10-1000 characters
- **Real-time Feedback**: Visual indicators for validation errors

#### Comment Validation
- **Title**: Required, 2-50 characters
- **Email**: Required, valid email format
- **Body**: Required, 5-500 characters
- **Input Sanitization**: Trims whitespace automatically

### 🔍 Search Functionality
- **Debounced Search**: 300ms delay for better performance
- **Real-time Results**: Instant filtering of posts
- **Result Count**: Shows number of matching posts
- **Empty State**: Handles no results gracefully

### 🎯 User Experience
- **Success/Error Messages**: Non-intrusive notifications
- **Button States**: Loading states during operations
- **Form Clearing**: Automatic form reset after successful operations
- **Keyboard Navigation**: Improved accessibility
- **Mobile Responsive**: Touch-friendly interface

## 🚀 Technical Improvements

### Code Quality
- **Modular Functions**: Well-organized, reusable code
- **Error Handling**: Comprehensive error management
- **Performance**: Debounced search and optimized rendering
- **Accessibility**: Proper labels and semantic HTML

### API Integration
- **RESTful Operations**: Full CRUD operations
- **Error Responses**: Proper HTTP status handling
- **Loading States**: Visual feedback for all API calls
- **Data Consistency**: Maintains search functionality after operations

## 📱 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🛠️ Setup and Usage

1. **Clone/Download** the project files
2. **Open** `index.html` in a modern web browser
3. **Start Using** the application immediately

No build process or dependencies required - it's a pure vanilla JavaScript application!

## 📁 File Structure

```
lab10/
├── index.html          # Main HTML file
├── style.css           # Enhanced CSS with new color palette
├── functions.js        # Core functionality and validation
├── ApiCrud.js          # API operations and data management
├── search.js           # Search functionality
├── README.md           # This documentation
└── public/             # PWA assets
    ├── manifest.json
    ├── icon512_maskable.png
    └── icon512_rounded.png
```

## 🎯 Key Improvements Made

1. **Complete UI Redesign** with the specified color palette
2. **Comprehensive Validation** for all forms
3. **Enhanced User Experience** with loading states and feedback
4. **Improved Search** with debouncing and result counting
5. **Better Error Handling** throughout the application
6. **Responsive Design** for all screen sizes
7. **Accessibility Improvements** with proper labels and semantics
8. **Code Organization** with modular functions and clear structure

## 🔧 Future Enhancements

- Offline support with Service Workers
- Local storage for draft posts
- Rich text editor for posts
- Image upload functionality
- User authentication system
- Advanced filtering options
- Export functionality

---

**Built with ❤️ using Vanilla JavaScript** 