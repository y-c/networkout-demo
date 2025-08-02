import React, { useState } from 'react';
import { Brain, Users, Dumbbell } from 'lucide-react';
import UserInput from './components/UserInput';
import AgentDisplay from './components/AgentDisplay';
import Results from './components/Results';

function App() {
  const [currentStep, setCurrentStep] = useState('input');
  const [userProfile, setUserProfile] = useState(null);
  const [agentResults, setAgentResults] = useState({
    intake: null,
    matching: null,
    planning: null
  });

  const handleUserSubmit = (inputData) => {
    setCurrentStep('processing');
    // This will trigger the agent workflow
    processWithAgents(inputData);
  };

  const processWithAgents = async (inputData) => {
    console.log('Processing with agents:', inputData);
    
    try {
      // Step 1: Intake Agent
      console.log('Setting intake status to analyzing...');
      setAgentResults(prev => ({
        ...prev,
        intake: { status: 'analyzing' }
      }));
      
      const { processIntakeAgent } = await import('./agents/intake-agent');
      console.log('Calling intake agent...');
      const intakeResult = await processIntakeAgent(inputData);
      console.log('Intake result received:', intakeResult);
      
      setUserProfile(intakeResult);
      setAgentResults(prev => {
        const newResults = {
          ...prev,
          intake: {
            status: 'complete',
            ...intakeResult
          }
        };
        console.log('Setting new agent results:', newResults);
        return newResults;
      });
      
      console.log('Intake complete, starting matchmaking...');
      
      // Step 2: Matchmaking Agent
      setAgentResults(prev => ({
        ...prev,
        matching: { status: 'analyzing' }
      }));
      
      const { processMatchmakingAgent } = await import('./agents/matchmaking-agent');
      console.log('Calling matchmaking agent...');
      const matchingResult = await processMatchmakingAgent(intakeResult);
      console.log('Matching result received:', matchingResult);
      
      setAgentResults(prev => ({
        ...prev,
        matching: {
          status: 'complete',
          ...matchingResult
        }
      }));
      
      console.log('Matchmaking complete, starting workout planning...');
      
      // Step 3: Workout Planning Agent
      setAgentResults(prev => ({
        ...prev,
        planning: { status: 'analyzing' }
      }));
      
      const { processWorkoutPlanningAgent } = await import('./agents/workout-planning-agent');
      console.log('Calling workout planning agent...');
      const planningResult = await processWorkoutPlanningAgent(intakeResult, matchingResult);
      console.log('Planning result received:', planningResult);
      
      setAgentResults(prev => ({
        ...prev,
        planning: {
          status: 'complete',
          ...planningResult
        }
      }));
      
      console.log('All agents complete!', planningResult);
      
    } catch (error) {
      console.error('Agent processing failed:', error);
      setCurrentStep('input');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg relative">
                  {/* Letter N with dumbbell diagonal */}
                  <div className="relative w-8 h-8">
                    {/* Left vertical stroke */}
                    <div className="absolute left-0 top-0 w-1 h-8 bg-white rounded"></div>
                    {/* Right vertical stroke */}
                    <div className="absolute right-0 top-0 w-1 h-8 bg-white rounded"></div>
                    {/* Dumbbell diagonal - bar */}
                    <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-white rounded transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                    {/* Dumbbell weights - positioned at ends of the diagonal bar */}
                    <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute right-1 bottom-1 w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h1 className="logo-text">Networkout</h1>
                  <p className="text-sm text-gray-600 font-medium">AI-Powered Cross-Cultural Fitness</p>
                </div>
              </div>
            </div>
            
            {/* Status indicators */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${agentResults.intake?.status === 'complete' ? 'bg-green-500' : agentResults.intake?.status === 'analyzing' ? 'bg-amber-500 animate-pulse' : 'bg-gray-300'}`}></div>
                <span className="text-sm font-medium text-gray-600">Intake</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${agentResults.matching?.status === 'complete' ? 'bg-green-500' : agentResults.matching?.status === 'analyzing' ? 'bg-amber-500 animate-pulse' : 'bg-gray-300'}`}></div>
                <span className="text-sm font-medium text-gray-600">Matching</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${agentResults.planning?.status === 'complete' ? 'bg-green-500' : agentResults.planning?.status === 'analyzing' ? 'bg-amber-500 animate-pulse' : 'bg-gray-300'}`}></div>
                <span className="text-sm font-medium text-gray-600">Planning</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Panel - User Input */}
          <div className="lg:col-span-1">
            <div className="agent-card sticky top-8 border-2 border-primary-200">
              <div className="flex items-center space-x-3 mb-6">
                <div className="gradient-primary p-2 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Your Fitness Goals</h2>
              </div>
              <UserInput onSubmit={handleUserSubmit} />
            </div>
          </div>

          {/* Center Panel - Agent Processing */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-8">
                <div className="gradient-primary p-2 rounded-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">AI Agent Processing</h2>
              </div>
              
              <AgentDisplay 
                agentName="Intake Agent"
                status={agentResults.intake?.status || 'waiting'}
                description="Analyzing your profile and extracting key requirements"
                result={agentResults.intake?.status === 'complete' ? agentResults.intake : null}
              />
              
              <AgentDisplay 
                agentName="Matchmaking Agent"
                status={agentResults.matching?.status || 'waiting'}
                description="Finding compatible trainers with cultural awareness"
                result={agentResults.matching?.status === 'complete' ? agentResults.matching : null}
              />
              
              <AgentDisplay 
                agentName="Workout Planning Agent"
                status={agentResults.planning?.status || 'waiting'}
                description="Creating culturally-adapted workout plans"
                result={agentResults.planning?.status === 'complete' ? agentResults.planning : null}
              />
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-1">
            <div className="agent-card sticky top-8 border-2 border-success-200">
              <div className="flex items-center space-x-3 mb-6">
                <div className="gradient-success p-2 rounded-lg">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Your Personalized Match</h2>
              </div>
              <Results results={agentResults} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
              {/* Small N with dumbbell diagonal */}
              <div className="relative w-5 h-5">
                <div className="absolute left-0 top-0 w-0.5 h-5 bg-white rounded"></div>
                <div className="absolute right-0 top-0 w-0.5 h-5 bg-white rounded"></div>
                <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-white rounded transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                <div className="absolute left-0.5 top-0.5 w-1 h-1 bg-white rounded-full"></div>
                <div className="absolute right-0.5 bottom-0.5 w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
            <p className="text-lg font-semibold text-gray-700">Hackathon Demo: Agentic Workflows Track</p>
          </div>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Built with autonomous agents that think, act, and execute. Demonstrating AI-powered cross-cultural fitness networking with intelligent cultural adaptations.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;