import BatteryPricingForm from "../components/battery/BatteryPricingForm";
import PriceEstimateDisplay from "../components/battery/PriceEstimateDisplay";
import { useState } from "react";
import { BatteryPricing } from "@shared/schema";

const SellBattery = () => {
  const [batteryDetails, setBatteryDetails] = useState<BatteryPricing | null>(null);
  const [priceEstimate, setPriceEstimate] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Sell Your Battery</h2>
          <p className="mt-4 text-lg text-gray-600">
            Get an instant AI-powered price estimate for your used lithium-ion battery.
          </p>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Form Section */}
            <div className="md:w-1/2 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Battery Details</h3>
              <BatteryPricingForm 
                onCalculatePrice={(details, estimate) => {
                  setBatteryDetails(details);
                  setPriceEstimate(estimate);
                }}
                isCalculating={isCalculating}
                setIsCalculating={setIsCalculating}
              />
            </div>

            {/* Price Estimate Section */}
            <div className="md:w-1/2 bg-gray-50 p-8 border-t md:border-t-0 md:border-l border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Estimate</h3>
              <PriceEstimateDisplay 
                batteryDetails={batteryDetails}
                priceEstimate={priceEstimate}
                isCalculating={isCalculating}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellBattery;
