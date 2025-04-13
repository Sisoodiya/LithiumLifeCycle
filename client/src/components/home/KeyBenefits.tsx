import { Recycle, DollarSign, Globe } from "lucide-react";

const KeyBenefits = () => {
  return (
    <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Why Battery Recycling Matters</h2>
        <p className="mt-4 text-lg text-gray-600">
          Our comprehensive approach to lithium-ion battery recycling delivers multiple benefits.
        </p>
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Benefit 1 */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
              <Recycle className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900 text-center">Sustainable Resource Recovery</h3>
            <p className="mt-2 text-base text-gray-600 text-center">
              We extract valuable materials like lithium, cobalt, and nickel for reuse in new batteries.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary-600 text-white">
              <DollarSign className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900 text-center">Economic Value</h3>
            <p className="mt-2 text-base text-gray-600 text-center">
              Get fair compensation for your used batteries while contributing to the circular economy.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent-600 text-white">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900 text-center">Environmental Protection</h3>
            <p className="mt-2 text-base text-gray-600 text-center">
              Prevent hazardous materials from entering landfills and reduce the need for new mining operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyBenefits;
