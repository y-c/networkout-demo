import React from 'react';
import { Star, Globe, Clock, Dumbbell, MessageCircle } from 'lucide-react';

const Results = ({ results }) => {
  const { matching, planning } = results;

  // Show placeholder when no results yet
  if (!matching || !planning) {
    return (
      <div className="text-center py-8">
        <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Dumbbell className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-gray-500 text-sm">
          Your personalized trainer match and workout plan will appear here after our AI agents complete their analysis.
        </p>
      </div>
    );
  }

  const trainer = matching?.recommendedTrainer;
  const workoutPlan = planning?.workoutPlan;

  return (
    <div className="space-y-6">
      {/* Matched Trainer */}
      {trainer && trainer.personal && (
        <div className="fade-in">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>Your Perfect Match</span>
          </h3>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="bg-primary-100 p-3 rounded-full">
                <span className="text-lg font-bold text-primary-600">
                  {trainer.personal.name ? trainer.personal.name.charAt(0) : '?'}
                </span>
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{trainer.personal.name || 'Trainer'}</h4>
                <p className="text-sm text-gray-600">{trainer.personal.location || 'Location not specified'}</p>
                
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span>{trainer.ratings?.overall || 'N/A'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Globe className="h-3 w-3" />
                    <span>{trainer.personal.languages ? trainer.personal.languages.join(', ') : 'English'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{trainer.personal.timezone || 'Flexible'}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-xs text-gray-600 mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {(trainer.expertise?.specialties || ['General Fitness']).map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {matching.matchReason && (
              <div className="cultural-highlight mt-4">
                <p className="text-xs font-medium text-blue-700 mb-1">Why this match?</p>
                <p className="text-xs text-blue-600">{matching.matchReason}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Workout Plan Preview */}
      {workoutPlan && (
        <div className="fade-in">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <Dumbbell className="h-4 w-4 text-primary-500" />
            <span>Your Custom Plan</span>
          </h3>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <span className="text-gray-500">Duration:</span>
                <p className="font-medium">{workoutPlan.overview?.duration || workoutPlan.duration}</p>
              </div>
              <div>
                <span className="text-gray-500">Frequency:</span>
                <p className="font-medium">{workoutPlan.overview?.frequency || workoutPlan.frequency}</p>
              </div>
            </div>
            
            {workoutPlan.exercises && (
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-700 mb-2">Sample Exercises:</p>
                <div className="space-y-2">
                  {workoutPlan.exercises.slice(0, 3).map((exercise, index) => (
                    <div key={index} className="flex justify-between items-start text-xs">
                      <div className="flex-1">
                        <span className="text-gray-900 font-medium">
                          {exercise.name}
                        </span>
                        {exercise.chinese_name && (
                          <span className="text-gray-500 ml-1 block">({exercise.chinese_name})</span>
                        )}
                        {exercise.cultural_notes && (
                          <span className="text-blue-600 text-xs block mt-1">{exercise.cultural_notes}</span>
                        )}
                      </div>
                      <span className="text-gray-600 ml-2">{exercise.reps}</span>
                    </div>
                  ))}
                  {workoutPlan.exercises.length > 3 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{workoutPlan.exercises.length - 3} more exercises
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {workoutPlan.culturalAdaptations && (
              <div className="cultural-highlight">
                <p className="text-xs font-medium text-blue-700 mb-1">Cultural Adaptations:</p>
                <ul className="text-xs text-blue-600 space-y-1">
                  {workoutPlan.culturalAdaptations.slice(0, 2).map((adaptation, index) => (
                    <li key={index} className="flex items-start space-x-1">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>{adaptation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Next Steps */}
      {trainer && trainer.personal && workoutPlan && (
        <div className="fade-in">
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-4 border border-primary-200">
            <h4 className="font-semibold text-primary-900 mb-2 flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Ready to Start?</span>
            </h4>
            <p className="text-sm text-primary-700 mb-3">
              Your AI-matched trainer and culturally-adapted workout plan are ready!
            </p>
            <button className="w-full bg-primary-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-primary-600 transition-colors">
              Connect with {trainer.personal.name || 'Your Trainer'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;