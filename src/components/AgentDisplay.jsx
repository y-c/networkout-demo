import React from 'react';
import { Brain, CheckCircle, Clock, Loader, Zap } from 'lucide-react';

const AgentDisplay = ({ agentName, status, description, result }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'analyzing':
        return <Loader className="h-5 w-5 text-amber-500 animate-spin" />;
      case 'complete':
        return <CheckCircle className="h-5 w-5 text-green-500 status-complete" />;
      case 'waiting':
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getCardClass = () => {
    let baseClass = 'agent-card';
    if (status === 'analyzing') baseClass += ' analyzing agent-processing';
    if (status === 'complete') baseClass += ' complete';
    return baseClass;
  };

  const getStatusText = () => {
    switch (status) {
      case 'analyzing':
        return 'Analyzing...';
      case 'complete':
        return 'Complete';
      case 'waiting':
      default:
        return 'Waiting';
    }
  };

  const getProgressPercentage = () => {
    switch (status) {
      case 'analyzing':
        return 50;
      case 'complete':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className={getCardClass()}>
      {/* Agent Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl shadow-sm">
            {status === 'analyzing' ? (
              <Zap className="h-5 w-5 text-blue-600" />
            ) : (
              <Brain className="h-5 w-5 text-blue-600" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{agentName}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`status-dot status-${status}`}></div>
          {getStatusIcon()}
                      <span className={`text-sm font-semibold ${
            status === 'analyzing' ? 'text-amber-600' :
            status === 'complete' ? 'text-green-600' : 
            'text-gray-500'
          }`}>
            {getStatusText()}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar mb-4">
        <div 
          className="progress-fill" 
          style={{ width: `${getProgressPercentage()}%` }}
        ></div>
      </div>

      {/* Agent Reasoning/Results */}
      {status === 'analyzing' && (
        <div className="agent-reasoning fade-in">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex space-x-1">
              <div className="pulse-dot w-2 h-2 bg-amber-500 rounded-full"></div>
              <div className="pulse-dot w-2 h-2 bg-amber-500 rounded-full"></div>
              <div className="pulse-dot w-2 h-2 bg-amber-500 rounded-full"></div>
            </div>
            <span className="text-sm font-semibold text-amber-700">Processing...</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {agentName === 'Intake Agent' && "🔍 Extracting fitness goals, language preferences, and cultural context..."}
            {agentName === 'Matchmaking Agent' && "🎯 Analyzing trainer compatibility and cultural fit..."}
            {agentName === 'Workout Planning Agent' && "💪 Creating culturally-adapted workout routines..."}
          </p>
        </div>
      )}

      {status === 'complete' && result && (
        <div className="agent-reasoning fade-in">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 mb-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold text-green-700">Analysis Complete</span>
            </div>
            
            {/* Key Insights */}
            {result.insights && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700">🧠 Key Insights:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {result.insights.map((insight, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span className="leading-relaxed">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cultural Considerations */}
            {result.culturalNotes && (
              <div className="cultural-highlight fade-in-delay">
                <p className="text-sm font-semibold text-blue-700 mb-2">🌏 Cultural Adaptations:</p>
                <p className="text-sm text-blue-600 leading-relaxed">{result.culturalNotes}</p>
              </div>
            )}

            {/* Handoff Message */}
            {result.handoff && (
              <div className="mt-4 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg text-sm text-gray-600 border-l-4 border-blue-400">
                <span className="font-semibold text-blue-700">Next Step: </span>
                <span className="leading-relaxed">{result.handoff}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentDisplay;