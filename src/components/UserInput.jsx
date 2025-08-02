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
    "我想减肥但是我的英语不好我住在上海的小公寓里",
    "I want to build muscle but I am a beginner. I prefer working out at home and would like to practice English.",
    "我是学生预算有限想要增强体质和学习健身英语"
  ];

  const handleSampleClick = (sample) => {
    setUserInput(sample);
  };

  return (
    <div className="space-y-4">
      {/* Description */}
      <div className="cultural-highlight mb-6">
        <div className="flex items-start space-x-3">
          <MessageSquare className="h-6 w-6 text-blue-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-blue-900 mb-2">Tell us about your fitness goals</p>
            <p className="text-blue-700 leading-relaxed">
              Write in Chinese or English. Our AI agents will understand your cultural context and preferences to create the perfect fitness plan.
            </p>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="user-input" className="block text-sm font-semibold text-gray-700 mb-3">
            Your Fitness Story
          </label>
          <textarea
            id="user-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Example: I want to lose weight but my English is not good...

Or: 我想减肥但是我的英语不好..."
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all duration-200 text-sm leading-relaxed"
            rows={7}
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={!userInput.trim() || isSubmitting}
          className={`btn-primary w-full ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-3">
              <div className="flex space-x-1">
                <div className="pulse-dot w-2 h-2 bg-white rounded-full"></div>
                <div className="pulse-dot w-2 h-2 bg-white rounded-full"></div>
                <div className="pulse-dot w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>Processing with AI Agents...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Send className="h-5 w-5" />
              <span>Find My Perfect Match</span>
            </div>
          )}
        </button>
      </form>

      {/* Sample Inputs */}
      <div className="space-y-3 mt-6">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Try these examples:</p>
        <div className="space-y-2">
          {sampleInputs.map((sample, index) => (
            <button
              key={index}
              onClick={() => handleSampleClick(sample)}
              className="w-full text-left p-4 text-sm bg-white hover:bg-gray-50 
                       rounded-xl border-2 border-gray-200 hover:border-primary-300 transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary-500 transform hover:scale-[1.02]
                       disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              <div className="leading-relaxed">{sample}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserInput;