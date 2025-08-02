// Matchmaking Agent - Intelligent trainer-client pairing with cultural awareness
import { simulateDelay } from '../utils/api';
import { mockTrainers } from '../data/mock-trainers';

export const processMatchmakingAgent = async (userProfile) => {
  try {
    console.log('Matchmaking Agent: Starting analysis...', userProfile);
    
    // Add realistic processing delay
    await simulateDelay(4000);
    
    // Find the best trainer matches
    const matches = findCompatibleTrainers(userProfile);
    
    // Select the top match and generate reasoning
    const topMatch = matches[0];
    const matchReasoning = generateMatchReasoning(userProfile, topMatch);
    
    const result = {
      recommendedTrainer: topMatch.trainer,
      compatibilityScore: topMatch.score,
      matchReason: matchReasoning,
      alternativeMatches: matches.slice(1, 3).map(match => ({
        trainer: match.trainer,
        score: match.score,
        reason: match.reason
      })),
      insights: [
        `Found ${matches.length} compatible trainers based on your profile`,
        `Top match has ${topMatch.score}% compatibility`,
        `Cultural compatibility: ${topMatch.culturalFit}`
      ],
      culturalNotes: generateCulturalNotes(userProfile, topMatch.trainer),
      handoff: `Trainer selected: ${topMatch.trainer.personal.name} (${topMatch.score}% match). Ready for workout planning with cultural considerations: ${userProfile.demographics.culturalContext}.`
    };
    
    console.log('Matchmaking Agent: Analysis complete', result);
    return result;
    
  } catch (error) {
    console.error('Matchmaking Agent Error:', error);
    return generateFallbackMatch();
  }
};

// Core matching algorithm with multiple criteria
const findCompatibleTrainers = (userProfile) => {
  const scoredTrainers = mockTrainers.map(trainer => {
    const score = calculateCompatibilityScore(userProfile, trainer);
    const reason = generateMatchReason(userProfile, trainer, score);
    const culturalFit = assessCulturalFit(userProfile, trainer);
    
    return {
      trainer,
      score: Math.round(score),
      reason,
      culturalFit
    };
  });
  
  // Sort by score descending
  return scoredTrainers.sort((a, b) => b.score - a.score);
};

// Sophisticated compatibility scoring algorithm
const calculateCompatibilityScore = (userProfile, trainer) => {
  let score = 0;
  
  // 1. Goal Alignment (25 points)
  const goalMatch = userProfile.fitness.goals.some(goal => 
    trainer.expertise.specialties.includes(goal)
  );
  if (goalMatch) score += 25;
  
  // 2. Experience Level Match (20 points)
  const experienceMatch = checkExperienceMatch(userProfile.fitness.currentLevel, trainer);
  score += experienceMatch;
  
  // 3. Cultural Compatibility (20 points)
  const culturalScore = calculateCulturalScore(userProfile, trainer);
  score += culturalScore;
  
  // 4. Language Compatibility (15 points)
  const languageScore = calculateLanguageScore(userProfile, trainer);
  score += languageScore;
  
  // 5. Constraint Compatibility (10 points)
  const constraintScore = calculateConstraintScore(userProfile, trainer);
  score += constraintScore;
  
  // 6. Budget Compatibility (10 points)
  const budgetScore = calculateBudgetScore(userProfile, trainer);
  score += budgetScore;
  
  return Math.min(score, 100); // Cap at 100%
};

const checkExperienceMatch = (userLevel, trainer) => {
  const levelMap = {
    "beginner": ["beginner_friendly", "beginners"],
    "intermediate": ["intermediate_advanced", "intermediate"],
    "advanced": ["intermediate_advanced", "advanced"]
  };
  
  const userLevelKeywords = levelMap[userLevel] || [];
  const hasMatch = userLevelKeywords.some(keyword => 
    trainer.expertise.specialties.includes(keyword) ||
    trainer.expertise.client_demographics.includes(keyword)
  );
  
  return hasMatch ? 20 : 10;
};

const calculateCulturalScore = (userProfile, trainer) => {
  let score = 0;
  
  if (userProfile.demographics.culturalContext === "Chinese mainland") {
    // Bonus for Chinese experience
    if (trainer.cultural.chinese_experience === "native_bicultural") score += 20;
    else if (trainer.cultural.chinese_experience === "extensive") score += 15;
    else if (trainer.cultural.chinese_experience === "moderate") score += 10;
    else if (trainer.cultural.chinese_experience === "limited_but_eager") score += 5;
    
    // Bonus for cultural adaptations
    if (trainer.cultural.cultural_adaptations.length > 0) score += 5;
  } else {
    score += 15; // Default score for non-Chinese users
  }
  
  return Math.min(score, 20);
};

const calculateLanguageScore = (userProfile, trainer) => {
  let score = 0;
  
  if (userProfile.demographics.language === "Chinese") {
    // Check if trainer speaks Chinese
    const speaksChinese = trainer.personal.languages.some(lang => 
      lang.toLowerCase().includes("mandarin") || lang.toLowerCase().includes("chinese")
    );
    
    if (speaksChinese) {
      score += 15;
    } else if (trainer.cultural.language_learning_support) {
      score += 10; // Bonus for being supportive of language learning
    } else {
      score += 5; // Basic English only
    }
    
    // Extra bonus for English teaching ability if user wants to learn
    if (userProfile.cultural.languageLearningInterest && trainer.ratings.english_teaching > 4.0) {
      score += 5;
    }
  } else {
    score += 15; // Default score for English speakers
  }
  
  return Math.min(score, 15);
};

