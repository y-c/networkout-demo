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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-500 p-2 rounded-lg">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Networkout</h1>
              <p className="text-sm text-gray-600">AI-Powered Cross-Cultural Fitness Networking</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Panel - User Input */}
          <div className="lg:col-span-1">
            <div className="agent-card sticky top-8">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="h-5 w-5 text-primary-500" />
                <h2 className="text-lg font-semibold">Your Fitness Goals</h2>
              </div>
              <UserInput onSubmit={handleUserSubmit} />
            </div>
          </div>

          {/* Center Panel - Agent Processing */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <Brain className="h-5 w-5 text-primary-500" />
                <h2 className="text-lg font-semibold">AI Agent Processing</h2>
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
            <div className="agent-card sticky top-8">
              <h2 className="text-lg font-semibold mb-4">Your Personalized Match</h2>
              <Results results={agentResults} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          <p>🤖 Hackathon Demo: Agentic Workflows Track</p>
          <p className="mt-1">Built with autonomous agents that think, act, and execute</p>
        </div>
      </footer>
    </div>
  );
}

export default App;