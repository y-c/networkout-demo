import React, { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';

const UserInput = ({ onSubmit }) => {
  const [userInput, setUserInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(userInput);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sampleInputs = [
    "我想减肥，但是我的英语不好，我住在上海的小公寓里。",
    "I want to build muscle but I'm a beginner. I prefer working out at home and would like to practice English.",
    "我是学生，预算有限，想要增强体质和学习健身英语。"
  ];

  const handleSampleClick = (sample) => {
    setUserInput(sample);
  };

  return (
    <div className="space-y-4">
      {/* Description */}
      <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
        <div className="flex items-start space-x-2">
          <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-900">Tell us about your fitness goals</p>
            <p className="text-blue-700 mt-1">
              Write in Chinese or English. Our AI agents will understand your cultural context and preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="user-input" className="block text-sm font-medium text-gray-700 mb-2">
            Your Story
          </label>
          <textarea
            id="user-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="例如：我想减肥，但是我的英语不好... 
            
Or: I want to build muscle but I'm a beginner..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            rows={6}
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={!userInput.trim() || isSubmitting}
          className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg font-medium 
                   hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="flex space-x-1">
                <div className="pulse-dot w-2 h-2 bg-white rounded-full"></div>
                <div className="pulse-dot w-2 h-2 bg-white rounded-full"></div>
                <div className="pulse-dot w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Find My Perfect Match</span>
            </>
          )}
        </button>
      </form>

      {/* Sample Inputs */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Try these examples:</p>
        {sampleInputs.map((sample, index) => (
          <button
            key={index}
            onClick={() => handleSampleClick(sample)}
            className="w-full text-left p-3 text-sm bg-gray-50 hover:bg-gray-100 
                     rounded-md border border-gray-200 transition-colors
                     focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isSubmitting}
          >
            {sample}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserInput;