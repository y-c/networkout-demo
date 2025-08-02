// Mock trainer database for Networkout matching system

export const mockTrainers = [
    {
      id: "trainer_001",
      personal: {
        name: "Sarah Johnson",
        location: "California, USA",
        languages: ["English", "Basic Mandarin"],
        timezone: "PST",
        age: 24,
        gender: "female"
      },
      expertise: {
        specialties: ["weight_loss", "home_fitness", "beginner_friendly", "apartment_workouts"],
        certifications: ["NASM-CPT", "Nutrition Specialist"],
        experience_years: 3,
        client_demographics: ["international_students", "beginners", "chinese_speakers"],
        success_stories: ["Helped 50+ Chinese students achieve fitness goals"]
      },
      availability: {
        hours: "flexible",
        preferred_times: ["evening_PST", "morning_PST"],
        response_time: "within_2_hours",
        timezone_flexibility: "high"
      },
      ratings: {
        overall: 4.9,
        patience: 5.0,
        cultural_sensitivity: 4.8,
        english_teaching: 4.7,
        communication: 4.9
      },
      cultural: {
        chinese_experience: "extensive",
        language_learning_support: true,
        cultural_adaptations: ["understands chinese apartment constraints", "familiar with chinese social norms"],
        motivational_style: "supportive_encouraging"
      },
      pricing: {
        tier: "moderate",
        student_discount: true,
        trial_session: true
      }
    },
    {
      id: "trainer_002",
      personal: {
        name: "Michael Chen",
        location: "New York, USA",
        languages: ["English", "Fluent Mandarin", "Cantonese"],
        timezone: "EST",
        age: 28,
        gender: "male"
      },
      expertise: {
        specialties: ["muscle_building", "strength_training", "intermediate_advanced", "form_correction"],
        certifications: ["ACSM-CPT", "Strength & Conditioning"],
        experience_years: 5,
        client_demographics: ["chinese_professionals", "intermediate_trainees", "busy_professionals"],
        success_stories: ["Specialized in helping Chinese professionals build strength"]
      },
      availability: {
        hours: "evenings_weekends",
        preferred_times: ["evening_EST"],
        response_time: "within_4_hours",
        timezone_flexibility: "medium"
      },
      ratings: {
        overall: 4.7,
        patience: 4.5,
        cultural_sensitivity: 5.0,
        english_teaching: 4.9,
        communication: 4.8
      },
      cultural: {
        chinese_experience: "native_understanding",
        language_learning_support: true,
        cultural_adaptations: ["bilingual communication", "understands chinese work culture"],
        motivational_style: "structured_disciplined"
      },
      pricing: {
        tier: "premium",
        student_discount: false,
        trial_session: true
      }
    },
    {
      id: "trainer_003",
      personal: {
        name: "Emma Rodriguez",
        location: "Texas, USA",
        languages: ["English", "Spanish", "Learning Mandarin"],
        timezone: "CST",
        age: 22,
        gender: "female"
      },
      expertise: {
        specialties: ["general_fitness", "endurance", "beginner_friendly", "motivation_coaching"],
        certifications: ["ACE-CPT", "Group Fitness"],
        experience_years: 2,
        client_demographics: ["college_students", "beginners", "budget_conscious"],
        success_stories: ["Helped 30+ students start their fitness journey"]
      },
      availability: {
        hours: "very_flexible",
        preferred_times: ["afternoon_CST", "evening_CST"],
        response_time: "within_1_hour",
        timezone_flexibility: "very_high"
      },
      ratings: {
        overall: 4.6,
        patience: 5.0,
        cultural_sensitivity: 4.3,
        english_teaching: 4.2,
        communication: 4.7
      },
      cultural: {
        chinese_experience: "limited_but_eager",
        language_learning_support: true,
        cultural_adaptations: ["patient with language barriers", "enthusiastic about cultural exchange"],
        motivational_style: "energetic_positive"
      },
      pricing: {
        tier: "budget_friendly",
        student_discount: true,
        trial_session: true
      }
    },
    {
      id: "trainer_004",
      personal: {
        name: "David Kim",
        location: "Washington, USA",
        languages: ["English", "Korean", "Basic Mandarin"],
        timezone: "PST",
        age: 26,
        gender: "male"
      },
      expertise: {
        specialties: ["home_fitness", "minimal_equipment", "efficient_workouts", "busy_schedules"],
        certifications: ["NASM-CPT", "Corrective Exercise"],
        experience_years: 4,
        client_demographics: ["working_professionals", "apartment_dwellers", "time_constrained"],
        success_stories: ["Expert in 30-minute effective workouts for small spaces"]
      },
      availability: {
        hours: "early_morning_evening",
        preferred_times: ["early_morning_PST", "late_evening_PST"],
        response_time: "within_3_hours",
        timezone_flexibility: "medium"
      },
      ratings: {
        overall: 4.8,
        patience: 4.6,
        cultural_sensitivity: 4.5,
        english_teaching: 4.0,
        communication: 4.7
      },
      cultural: {
        chinese_experience: "moderate",
        language_learning_support: false,
        cultural_adaptations: ["understands asian work culture", "efficient communication style"],
        motivational_style: "practical_results_focused"
      },
      pricing: {
        tier: "moderate",
        student_discount: false,
        trial_session: true
      }
    },
    {
      id: "trainer_005",
      personal: {
        name: "Lisa Zhang",
        location: "California, USA",
        languages: ["English", "Mandarin", "Shanghai Dialect"],
        timezone: "PST",
        age: 25,
        gender: "female"
      },
      expertise: {
        specialties: ["weight_loss", "nutrition", "lifestyle_coaching", "cultural_bridge"],
        certifications: ["ACSM-CPT", "Registered Dietitian"],
        experience_years: 3,
        client_demographics: ["chinese_immigrants", "cultural_transition", "holistic_health"],
        success_stories: ["Bicultural fitness coach helping Chinese clients adapt to US lifestyle"]
      },
      availability: {
        hours: "very_flexible",
        preferred_times: ["flexible_across_timezones"],
        response_time: "within_1_hour",
        timezone_flexibility: "extreme"
      },
      ratings: {
        overall: 4.9,
        patience: 5.0,
        cultural_sensitivity: 5.0,
        english_teaching: 4.8,
        communication: 5.0
      },
      cultural: {
        chinese_experience: "native_bicultural",
        language_learning_support: true,
        cultural_adaptations: ["perfect cultural bridge", "understands immigration challenges"],
        motivational_style: "empathetic_holistic"
      },
      pricing: {
        tier: "premium",
        student_discount: true,
        trial_session: true
      }
    }
  ];
  
  // Helper functions for trainer database queries
  export const getTrainerById = (id) => {
    return mockTrainers.find(trainer => trainer.id === id);
  };
  
  export const getTrainersBySpecialty = (specialty) => {
    return mockTrainers.filter(trainer => 
      trainer.expertise.specialties.includes(specialty)
    );
  };
  
  export const getTrainersByLanguage = (language) => {
    return mockTrainers.filter(trainer => 
      trainer.personal.languages.some(lang => 
        lang.toLowerCase().includes(language.toLowerCase())
      )
    );
  };
  
  export const getTrainersByBudget = (budgetTier) => {
    const budgetMap = {
      "low": ["budget_friendly"],
      "moderate": ["budget_friendly", "moderate"],
      "high": ["budget_friendly", "moderate", "premium"]
    };
    
    return mockTrainers.filter(trainer => 
      budgetMap[budgetTier]?.includes(trainer.pricing.tier)
    );
  };