# Networkout - AI Agent System Design Document

## Project Overview
**Concept**: AI-powered cross-cultural fitness networking platform connecting Chinese fitness enthusiasts with US trainers through autonomous agent workflows.

**Hackathon Track**: Agentic Workflows - Build autonomous agents that think, act, and execute

**Timeline**: 5 hours (12 PM - 5 PM SF time)

---

## System Architecture

### Agent Communication Flow
```
User Input → Intake Agent → Matchmaking Agent → Workout Planning Agent → Final Output
```

### Core Agents (3 Focus Agents)

#### 1. Intake Agent
**Purpose**: Autonomous user profiling and requirement extraction
- **Input**: Natural language user description (Chinese/English)
- **Processing**: 
  - Extract fitness goals, current level, constraints
  - Identify language proficiency and cultural context
  - Determine equipment availability and space limitations
- **Output**: Structured UserProfile object
- **Autonomous Behavior**: Asks follow-up questions if information incomplete

#### 2. Matchmaking Agent  
**Purpose**: Intelligent trainer-client pairing with cultural awareness
- **Input**: UserProfile + Trainer database
- **Processing**:
  - Score compatibility based on expertise, language, timezone
  - Consider cultural factors (communication style, training approach)
  - Apply machine learning-style ranking
- **Output**: Ranked list of trainer matches with reasoning
- **Autonomous Behavior**: Continuously learns from successful pairings

#### 3. Workout Planning Agent
**Purpose**: Culturally-aware, personalized workout plan generation
- **Input**: UserProfile + Selected Trainer + Match context
- **Processing**:
  - Generate equipment-appropriate exercises
  - Include cultural considerations (apartment size, social norms)
  - Add English learning vocabulary
  - Create progression timeline
- **Output**: Comprehensive WorkoutPlan
- **Autonomous Behavior**: Adapts plans based on cultural and practical constraints

---

## Data Models

### UserProfile
```javascript
{
  demographics: {
    language: "Chinese", 
    englishLevel: "beginner",
    location: "Shanghai",
    age: 25,
    gender: "female"
  },
  fitness: {
    currentLevel: "beginner",
    goals: ["weight_loss", "strength"],
    experience: "6_months",
    preferences: ["home_workout", "flexible_schedule"]
  },
  constraints: {
    equipment: ["none", "basic"],
    space: "small_apartment", 
    timeAvailable: "30min_daily",
    budget: "moderate"
  },
  cultural: {
    motivationStyle: "supportive",
    communicationPreference: "patient",
    socialComfort: "shy_initially"
  }
}
```

### TrainerProfile
```javascript
{
  personal: {
    name: "Sarah Johnson",
    location: "California",
    languages: ["English", "basic_Mandarin"],
    timezone: "PST"
  },
  expertise: {
    specialties: ["weight_loss", "home_fitness", "beginner_friendly"],
    certifications: ["NASM", "college_kinesiology"],
    experience_years: 3,
    client_demographics: ["international_students", "beginners"]
  },
  availability: {
    hours: "flexible",
    preferred_times: ["evening_PST"],
    response_time: "within_2_hours"
  },
  ratings: {
    overall: 4.8,
    patience: 5.0,
    cultural_sensitivity: 4.9,
    english_teaching: 4.5
  }
}
```

### WorkoutPlan
```javascript
{
  overview: {
    duration: "8_weeks",
    frequency: "4x_per_week",
    session_length: "30_minutes",
    difficulty_progression: "gradual"
  },
  exercises: [
    {
      name: "Bodyweight Squats",
      chinese_name: "深蹲",
      reps: "3x12",
      cultural_notes: "Can be done quietly in apartment",
      english_vocabulary: ["squat", "repetition", "form"],
      progression: "Week 1-2: bodyweight, Week 3-4: add pulse"
    }
  ],
  cultural_adaptations: [
    "All exercises apartment-friendly (no jumping)",
    "Includes modesty considerations",
    "Accounts for smaller living spaces"
  ],
  language_learning: {
    weekly_vocabulary: ["form", "repetition", "rest"],
    conversation_starters: ["How did your workout feel?"],
    cultural_phrases: ["Great job! 很好！"]
  }
}
```

