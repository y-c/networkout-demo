// Intake Agent - Mock version with intelligent processing
import { simulateDelay } from '../utils/api';

export const processIntakeAgent = async (userInput) => {
  try {
    console.log('Intake Agent: Starting analysis...', userInput);
    
    // Add realistic processing delay
    await simulateDelay(3000);
    
    // Intelligent mock processing based on user input
    const profile = generateIntelligentProfile(userInput);
    
    console.log('Intake Agent: Profile extracted successfully', profile);
    return profile;
    
  } catch (error) {
    console.error('Intake Agent Error:', error);
    return generateFallbackProfile();
  }
};

// Intelligent profile generator that actually analyzes the input
const generateIntelligentProfile = (userInput) => {
  const input = userInput.toLowerCase();
  
  // Language detection
  const isChinese = /[\u4e00-\u9fff]/.test(userInput);
  const hasEnglishConcern = /英语不好|english.*not.*good|english.*poor|don't speak english well/i.test(userInput);
  
  // Goal detection
  const hasWeightLoss = /减肥|减重|瘦身|weight.*loss|lose.*weight|slim down/i.test(userInput);
  const hasMuscleBuilding = /增肌|健身|muscle|build|strength|强壮|力量/i.test(userInput);
  const hasEndurance = /跑步|有氧|cardio|endurance|stamina|running/i.test(userInput);
  
  // Experience level detection
  const isBeginner = /初学者|新手|beginner|never|first time|不会|不懂/i.test(userInput);
  const isExperienced = /经验|experienced|familiar|已经|regularly|for years/i.test(userInput);
  
  // Constraint detection
  const hasApartment = /公寓|apartment|small.*space|limited.*space/i.test(userInput);
  const isStudent = /学生|student|university|college|school/i.test(userInput);
  const hasNoEquipment = /没有器械|no equipment|no gym|home.*only/i.test(userInput);
  const hasBudgetConcern = /便宜|cheap|budget|limited.*money|can't afford/i.test(userInput);
  
  // Time constraint detection
  const hasTimeLimit = /忙|busy|limited.*time|短时间|quick|没时间/i.test(userInput);
  
  // Determine goals
  let goals = [];
  if (hasWeightLoss) goals.push("weight_loss");
  if (hasMuscleBuilding) goals.push("muscle_building");
  if (hasEndurance) goals.push("endurance");
  if (goals.length === 0) goals.push("general_fitness");
  
  // Determine experience level
  let experienceLevel = "intermediate";
  if (isBeginner) experienceLevel = "beginner";
  if (isExperienced) experienceLevel = "advanced";
  
  // Generate insights based on analysis
  const insights = [];
  if (isChinese) {
    insights.push("User prefers Chinese communication with potential English learning interest");
  }
  if (hasApartment) {
    insights.push("Limited space requires apartment-friendly, quiet exercise routines");
  }
  if (isStudent) {
    insights.push("Budget-conscious student seeking affordable fitness solutions");
  }
  if (hasEnglishConcern && isChinese) {
    insights.push("English language practice could be valuable secondary benefit");
  }
  if (hasTimeLimit) {
    insights.push("Time-efficient workouts needed for busy schedule");
  }
  if (hasNoEquipment) {
    insights.push("Bodyweight exercises essential - no equipment available");
  }
  
  // Generate cultural notes
  let culturalNotes = "";
  if (isChinese) {
    culturalNotes = "Requires cultural sensitivity for Chinese social norms, apartment living constraints, and potential language learning opportunities.";
  } else {
    culturalNotes = "Standard Western fitness approach with personalized modifications based on stated preferences.";
  }
  
  // Generate handoff message
  const handoff = `Profile ready for matching: ${isChinese ? 'Chinese' : 'English'}-speaking ${isStudent ? 'student' : 'individual'} seeking ${goals.join(' and ')} support with ${hasEnglishConcern ? 'English learning interest' : 'flexible communication'} and ${hasApartment ? 'space constraints' : 'flexible space'}.`;
  
  return {
    demographics: {
      language: isChinese ? "Chinese" : "English",
      englishLevel: hasEnglishConcern ? "beginner" : isChinese ? "intermediate" : "advanced",
      location: isChinese ? "Shanghai" : "California",
      culturalContext: isChinese ? "Chinese mainland" : "Other"
    },
    fitness: {
      currentLevel: experienceLevel,
      goals: goals,
      experience: isBeginner ? "none" : isExperienced ? "experienced" : "some",
      preferences: hasApartment || hasNoEquipment ? ["home_workout"] : ["home_workout", "flexible"]
    },
    constraints: {
      equipment: hasNoEquipment ? ["none"] : ["basic"],
      space: hasApartment ? "small_apartment" : "normal_home",
      timeAvailable: hasTimeLimit ? "30min" : "45min",
      budget: isStudent || hasBudgetConcern ? "low" : "moderate"
    },
    cultural: {
      motivationStyle: isChinese ? "supportive" : "encouraging",
      communicationPreference: hasEnglishConcern ? "patient" : "encouraging",
      socialComfort: hasEnglishConcern ? "shy_initially" : "reserved",
      languageLearningInterest: isChinese
    },
    insights: insights.length > 0 ? insights : [
      "User seeking personalized fitness guidance",
      "Flexible approach needed based on stated preferences",
      "Good candidate for structured fitness program"
    ],
    culturalNotes: culturalNotes,
    handoff: handoff
  };
};

// Fallback profile for error cases
const generateFallbackProfile = () => {
  return {
    demographics: {
      language: "English",
      englishLevel: "intermediate",
      location: "San Francisco",
      culturalContext: "Other"
    },
    fitness: {
      currentLevel: "beginner",
      goals: ["general_fitness"],
      experience: "some",
      preferences: ["home_workout", "flexible"]
    },
    constraints: {
      equipment: ["basic"],
      space: "normal_home",
      timeAvailable: "30min",
      budget: "moderate"
    },
    cultural: {
      motivationStyle: "supportive",
      communicationPreference: "encouraging",
      socialComfort: "reserved",
      languageLearningInterest: false
    },
    insights: [
      "General fitness goals identified",
      "Flexible workout preferences",
      "Standard fitness approach suitable"
    ],
    culturalNotes: "Standard fitness approach with personalized modifications.",
    handoff: "Profile ready for matching: English-speaking individual seeking general fitness support."
  };
};