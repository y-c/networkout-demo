# NetworkOut - Technical Documentation

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- OpenAI API key

### Local Development
```bash
# Clone and install
git clone https://github.com/y-c/networkout-demo
cd networkout-demo
npm install

# Set up environment
cp .env.example .env
# Add your OpenAI API key to .env file:
# REACT_APP_OPENAI_API_KEY=your_openai_api_key_here

# Start development server
npm start

# App will run on http://localhost:3000
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

#### Option 1: Via Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel (create free account if needed)
vercel login

# Deploy the project
vercel

# Follow the prompts:
# - Set up and deploy: Y
# - Which scope: Select your account
# - Link to existing project: N
# - Project name: networkout-demo (or press enter for default)
# - Directory: ./ (press enter)
# - Build command: npm run build (press enter for auto-detect)
# - Output directory: build (press enter for auto-detect)
# - Development command: npm start (press enter for auto-detect)

# Add environment variables
vercel env add REACT_APP_OPENAI_API_KEY
# Paste your OpenAI API key when prompted
# Select all environments (Production, Preview, Development)

# Your app is now live! Visit the URL provided
```

#### Option 2: Via GitHub Integration
1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Import your GitHub repository
5. Add environment variable:
   - Name: `REACT_APP_OPENAI_API_KEY`
   - Value: Your OpenAI API key
6. Click "Deploy"

### Deploy to GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json:
{
  "homepage": "https://y-c.github.io/networkout-demo",
  "scripts": {
    ...existing scripts,
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}

# Deploy
npm run deploy
```

### Deploy to Netlify
```bash
# Build the project
npm run build

# Drag and drop the 'build' folder to netlify.com
# Or use Netlify CLI:
npm i -g netlify-cli
netlify deploy --prod --dir=build
```

## 📁 Project Structure
```
/src
  /agents         # AI agent implementations
    intake.js     # User profiling agent
    matchmaking.js # Trainer matching agent
    workout.js    # Workout planning agent
  /components     # React UI components
    Chat.js       # Main chat interface
    AgentStatus.js # Agent reasoning display
  /data          # Mock data
    trainers.json # US trainer profiles
    cultural.json # Cultural adaptations
  /utils         # Utilities
    api.js       # OpenAI API wrapper
  App.js         # Main application
  index.js       # Entry point
```

## 🤖 Agent Architecture

### Intake Agent
- Processes natural language input
- Extracts: goals, experience level, dietary restrictions, language preference
- Returns structured user profile

### Matchmaking Agent
- Analyzes trainer database
- Scores based on: expertise match, cultural awareness, availability
- Returns ranked trainer recommendations

### Workout Planning Agent
- Creates personalized workout plans
- Adapts for: dietary restrictions, cultural preferences, equipment availability
- Provides bilingual instructions when needed

## 🔧 Configuration

### Environment Variables
```bash
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
REACT_APP_API_ENDPOINT=https://api.openai.com/v1 # Optional
```

### Customization
- Trainer data: Edit `/src/data/trainers.json`
- Cultural mappings: Edit `/src/data/cultural.json`
- Agent prompts: Modify agent files in `/src/agents/`

## 📊 Performance Considerations
- Agents use GPT-4 for best results (can be switched to GPT-3.5-turbo for cost)
- Average response time: 2-3 seconds per agent
- Caching implemented for repeated queries

## 🐛 Troubleshooting

### Common Issues
1. **"Invalid API Key"**: Check your `.env` file has correct key
2. **"Network Error"**: Ensure you have internet connection
3. **"Build Failed"**: Run `npm install` to ensure all dependencies

### Debug Mode
```bash
# Run with debug logs
REACT_APP_DEBUG=true npm start
```

## 📈 Scaling Considerations
- Current: Mock trainer database
- Production: Would integrate with real trainer management system
- Agent responses are stateless and can be scaled horizontally

## 🔒 Security Notes
- API keys should never be committed to git
- In production, implement server-side API proxy
- Add rate limiting for API calls

---

Built with ❤️ for cross-cultural fitness networking