---

## Demo Interface Design

### Layout Structure
```
+------------------+----------------------+------------------+
|   User Input     |   Agent Reasoning    |   Final Results  |
|   (Left Panel)   |   (Center Panel)     |   (Right Panel)  |
|                  |                      |                  |
| - Input form     | - Agent 1: Intake   | - Matched Trainer|
| - User story     | - Agent 2: Matching | - Workout Plan   |
| - Submit button  | - Agent 3: Planning | - Next Steps     |
+------------------+----------------------+------------------+
```

### Agent Reasoning Display
Each agent shows:
1. **Status Indicator**: "Analyzing..." with spinner → "Complete" with checkmark
2. **Key Insights**: Bullet points of what the agent extracted/decided
3. **Decision Rationale**: Brief explanation of reasoning
4. **Handoff Message**: What information is passed to next agent

### User Experience Flow
1. **Input**: User describes fitness goals in natural language
2. **Processing**: Watch agents work autonomously with visible reasoning
3. **Results**: See personalized trainer match and workout plan
4. **Success Metrics**: Cultural awareness + practical recommendations

---

## Technical Implementation

### Tech Stack
- **Framework**: LangChain or OpenAI API
- **Frontend**: React with Tailwind CSS
- **Backend**: Node.js/Express (lightweight)  
- **Demo Platform**: Local development, ready for deployment

### File Structure
```
/networkout-demo
  /src
    /agents
      - intake-agent.js
      - matchmaking-agent.js
      - workout-planning-agent.js
    /components
      - AgentDisplay.jsx
      - UserInput.jsx
      - Results.jsx
    /data
      - mock-trainers.js
      - cultural-adaptations.js
  /docs
    - design-doc.md
  - package.json
  - README.md
```

---

## Success Criteria & Checkpoints

### Hour 1 Checkpoint ✓
- [ ] Basic React app setup
- [ ] Agent framework initialized
- [ ] Mock data created

### Hour 2-3 Checkpoint ✓  
- [ ] Intake Agent working with demo inputs
- [ ] Matchmaking Agent showing reasoning
- [ ] Basic UI showing agent progression

### Hour 4 Checkpoint ✓
- [ ] Workout Planning Agent functional
- [ ] Full agent pipeline working
- [ ] Cultural adaptations visible

### Hour 5 Final ✓
- [ ] Polished demo interface
- [ ] Clear agent reasoning display
- [ ] Ready for presentation
- [ ] Deployed/ready to show

---

## Demo Script (5-minute presentation)

### Setup (30 seconds)
"Networkout solves cross-cultural fitness networking through autonomous AI agents..."

### Demo Flow (3.5 minutes)
1. **Input**: Chinese user story (30s)
2. **Agent 1 - Intake**: Show cultural awareness and profiling (45s)
3. **Agent 2 - Matching**: Demonstrate intelligent trainer selection (60s)
4. **Agent 3 - Planning**: Cultural workout adaptations (60s)
5. **Results**: Show final recommendations (45s)

### Wrap-up (1 minute)
- Autonomous decision-making highlights
- Cross-cultural problem solving
- Scalability potential

---

## Risk Mitigation

### Technical Risks
- **API Rate Limits**: Use mock responses as fallback
- **Agent Complexity**: Focus on clear reasoning display over complex logic
- **Time Constraints**: Prioritize demo flow over feature completeness

### Demo Risks  
- **Internet Issues**: Have offline demo ready
- **Agent Failures**: Mock successful responses as backup
- **Presentation**: Practice 5-minute story multiple times

---

*Last Updated: Hour 1 Complete (1:00 PM SF) - Basic React app running, ready for AI agent implementation*