// Workout Planning Agent - Culturally-aware, personalized workout plan generation
import { simulateDelay } from '../utils/api';

export const processWorkoutPlanningAgent = async (userProfile, matchingResult) => {
  try {
    console.log('Workout Planning Agent: Starting plan generation...', { userProfile, matchingResult });
    
    // Add realistic processing delay
    await simulateDelay(3500);
    
    // Generate culturally-adapted workout plan
    const workoutPlan = generateWorkoutPlan(userProfile, matchingResult.recommendedTrainer);
    
    const result = {
      workoutPlan,
      insights: [
        `Generated ${workoutPlan.exercises.length}-exercise routine tailored to your goals`,
        `Adapted for ${userProfile.constraints.space} with ${userProfile.constraints.equipment.join('/')} equipment`,
        `Includes cultural considerations for ${userProfile.demographics.culturalContext} context`
      ],
      culturalNotes: generatePlanCulturalNotes(userProfile, workoutPlan),
      handoff: `Complete workout plan ready! ${workoutPlan.duration} program with ${workoutPlan.frequency} schedule, culturally adapted for ${userProfile.demographics.culturalContext} preferences.`
    };
    
    console.log('Workout Planning Agent: Plan generation complete', result);
    return result;
    
  } catch (error) {
    console.error('Workout Planning Agent Error:', error);
    return generateFallbackPlan();
  }
};

// Core workout plan generation with cultural adaptations
const generateWorkoutPlan = (userProfile, trainer) => {
  const goals = userProfile.fitness.goals;
  const level = userProfile.fitness.currentLevel;
  const constraints = userProfile.constraints;
  const cultural = userProfile.demographics;
  
  // Determine plan structure
  const duration = determinePlanDuration(level, goals);
  const frequency = determinePlanFrequency(constraints.timeAvailable, level);
  const sessionLength = constraints.timeAvailable === "15min" ? "15 minutes" : 
                       constraints.timeAvailable === "30min" ? "30 minutes" : "45 minutes";
  
  // Generate exercises based on goals and constraints
  const exercises = selectExercises(goals, level, constraints, cultural);
  
  // Add cultural adaptations
  const culturalAdaptations = generateCulturalAdaptations(cultural, constraints);
  
  // Add language learning elements if desired
  const languageLearning = cultural.language === "Chinese" ? 
    generateLanguageLearningElements(exercises) : null;
  
  return {
    overview: {
      duration,
      frequency,
      session_length: sessionLength,
      difficulty_progression: level === "beginner" ? "gradual" : "moderate",
      focus: goals.join(" + ")
    },
    exercises,
    culturalAdaptations,
    languageLearning,
    progressionPlan: generateProgressionPlan(level, goals, duration),
    nutritionNotes: generateNutritionNotes(cultural, goals),
    motivationalApproach: determineMotivationalApproach(cultural, trainer)
  };
};

const determinePlanDuration = (level, goals) => {
  if (level === "beginner") return "8 weeks";
  if (goals.includes("weight_loss")) return "12 weeks";
  if (goals.includes("muscle_building")) return "16 weeks";
  return "10 weeks";
};

const determinePlanFrequency = (timeAvailable, level) => {
  if (timeAvailable === "15min") return "6x per week";
  if (level === "beginner") return "3x per week";
  return "4x per week";
};

const selectExercises = (goals, level, constraints, cultural) => {
  const exerciseDatabase = getExerciseDatabase();
  let selectedExercises = [];
  
  // Filter by goals
  goals.forEach(goal => {
    const goalExercises = exerciseDatabase.filter(ex => ex.goals.includes(goal));
    selectedExercises = selectedExercises.concat(goalExercises.slice(0, 3));
  });
  
  // Filter by equipment constraints
  selectedExercises = selectedExercises.filter(ex => 
    constraints.equipment.some(equipment => ex.equipment.includes(equipment))
  );
  
  // Filter by space constraints
  if (constraints.space === "small_apartment") {
    selectedExercises = selectedExercises.filter(ex => ex.apartment_friendly);
  }
  
  // Add cultural considerations
  selectedExercises = selectedExercises.map(ex => ({
    ...ex,
    chinese_name: cultural.language === "Chinese" ? generateChineseName(ex.name) : null,
    cultural_notes: generateExerciseCulturalNotes(ex, cultural)
  }));
  
  // Ensure we have enough exercises
  if (selectedExercises.length < 6) {
    const backupExercises = exerciseDatabase.filter(ex => 
      ex.equipment.includes("none") && ex.apartment_friendly
    ).slice(0, 6 - selectedExercises.length);
    selectedExercises = selectedExercises.concat(backupExercises);
  }
  
  return selectedExercises.slice(0, 8); // Limit to 8 exercises
};

