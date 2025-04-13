import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

// Initialize the Gemini API with the provided API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Reusing the types from the OpenAI implementation for consistency
export type BatteryDetails = {
  type: string;
  model: string;
  age: number;
  capacity: number;
  condition: string;
};

export type BatteryPriceEstimate = {
  totalPrice: number;
  materialsValue: number;
  reuseValue: number;
  processingFee: number;
  description: string;
};

export async function calculateBatteryPrice(batteryDetails: BatteryDetails): Promise<BatteryPriceEstimate> {
  try {
    // Configure the model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    // Create the prompt with Indian market context
    const prompt = `You are a battery recycling valuation expert in India. Given battery details, calculate a fair market value based on age, condition, and capacity for the Indian market. 
    
    Consider factors such as:
    - Indian recycling regulations and incentives
    - Local market demand for used batteries
    - Recycling infrastructure in India
    - Current lithium-ion battery pricing trends in India
    
    Calculate the recycling value for this battery:
    Type: ${batteryDetails.type}
    Model: ${batteryDetails.model}
    Age: ${batteryDetails.age} years
    Capacity: ${batteryDetails.capacity} kWh
    Condition: ${batteryDetails.condition}
    
    Provide the values in Indian Rupees (₹) in this JSON format:
    {
      "totalPrice": number,
      "materialsValue": number,
      "reuseValue": number,
      "processingFee": number,
      "description": string
    }
    
    The processingFee should be a negative number representing costs.
    Provide a brief description explaining how the value was determined considering the Indian market context.`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON data from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Failed to parse JSON from Gemini response");
      return mockCalculateBatteryPrice(batteryDetails);
    }
    
    const jsonData = JSON.parse(jsonMatch[0]);
    
    return {
      totalPrice: parseFloat(jsonData.totalPrice) || 0,
      materialsValue: parseFloat(jsonData.materialsValue) || 0,
      reuseValue: parseFloat(jsonData.reuseValue) || 0,
      processingFee: parseFloat(jsonData.processingFee) || 0,
      description: jsonData.description || "Pricing based on current Indian market rates and battery condition"
    };
  } catch (error) {
    console.error("Gemini API error:", error);
    // Fallback to mock calculation if API fails
    return mockCalculateBatteryPrice(batteryDetails);
  }
}

// Modified fallback mock calculation with Indian market pricing (in Rupees)
function mockCalculateBatteryPrice(batteryDetails: BatteryDetails): BatteryPriceEstimate {
  // Base price factors (in Indian Rupees)
  let basePrice = 0;
  
  // Battery type factor with Indian market rates
  switch(batteryDetails.type) {
    case 'ev_standard':
      basePrice = 5000; // ₹5,000 base for standard EV batteries
      break;
    case 'ev_premium':
      basePrice = 8000; // ₹8,000 base for premium EV batteries
      break;
    case 'hybrid':
      basePrice = 4000; // ₹4,000 base for hybrid vehicle batteries
      break;
    case 'energy_storage':
      basePrice = 6000; // ₹6,000 base for energy storage batteries
      break;
    case 'other':
      basePrice = 3000; // ₹3,000 base for other li-ion batteries
      break;
    default:
      basePrice = 2500;
  }
  
  // Multiply by capacity
  basePrice *= batteryDetails.capacity;
  
  // Adjust for age - newer batteries are worth more
  const ageFactor = Math.max(0.2, 1 - (batteryDetails.age * 0.1));
  basePrice *= ageFactor;
  
  // Adjust for condition
  let conditionFactor = 0.5;
  switch(batteryDetails.condition) {
    case 'excellent':
      conditionFactor = 1;
      break;
    case 'good':
      conditionFactor = 0.8;
      break;
    case 'fair':
      conditionFactor = 0.6;
      break;
    case 'poor':
      conditionFactor = 0.4;
      break;
    case 'damaged':
      conditionFactor = 0.2;
      break;
  }
  basePrice *= conditionFactor;
  
  // Round to nearest 100 rupees
  const totalPrice = Math.round(basePrice / 100) * 100;
  const materialsValue = Math.round(totalPrice * 0.7);
  const reuseValue = Math.round(totalPrice * 0.5);
  const processingFee = -Math.round(totalPrice * 0.2);
  
  return {
    totalPrice,
    materialsValue,
    reuseValue,
    processingFee,
    description: "Pricing based on current Indian market rates and battery condition. Values are in Indian Rupees (₹)."
  };
}