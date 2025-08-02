// API utility - Mock version for demo without OpenAI key

// Simulate API delay for better UX
export const simulateDelay = (ms = 2000) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  
  // Mock function to simulate OpenAI calls (for demo purposes)
  export const callOpenAI = async (systemPrompt, userInput, temperature = 0.7) => {
    console.log('Mock OpenAI call:', { systemPrompt: systemPrompt.slice(0, 100) + '...', userInput });
    
    // Simulate network delay
    await simulateDelay(1500);
    
    // Return mock response - in real implementation this would be from OpenAI
    return `{
      "mockResponse": true,
      "message": "This is a mock response for demo purposes. The actual implementation would use OpenAI API."
    }`;
  };
  
  // Function to parse JSON response from AI with fallback
  export const parseAIResponse = (response) => {
    try {
      // Try to find JSON in the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // If no JSON found, return a structured fallback
      return {
        error: "Could not parse AI response",
        rawResponse: response
      };
    } catch (error) {
      console.error('JSON Parse Error:', error);
      return {
        error: "Invalid JSON response", 
        rawResponse: response
      };
    }
  };
  
  // Demo configuration
  export const DEMO_MODE = true;
  export const DEMO_MESSAGE = "🎬 Demo Mode: Using intelligent mock data (OpenAI integration ready)";