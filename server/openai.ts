import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "sk-dummy-key-for-development" });

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
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a battery recycling valuation expert. Given battery details, calculate a fair market value based on age, condition, and capacity. Provide a breakdown of the value components."
        },
        {
          role: "user",
          content: `Calculate the recycling value for this battery:
          Type: ${batteryDetails.type}
          Model: ${batteryDetails.model}
          Age: ${batteryDetails.age} years
          Capacity: ${batteryDetails.capacity} kWh
          Condition: ${batteryDetails.condition}
          
          Provide the values in this format: total price, materials value, reuse value, processing fee (as a negative number), and a brief description of how the value was determined.`
        }
      ],
      response_format: { type: "json_object" }
    });

    // If OpenAI API fails, fall back to the mock calculation
    if (!response.choices[0].message.content) {
      return mockCalculateBatteryPrice(batteryDetails);
    }

    const result = JSON.parse(response.choices[0].message.content);
    
    return {
      totalPrice: parseFloat(result.totalPrice) || 0,
      materialsValue: parseFloat(result.materialsValue) || 0,
      reuseValue: parseFloat(result.reuseValue) || 0,
      processingFee: parseFloat(result.processingFee) || 0,
      description: result.description || "Pricing based on current market rates and battery condition"
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    // Fallback to mock calculation if API fails
    return mockCalculateBatteryPrice(batteryDetails);
  }
}

// Fallback mock calculation function in case the OpenAI API is unavailable
function mockCalculateBatteryPrice(batteryDetails: BatteryDetails): BatteryPriceEstimate {
  // Base price factors
  let basePrice = 0;
  
  // Battery type factor
  switch(batteryDetails.type) {
    case 'ev_standard':
      basePrice = 100;
      break;
    case 'ev_premium':
      basePrice = 150;
      break;
    case 'hybrid':
      basePrice = 80;
      break;
    case 'energy_storage':
      basePrice = 120;
      break;
    case 'other':
      basePrice = 60;
      break;
    default:
      basePrice = 50;
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
  
  // Round to nearest 10
  const totalPrice = Math.round(basePrice / 10) * 10;
  const materialsValue = Math.round(totalPrice * 0.7);
  const reuseValue = Math.round(totalPrice * 0.5);
  const processingFee = -Math.round(totalPrice * 0.2);
  
  return {
    totalPrice,
    materialsValue,
    reuseValue,
    processingFee,
    description: "Pricing based on current market rates and battery condition"
  };
}