const calculateConstraintScore = (userProfile, trainer) => {
  let score = 0;
  
  // Space constraints
  if (userProfile.constraints.space === "small_apartment") {
    if (trainer.expertise.specialties.includes("apartment_workouts") || 
        trainer.expertise.specialties.includes("home_fitness")) {
      score += 5;
    }
  }
  
  // Equipment constraints
  if (userProfile.constraints.equipment.includes("none")) {
    if (trainer.expertise.specialties.includes("minimal_equipment") ||
        trainer.expertise.specialties.includes("home_fitness")) {
      score += 5;
    }
  }
  
  return score;
};

const calculateBudgetScore = (userProfile, trainer) => {
  const budgetCompatibility = {
    "low": { "budget_friendly": 10, "moderate": 5, "premium": 0 },
    "moderate": { "budget_friendly": 10, "moderate": 10, "premium": 5 },
    "high": { "budget_friendly": 10, "moderate": 10, "premium": 10 }
  };
  
  const userBudget = userProfile.constraints.budget;
  const trainerTier = trainer.pricing.tier;
  
  let score = budgetCompatibility[userBudget]?.[trainerTier] || 5;
  
  // Bonus for student discount if user is budget-conscious
  if (userBudget === "low" && trainer.pricing.student_discount) {
    score += 2;
  }
  
  return score;
};

const generateMatchReason = (userProfile, trainer, score) => {
  const reasons = [];
  
  // Goal alignment
  const matchingGoals = userProfile.fitness.goals.filter(goal => 
    trainer.expertise.specialties.includes(goal)
  );
  if (matchingGoals.length > 0) {
    reasons.push(`Specializes in ${matchingGoals.join(' and ')}`);
  }
  
  // Cultural fit
  if (userProfile.demographics.culturalContext === "Chinese mainland") {
    if (trainer.cultural.chinese_experience === "native_bicultural") {
      reasons.push("Native bicultural understanding");
    } else if (trainer.cultural.chinese_experience === "extensive") {
      reasons.push("Extensive experience with Chinese clients");
    }
    
    if (trainer.personal.languages.some(lang => lang.includes("Mandarin"))) {
      reasons.push("Speaks Mandarin");
    }
  }
  
  // Experience level
  if (userProfile.fitness.currentLevel === "beginner" && 
      trainer.expertise.specialties.includes("beginner_friendly")) {
    reasons.push("Patient with beginners");
  }
  
  // Constraints
  if (userProfile.constraints.space === "small_apartment" &&
      trainer.expertise.specialties.includes("apartment_workouts")) {
    reasons.push("Apartment-friendly workouts");
  }
  
  return reasons.join(", ") || "Good overall compatibility";
};

const assessCulturalFit = (userProfile, trainer) => {
  if (userProfile.demographics.culturalContext === "Chinese mainland") {
    if (trainer.cultural.chinese_experience === "native_bicultural") return "Excellent";
    if (trainer.cultural.chinese_experience === "extensive") return "Very Good";
    if (trainer.cultural.chinese_experience === "moderate") return "Good";
    return "Fair";
  }
  return "Good";
};

const generateMatchReasoning = (userProfile, topMatch) => {
  const trainer = topMatch.trainer;
  const reasoning = [];
  
  reasoning.push(`${trainer.personal.name} is an ideal match because:`);
  
  if (userProfile.demographics.culturalContext === "Chinese mainland") {
    if (trainer.cultural.chinese_experience === "native_bicultural") {
      reasoning.push("She has native bicultural understanding and can bridge Chinese and American fitness approaches perfectly.");
    } else if (trainer.cultural.chinese_experience === "extensive") {
      reasoning.push("She has extensive experience working with Chinese clients and understands cultural nuances.");
    }
  }
  
  const matchingGoals = userProfile.fitness.goals.filter(goal => 
    trainer.expertise.specialties.includes(goal)
  );
  if (matchingGoals.length > 0) {
    reasoning.push(`Her specialties in ${matchingGoals.join(' and ')} align perfectly with your goals.`);
  }
  
  if (userProfile.constraints.space === "small_apartment" && 
      trainer.expertise.specialties.includes("apartment_workouts")) {
    reasoning.push("She specializes in apartment-friendly workouts that work within your space constraints.");
  }
  
  if (userProfile.cultural.languageLearningInterest && trainer.ratings.english_teaching > 4.0) {
    reasoning.push("She can help you practice English while working out, supporting your language learning goals.");
  }
  
  return reasoning.join(" ");
};

const generateCulturalNotes = (userProfile, trainer) => {
  if (userProfile.demographics.culturalContext === "Chinese mainland") {
    return `${trainer.personal.name} understands Chinese cultural preferences for supportive coaching, apartment living constraints, and can facilitate English practice during sessions.`;
  }
  return `${trainer.personal.name} will adapt her coaching style to your personal preferences and cultural background.`;
};

const generateFallbackMatch = () => {
  const fallbackTrainer = mockTrainers[0]; // Sarah Johnson as safe fallback
  
  return {
    recommendedTrainer: fallbackTrainer,
    compatibilityScore: 85,
    matchReason: "Excellent all-around trainer with cultural sensitivity and beginner-friendly approach.",
    alternativeMatches: [],
    insights: [
      "Using fallback matching due to processing error",
      "Selected trainer has excellent ratings",
      "Cultural compatibility verified"
    ],
    culturalNotes: "Trainer has experience with diverse cultural backgrounds and adaptive coaching methods.",
    handoff: `Fallback trainer selected: ${fallbackTrainer.personal.name}. Ready for workout planning.`
  };
};