const getExerciseDatabase = () => {
  return [
    {
      name: "Bodyweight Squats",
      goals: ["weight_loss", "general_fitness", "strength"],
      equipment: ["none"],
      apartment_friendly: true,
      reps: "3 sets x 12-15 reps",
      difficulty: "beginner",
      muscles: ["legs", "glutes"],
      quiet: true
    },
    {
      name: "Modified Push-ups",
      goals: ["muscle_building", "strength", "general_fitness"],
      equipment: ["none"],
      apartment_friendly: true,
      reps: "3 sets x 8-12 reps",
      difficulty: "beginner",
      muscles: ["chest", "arms"],
      quiet: true
    },
    {
      name: "Plank Hold",
      goals: ["general_fitness", "strength"],
      equipment: ["none"],
      apartment_friendly: true,
      reps: "3 sets x 30-60 seconds",
      difficulty: "beginner",
      muscles: ["core"],
      quiet: true
    },
    {
      name: "Lunges",
      goals: ["weight_loss", "strength", "general_fitness"],
      equipment: ["none"],
      apartment_friendly: true,
      reps: "3 sets x 10 each leg",
      difficulty: "intermediate",
      muscles: ["legs", "glutes"],
      quiet: true
    },
    {
      name: "Mountain Climbers",
      goals: ["weight_loss", "endurance", "general_fitness"],
      equipment: ["none"],
      apartment_friendly: false, // Can be noisy
      reps: "3 sets x 20 reps",
      difficulty: "intermediate",
      muscles: ["cardio", "core"],
      quiet: false
    },
    {
      name: "Wall Sit",
      goals: ["strength", "endurance"],
      equipment: ["none"],
      apartment_friendly: true,
      reps: "3 sets x 30-45 seconds",
      difficulty: "beginner",
      muscles: ["legs"],
      quiet: true
    },
    {
      name: "Resistance Band Rows",
      goals: ["muscle_building", "strength"],
      equipment: ["basic"],
      apartment_friendly: true,
      reps: "3 sets x 12-15 reps",
      difficulty: "intermediate",
      muscles: ["back", "arms"],
      quiet: true
    },
    {
      name: "Yoga Flow Sequence",
      goals: ["general_fitness", "flexibility"],
      equipment: ["none"],
      apartment_friendly: true,
      reps: "15-20 minutes",
      difficulty: "beginner",
      muscles: ["full_body"],
      quiet: true
    },
    {
      name: "Dumbbell Curls",
      goals: ["muscle_building", "strength"],
      equipment: ["basic"],
      apartment_friendly: true,
      reps: "3 sets x 10-12 reps",
      difficulty: "intermediate",
      muscles: ["arms"],
      quiet: true
    },
    {
      name: "Glute Bridges",
      goals: ["strength", "general_fitness"],
      equipment: ["none"],
      apartment_friendly: true,
      reps: "3 sets x 15 reps",
      difficulty: "beginner",
      muscles: ["glutes", "core"],
      quiet: true
    }
  ];
};

const generateChineseName = (englishName) => {
  const translations = {
    "Bodyweight Squats": "深蹲",
    "Modified Push-ups": "改良式俯卧撑",
    "Plank Hold": "平板支撑",
    "Lunges": "弓步蹲",
    "Mountain Climbers": "登山式",
    "Wall Sit": "靠墙静蹲",
    "Resistance Band Rows": "弹力带划船",
    "Yoga Flow Sequence": "瑜伽流动序列",
    "Dumbbell Curls": "哑铃弯举",
    "Glute Bridges": "臀桥"
  };
  return translations[englishName] || englishName;
};

const generateExerciseCulturalNotes = (exercise, cultural) => {
  if (cultural.language === "Chinese") {
    if (exercise.quiet) {
      return "适合公寓环境，不会打扰邻居 (Apartment-friendly, won't disturb neighbors)";
    } else {
      return "注意控制音量，考虑邻居感受 (Control noise level, consider neighbors)";
    }
  }
  return exercise.apartment_friendly ? "Suitable for home environment" : "May require more space";
};

