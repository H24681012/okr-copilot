# 🎯 OKR Copilot

**Elite OKR Design Assistant** - Transform messy ideas into elite-quality OKRs following SAFe Value-Stream / ART standards.

![OKR Copilot Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=OKR+Copilot+Interface)

## ✨ Features

### 🚀 Core Functionality
- **AI-Powered OKR Transformation**: Converts any messy input into polished, executive-quality OKRs
- **SAFe Standards Compliance**: Follows SAFe Value-Stream / ART methodology
- **Interactive Workflow**: Step-by-step guidance from draft to approval
- **Baseline Request System**: Automatically identifies and requests missing metrics
- **Confidence Assessment**: Evaluates and displays confidence levels for each OKR

### 📊 OKR Quality Standards
- **Objectives**: Action + What + Why format (≤ 1 sentence, 6-12 month horizon)
- **Key Results**: Metric + Now + Future format (3-5 per objective, numeric, outcome-based)
- **Tool Word Removal**: Automatically strips CRM, Jira, dashboard, portal references from Objectives
- **Executive Language**: Elevates bland wording to inspiring, motivational tone

### 🎨 User Experience
- **Modern UI/UX**: Beautiful, responsive interface with smooth animations
- **Real-time Processing**: Interactive feedback during OKR transformation
- **Sticky Note Board**: Visual display of published OKRs from the community
- **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Storage**: In-memory (easily upgradeable to database)
- **Styling**: Modern CSS with gradients, animations, and responsive design
- **Icons**: Font Awesome
- **Fonts**: Inter (Google Fonts)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16.0.0 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   # If using git
   git clone <repository-url>
   cd okr-copilot
   
   # Or simply download and extract the files
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   # Production mode
   npm start
   
   # Development mode (with auto-reload)
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📖 How To Use

### Step 1: Input Your Idea
Enter any messy goal, initiative, or idea in the text area. Examples:
- "Launch CRM system and train all sales team members by Q2"
- "Book two team offsites this year"
- "Improve customer support response times"

### Step 2: Review Generated OKR
The system will transform your input into:
- **Theme**: Categorized business domain
- **Objective**: Polished Action + What + Why statement
- **Key Results**: 3-5 Metric + Now + Future statements
- **Confidence Level**: High/Medium/Low assessment

### Step 3: Handle Baselines (if needed)
If any Key Results need baseline clarification, you'll be prompted to provide current values.

### Step 4: Approve or Edit
- **Approve**: Publishes the OKR to the community sticky board
- **Request Edits**: Provide feedback for refinements

## 🎯 OKR Transformation Examples

### Input (Messy)
> "We need to launch our new CRM system and make sure everyone is trained on it and also improve our sales process efficiency"

### Output (Elite)
**Theme**: Sales Enablement  
**Objective**: Enhance sales pipeline visibility and effectiveness to accelerate predictable revenue growth  
**Key Results**:
- Increase CRM data completeness from 45% to 95%
- Improve forecast accuracy from 60% to 90%
- Reduce average sales cycle from 45 days to 25 days
- Boost qualified lead conversion from 15% to 35%

## 🏗️ Architecture

```
okr-copilot/
├── index.html          # Main HTML interface
├── styles.css          # Complete styling and responsive design
├── script.js           # Frontend JavaScript logic
├── server.js           # Backend Express server
├── package.json        # Node.js dependencies
└── README.md           # This file
```

### API Endpoints

- `GET /` - Serves main application
- `POST /api/process-okr` - Processes raw input into OKR format
- `POST /api/publish-okr` - Publishes approved OKRs
- `GET /api/published-okrs` - Retrieves published OKRs

## 🎨 Customization

### Themes
Add new theme categories by modifying the `themeKeywords` object in both `script.js` and `server.js`.

### Styling
Customize colors, fonts, and layout by editing `styles.css`. The design uses CSS custom properties for easy theming.

### Processing Logic
Enhance OKR transformation rules by modifying the processing functions in `server.js`.

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Deployment

#### Option 1: Traditional Server
```bash
npm start
```

#### Option 2: Cloud Platforms
- **Heroku**: Deploy with one click using the Heroku button
- **Vercel**: Zero-config deployment for Node.js applications
- **Railway**: Simple deployment with automatic builds
- **DigitalOcean App Platform**: Managed deployment option

#### Option 3: Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)

### Storage Options
The application currently uses in-memory storage. For production, consider:
- **SQLite**: Lightweight file-based database
- **PostgreSQL**: Full-featured relational database
- **MongoDB**: Document-based NoSQL database
- **Redis**: High-performance caching and storage

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- SAFe (Scaled Agile Framework) for OKR methodology
- Google's OKR framework inspiration
- Modern web development best practices
- Font Awesome for icons
- Google Fonts for typography

## 📞 Support

If you encounter any issues or have questions:
1. Check the existing issues in the repository
2. Create a new issue with detailed description
3. Contact the development team

---

**Made with ❤️ for better goal setting and organizational excellence** 