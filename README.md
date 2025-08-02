# Networkout - AI Agent Demo

## 🎯 Hackathon Project
**Track**: Agentic Workflows - Build autonomous agents that think, act, and execute
**Timeline**: 5 hours (12 PM - 5 PM SF time)

## 🚀 Concept
AI-powered cross-cultural fitness networking platform connecting Chinese fitness enthusiasts with US trainers through autonomous agent workflows.

## 🤖 Core Agents
1. **Intake Agent** - Autonomous user profiling and requirement extraction
2. **Matchmaking Agent** - Intelligent trainer-client pairing with cultural awareness  
3. **Workout Planning Agent** - Culturally-aware, personalized workout plan generation

## 🛠 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- OpenAI API key

### Installation
```bash
# Clone and install
git clone <your-repo-url>
cd networkout-demo
npm install

# Set up environment
cp .env.example .env
# Add your OpenAI API key to .env

# Start development server
npm start
```

### Environment Variables
```bash
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
```

## 📁 Project Structure
```
/src
  /agents          # AI agent implementations
  /components      # React UI components
  /data           # Mock data and cultural adaptations
  /utils          # API utilities
  App.js          # Main application
  index.js        # Entry point
```

## 🎬 Demo Flow
1. User inputs fitness goals in natural language
2. Intake Agent analyzes and profiles user
3. Matchmaking Agent finds compatible trainers
4. Workout Planning Agent creates culturally-aware plan
5. Results displayed with agent reasoning visible

## 🏗 Development Timeline
- **Hour 1**: Basic setup + Intake Agent
- **Hour 2-3**: Matchmaking Agent + UI
- **Hour 4**: Workout Planning Agent
- **Hour 5**: Polish + Demo prep

## 🎯 Success Metrics
- ✅ Shows autonomous decision-making
- ✅ Cultural awareness evident
- ✅ Smooth agent-to-agent handoffs
- ✅ Practical, personalized recommendations

## 📝 License
MIT - Built for hackathon demonstration

---
*Built with ❤️ for cross-cultural fitness networking*