const generateCulturalAdaptations = (cultural, constraints) => {
  const adaptations = [];
  
  if (cultural.language === "Chinese") {
    adaptations.push("All exercises designed for apartment living with noise consideration");
    adaptations.push("Instructions provided in both English and Chinese");
    adaptations.push("Respects Chinese cultural preferences for discrete, non-disruptive exercise");
    
    if (constraints.space === "small_apartment") {
      adaptations.push("Optimized for typical Chinese apartment space constraints");
    }
  }
  
  if (constraints.equipment.includes("none")) {
    adaptations.push("No equipment needed - perfect for minimalist approach");
  }
  
  if (constraints.budget === "low") {
    adaptations.push("Cost-effective routine requiring no gym membership or expensive equipment");
  }
  
  return adaptations;
};

const generateLanguageLearningElements = (exercises) => {
  return {
    weekly_vocabulary: [
      "form (姿势)", "repetition (重复)", "set (组)", "rest (休息)",
      "strength (力量)", "endurance (耐力)", "balance (平衡)"
    ],
    exercise_phrases: [
      "Good form! 姿势很好！",
      "Take a rest. 休息一下。",
      "You're getting stronger! 你变强了！",
      "Focus on your breathing. 专注呼吸。"
    ],
    conversation_starters: [
      "How did that exercise feel? 这个动作感觉怎么样？",
      "Are you ready for the next set? 准备好下一组了吗？",
      "What's your energy level today? 今天精力如何？"
    ]
  };
};

const generateProgressionPlan = (level, goals, duration) => {
  const weeks = parseInt(duration);
  const phases = [];
  
  if (level === "beginner") {
    phases.push({
      phase: "Weeks 1-2",
      focus: "Form and Habit Building",
      progression: "Master basic movements, establish routine"
    });
    phases.push({
      phase: `Weeks 3-${Math.floor(weeks/2)}`,
      focus: "Strength Foundation",
      progression: "Increase repetitions, add complexity"
    });
    phases.push({
      phase: `Weeks ${Math.floor(weeks/2)+1}-${weeks}`,
      focus: "Goal Optimization",
      progression: "Intensify based on primary goals"
    });
  }
  
  return phases;
};

const generateNutritionNotes = (cultural, goals) => {
  if (cultural.language === "Chinese") {
    const notes = ["考虑中式饮食习惯，平衡蛋白质摄入 (Consider Chinese dietary habits, balance protein intake)"];
    
    if (goals.includes("weight_loss")) {
      notes.push("减少米饭分量，增加蔬菜 (Reduce rice portions, increase vegetables)");
    }
    if (goals.includes("muscle_building")) {
      notes.push("确保充足蛋白质：豆腐、鸡蛋、瘦肉 (Ensure adequate protein: tofu, eggs, lean meat)");
    }
    
    return notes;
  }
  
  return ["Maintain balanced nutrition to support your fitness goals"];
};

const determineMotivationalApproach = (cultural, trainer) => {
  if (cultural.language === "Chinese") {
    return {
      style: "Supportive and encouraging with cultural sensitivity",
      communication: "Patient guidance with English practice opportunities",
      feedback: "Positive reinforcement respecting Chinese communication preferences"
    };
  }
  
  return {
    style: "Direct and encouraging",
    communication: "Clear instruction with motivational support",
    feedback: "Regular progress check-ins and goal adjustments"
  };
};

const generatePlanCulturalNotes = (userProfile, workoutPlan) => {
  if (userProfile.demographics.language === "Chinese") {
    return `Workout plan respects Chinese cultural norms: quiet exercises for apartment living, gradual progression matching Chinese preference for steady improvement, and integrated English learning opportunities during exercise sessions.`;
  }
  return `Workout plan adapted to personal preferences with emphasis on sustainable progress and goal achievement.`;
};

const generateFallbackPlan = () => {
  return {
    workoutPlan: {
      overview: {
        duration: "8 weeks",
        frequency: "3x per week",
        session_length: "30 minutes",
        difficulty_progression: "gradual",
        focus: "general fitness"
      },
      exercises: [
        {
          name: "Bodyweight Squats",
          chinese_name: "深蹲",
          reps: "3 sets x 12 reps",
          cultural_notes: "Apartment-friendly, quiet exercise"
        },
        {
          name: "Modified Push-ups", 
          chinese_name: "改良式俯卧撑",
          reps: "3 sets x 8 reps",
          cultural_notes: "Can be done silently"
        }
      ],
      culturalAdaptations: ["Suitable for apartment living", "No equipment required"],
      languageLearning: null
    },
    insights: ["Basic workout plan generated", "Suitable for beginners", "Culturally adapted"],
    culturalNotes: "Plan designed with cultural sensitivity and space constraints in mind.",
    handoff: "Fallback workout plan ready for immediate use."
  };
};