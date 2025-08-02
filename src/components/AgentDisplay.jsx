import React from 'react';
import { Brain, CheckCircle, Clock, Loader } from 'lucide-react';

const AgentDisplay = ({ agentName, status, description, result }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'analyzing':
        return <Loader className="h-5 w-5 text-warning-500 animate-spin" />;
      case 'complete':
        return <CheckCircle className="h-5 w-5 text-success-500" />;
      case 'waiting':
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'analyzing':
        return 'border-warning-200 bg-warning-50';
      case 'complete':
        return 'border-success-200 bg-success-50';
      case 'waiting':
      default:
        return 'border-gray-200 bg-gray-50';
    }
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

  return (
    <div className={`agent-card border-2 ${getStatusColor()} transition-all duration-300`}>
      {/* Agent Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-100 p-2 rounded-lg">
            <Brain className="h-4 w-4 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{agentName}</h3>
            <p className="text-xs text-gray-600">{description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`text-sm font-medium ${
            status === 'analyzing' ? 'agent-status-analyzing' :
            status === 'complete' ? 'agent-status-complete' : 
            'text-gray-500'
          }`}>
            {getStatusText()}
          </span>
        </div>
      </div>

      {/* Agent Reasoning/Results */}
      {status === 'analyzing' && (
        <div className="agent-reasoning fade-in">
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex space-x-1">
              <div className="pulse-dot w-1.5 h-1.5 bg-warning-500 rounded-full"></div>
              <div className="pulse-dot w-1.5 h-1.5 bg-warning-500 rounded-full"></div>
              <div className="pulse-dot w-1.5 h-1.5 bg-warning-500 rounded-full"></div>
            </div>
            <span className="text-sm font-medium text-warning-700">Processing...</span>
          </div>
          <p className="text-xs text-gray-600">
            {agentName === 'Intake Agent' && "Extracting fitness goals, language preferences, and cultural context..."}
            {agentName === 'Matchmaking Agent' && "Analyzing trainer compatibility and cultural fit..."}
            {agentName === 'Workout Planning Agent' && "Creating culturally-adapted workout routines..."}
          </p>
        </div>
      )}

      {status === 'complete' && result && (
        <div className="agent-reasoning fade-in">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-4 w-4 text-success-600" />
              <span className="text-sm font-medium text-success-700">Analysis Complete</span>
            </div>
            
            {/* Key Insights */}
            {result.insights && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-700">Key Insights:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {result.insights.map((insight, index) => (
                    <li key={index} className="flex items-start space-x-1">
                      <span className="text-primary-500 mt-1">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cultural Considerations */}
            {result.culturalNotes && (
              <div className="cultural-highlight mt-3">
                <p className="text-xs font-medium text-blue-700 mb-1">Cultural Adaptations:</p>
                <p className="text-xs text-blue-600">{result.culturalNotes}</p>
              </div>
            )}

            {/* Handoff Message */}
            {result.handoff && (
              <div className="mt-3 p-2 bg-gray-100 rounded text-xs text-gray-600 border-l-2 border-primary-400">
                <span className="font-medium">Next: </span>{result.handoff}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentDisplay;