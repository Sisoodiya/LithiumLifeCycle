import { useState } from "react";
import { BatteryPricing } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Battery, CircleAlert } from "lucide-react";

type PriceEstimateDisplayProps = {
  batteryDetails: BatteryPricing | null;
  priceEstimate: any;
  isCalculating: boolean;
};

const PriceEstimateDisplay = ({ batteryDetails, priceEstimate, isCalculating }: PriceEstimateDisplayProps) => {
  const [logisticsMethod, setLogisticsMethod] = useState<string>("pickup");

  // Determine if we should show the waiting state
  const showWaiting = !priceEstimate && !isCalculating;
  
  // Determine if we should show the loading state
  const showLoading = isCalculating;
  
  // Determine if we should show the results
  const showResults = priceEstimate && !isCalculating;

  // Format currency
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        {/* Waiting for Input State */}
        {showWaiting && (
          <div className="text-center py-10">
            <Battery className="mx-auto text-gray-400 h-16 w-16 mb-4" />
            <p className="text-gray-500">Fill out the form to get your battery price estimate</p>
          </div>
        )}

        {/* Loading State */}
        {showLoading && (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-700 mx-auto mb-4"></div>
            <p className="text-gray-500">Calculating your battery's value...</p>
          </div>
        )}

        {/* Results State */}
        {showResults && (
          <div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-gray-900">Estimated Value</h4>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                    AI Calculated
                  </span>
                </div>
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {formatCurrency(priceEstimate.totalPrice)}
                </div>
                <p className="text-sm text-gray-500">{priceEstimate.description}</p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Materials Value</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(priceEstimate.materialsValue)}
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Reuse Potential</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(priceEstimate.reuseValue)}
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Processing Fee</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(priceEstimate.processingFee)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Logistics Options - Only show if we have results */}
      {showResults && (
        <div className="mt-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">How would you like to proceed?</h4>
          
          <RadioGroup value={logisticsMethod} onValueChange={setLogisticsMethod} className="space-y-4">
            <div className={`bg-white rounded-lg border ${logisticsMethod === "pickup" ? "border-primary-500" : "border-gray-200"} p-4 hover:border-primary-500 cursor-pointer transition-colors`}>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <RadioGroupItem value="pickup" id="pickup-option" />
                </div>
                <div className="ml-3">
                  <Label htmlFor="pickup-option" className="font-medium text-gray-700">Schedule a Pickup</Label>
                  <p className="text-gray-500 text-sm">We'll come to your location to collect the battery</p>
                </div>
              </div>
            </div>
            
            <div className={`bg-white rounded-lg border ${logisticsMethod === "dropoff" ? "border-primary-500" : "border-gray-200"} p-4 hover:border-primary-500 cursor-pointer transition-colors`}>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <RadioGroupItem value="dropoff" id="dropoff-option" />
                </div>
                <div className="ml-3">
                  <Label htmlFor="dropoff-option" className="font-medium text-gray-700">Drop-off at Center</Label>
                  <p className="text-gray-500 text-sm">Bring your battery to one of our recycling centers</p>
                </div>
              </div>
            </div>
          </RadioGroup>

          <Button className="mt-6 w-full bg-accent-500 hover:bg-accent-600">
            Continue to Scheduling
          </Button>
        </div>
      )}

      {/* Error State - if needed */}
      {false && (
        <div className="text-center py-10">
          <CircleAlert className="mx-auto text-red-500 h-16 w-16 mb-4" />
          <p className="text-gray-800 font-medium">Something went wrong</p>
          <p className="text-gray-500 mt-2">We couldn't calculate your battery value. Please try again.</p>
        </div>
      )}
    </div>
  );
};

export default PriceEstimateDisplay;
