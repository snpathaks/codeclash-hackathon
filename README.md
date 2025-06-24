# SlideFlow 🎯

**AI-Powered Presentation Builder**

*A CodeClash 2.0 Hackathon Project*

## 🏆 Team (2+1)
- **Ajit Ashwath** (Team Leader)(AI  related domain work and Website's efficiency Correction work)
- **Akanksha** (Frontend Development)
- **Shalini** (Backend Development)

## 📖 Overview

SlideFlow is an intelligent presentation builder that leverages AI to transform your ideas into professional slides instantly. Simply describe your topic, and our AI will generate structured, themed presentations with customizable color schemes and layouts.

## ✨ Features

### 🤖 AI-Powered Content Generation
- **Google Gemini AI Integration** - Intelligent slide content generation
- **Smart Prompt Processing** - Converts natural language to structured presentations
- **Automatic Layout Selection** - AI suggests optimal slide layouts

### 🎨 Dynamic Theming System
- **8 Color Themes** - Professional color palettes (Blue, Red, Green, Yellow, Purple, Pink, Cyan, Lime)
- **Real-time Theme Switching** - Change colors instantly across presentations
- **Consistent Design Language** - Cohesive visual experience

### 🎤 Voice Interaction (In Development)
- **Voice Commands** - Create presentations using speech
- **Conversational Interface** - Natural dialogue for presentation building
- **Smart Greetings** - Friendly AI assistant interaction

### 📊 Presentation Management
- **Multi-slide Support** - Create comprehensive presentations
- **Auto-save Functionality** - Never lose your work
- **Slide Editing** - Modify and customize generated content
- **Export Options** - Save and share presentations

## 🛠️ Tech Stack

### Backend
- **Flask** - Python web framework
- **Google Gemini AI** - Content generation
- **Flask-CORS** - Cross-origin resource sharing
- **UUID** - Unique identifier generation
- **Environment Variables** - Secure API key management

### Frontend
- **Next.js** - React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Modern UI Components** - Responsive design

## 🚀 Quick Start

### Prerequisites
```bash
# Python 3.8+
# Node.js 16+
# Google Gemini API Key
```

### Backend Setup
1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd slideflow
   ```

2. **Install Python Dependencies**
   ```bash
   pip install flask flask-cors google-generativeai python-dotenv
   ```

3. **Environment Configuration**
   ```bash
   # Create .env file
   echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
   ```

4. **Run Backend Server**
   ```bash
   python server.py
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup
1. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 📡 API Documentation

### Core Endpoints

#### Generate Slide
```http
POST /api/generate-slide
Content-Type: application/json

{
  "prompt": "Machine Learning basics",
  "color_theme": "blue"
}
```

#### Create Presentation
```http
POST /api/presentai
Content-Type: application/json

{
  "prompt": "Business Strategy 2024",
  "slides": [],
  "color_theme": "purple"
}
```

#### Change Slide Color
```http
PUT /api/slides/{slide_id}/color
Content-Type: application/json

{
  "color_theme": "green",
  "presentation_id": "uuid-here"
}
```

#### Voice Interaction
```http
POST /api/voice/process
Content-Type: application/json

{
  "input": "Create a presentation about climate change"
}
```

### Response Format
```json
{
  "slide": {
    "id": 1234567890,
    "title": "Generated Title",
    "elements": [...],
    "color_theme": "blue",
    "background_color": "#dbeafe"
  },
  "message": "Slide generated successfully"
}
```

## 🎨 Color Themes

| Theme | Primary | Background | Use Case |
|-------|---------|------------|----------|
| Blue | #2563eb | #dbeafe | Professional, Business |
| Red | #dc2626 | #fee2e2 | Alerts, Important |
| Green | #16a34a | #dcfce7 | Success, Growth |
| Yellow | #d97706 | #fef3c7 | Warning, Energy |
| Purple | #9333ea | #f3e8ff | Creative, Innovation |
| Pink | #db2777 | #fce7f3 | Creative, Fun |
| Cyan | #0891b2 | #cffafe | Tech, Modern |
| Lime | #65a30d | #ecfccb | Nature, Fresh |

## 🏗️ Architecture

### Backend Structure
```
server.py
├── Flask App Configuration
├── Gemini AI Integration
├── Color Theme System
├── Voice Processing
├── Presentation Management
└── API Routes
```

### Frontend Structure
```
components/
├── PromptInput.tsx    # User input component
├── SlideEditor.tsx    # Slide editing interface
├── ThemeSelector.tsx  # Color theme picker
└── VoiceInput.tsx     # Voice interaction
```

## 🔧 Development Status

### ✅ Completed Features
- [x] Flask backend server
- [x] Gemini AI integration
- [x] Color theme system
- [x] Slide generation API
- [x] Presentation management
- [x] Voice interaction endpoints
- [x] Error handling & logging
- [x] Basic frontend components

### 🚧 In Progress
- [ ] Frontend-backend integration
- [ ] Voice recognition implementation
- [ ] Advanced slide layouts
- [ ] Export functionality
- [ ] User authentication
- [ ] Database integration

### 🎯 Planned Features
- [ ] Real-time collaboration
- [ ] Template marketplace
- [ ] Advanced animations
- [ ] Mobile app
- [ ] Integration with Google Slides
- [ ] Presentation analytics

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎊 Hackathon Journey

SlideFlow was born during CodeClash 2.0, where our team combined AI innovation with practical presentation needs. The project showcases:

- **Rapid Prototyping** - From idea to working prototype
- **Team Collaboration** - Distributed development approach
- **AI Integration** - Practical use of generative AI
- **User-Centric Design** - Solving real presentation challenges

## 🚨 Known Issues

- Voice recognition needs browser permissions
- Gemini API rate limits may apply
- In-memory storage (production needs database)
- CORS configuration for production deployment

## 📞 Support

For questions or support, reach out to the development team:
- Backend: Ajit Ashwath
- Frontend: Akanksha & Shalini

## 🌟 Acknowledgments

- Google Gemini AI for content generation
- CodeClash 2.0 organizers
- Open source community
- Beta testers and feedback providers

---

**Built with ❤️ during CodeClash 2.0 Hackathon**

*Transform your ideas into presentations instantly with SlideFlow!*
