import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "your-api-key-here" });

// Calculate battery price based on its details
export async function calculateBatteryPrice(
  batteryType: string,
  manufacturer: string,
  modelNumber: string,
  batteryAge: number,
  capacity: number,
  condition: string
): Promise<{
  estimatedPrice: number;
  breakdown: {
    baseMaterialValue: number;
    conditionAdjustment: number;
    ageDepreciation: number;
  };
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: 
            "You are an expert in lithium-ion battery valuation. Based on the battery details, calculate a fair market price and provide a breakdown of how you arrived at that price. Return only a JSON object in this format: { 'estimatedPrice': number, 'breakdown': { 'baseMaterialValue': number, 'conditionAdjustment': number, 'ageDepreciation': number } }"
        },
        {
          role: "user",
          content: `Calculate the price for this battery:
            - Type: ${batteryType}
            - Manufacturer: ${manufacturer}
            - Model Number: ${modelNumber}
            - Age (years): ${batteryAge}
            - Capacity (kWh): ${capacity}
            - Condition: ${condition}
            
            Consider current market rates for recycled batteries, the condition impact, and age depreciation. Return only the JSON object.`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.5,
    });

    const result = JSON.parse(response.choices[0].message.content);
    
    return {
      estimatedPrice: Math.round(result.estimatedPrice * 100) / 100,
      breakdown: {
        baseMaterialValue: Math.round(result.breakdown.baseMaterialValue * 100) / 100,
        conditionAdjustment: Math.round(result.breakdown.conditionAdjustment * 100) / 100,
        ageDepreciation: Math.round(result.breakdown.ageDepreciation * 100) / 100,
      }
    };
  } catch (error) {
    console.error("Error calculating battery price:", error);
    // Fallback to a simple calculation method if OpenAI fails
    const baseMaterialValue = capacity * 50; // $50 per kWh as base value
    
    let conditionFactor = 1.0;
    switch (condition) {
      case "excellent":
        conditionFactor = 1.2;
        break;
      case "good":
        conditionFactor = 1.0;
        break;
      case "fair":
        conditionFactor = 0.7;
        break;
      case "poor":
        conditionFactor = 0.4;
        break;
      default:
        conditionFactor = 0.8;
    }
    
    const ageFactor = Math.max(0.1, 1 - (batteryAge * 0.1)); // 10% depreciation per year
    
    const baseMaterialValueRounded = Math.round(baseMaterialValue);
    const conditionAdjustment = Math.round((conditionFactor - 1) * baseMaterialValue);
    const ageDepreciation = Math.round((1 - ageFactor) * baseMaterialValue * -1);
    const estimatedPrice = Math.max(0, baseMaterialValueRounded + conditionAdjustment + ageDepreciation);
    
    return {
      estimatedPrice,
      breakdown: {
        baseMaterialValue: baseMaterialValueRounded,
        conditionAdjustment,
        ageDepreciation,
      }
    };
  }
}
