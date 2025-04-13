import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/queryClient";

type FinderProps = {
  entityType: string;
  state: string;
  incentiveType: string;
};

const SubsidyFinder = () => {
  const [finderParams, setFinderParams] = useState<FinderProps>({
    entityType: "Individual",
    state: "",
    incentiveType: ""
  });
  const [hasSearched, setHasSearched] = useState(false);

  const { data: subsidies, isLoading, refetch } = useQuery({
    queryKey: ["/api/subsidies", finderParams.state, finderParams.incentiveType],
    enabled: false
  });

  const states = [
    "California", "New York", "Texas", "Florida", "Illinois", 
    "Pennsylvania", "Ohio", "Michigan", "Georgia", "North Carolina", 
    "New Jersey", "Virginia", "Washington", "Arizona", "Massachusetts",
    "Tennessee", "Indiana", "Missouri", "Maryland", "Wisconsin"
  ];

  const incentiveTypes = [
    { value: "", label: "All incentives" },
    { value: "Tax credits", label: "Tax credits" },
    { value: "Rebates", label: "Rebates" },
    { value: "Grants", label: "Grants" },
    { value: "Low-interest loans", label: "Low-interest loans" }
  ];

  const entityTypes = [
    "Individual", "Business", "Non-profit organization", "Government entity"
  ];

  const handleFindIncentives = async () => {
    setHasSearched(true);
    refetch();
  };

  return (
    <div className="mt-12">
      <Card className="overflow-hidden">
        <CardContent className="px-6 py-8">
          <h3 className="text-xl font-medium text-gray-900 mb-6">Find Available Incentives In Your Area</h3>
          
          <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <Label htmlFor="entity-type" className="block text-sm font-medium text-gray-700 mb-1">I am a:</Label>
              <Select
                value={finderParams.entityType}
                onValueChange={(value) => setFinderParams({...finderParams, entityType: value})}
              >
                <SelectTrigger id="entity-type">
                  <SelectValue placeholder="Select entity type" />
                </SelectTrigger>
                <SelectContent>
                  {entityTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State:</Label>
              <Select
                value={finderParams.state}
                onValueChange={(value) => setFinderParams({...finderParams, state: value})}
              >
                <SelectTrigger id="state">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All states</SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Label htmlFor="incentive-type" className="block text-sm font-medium text-gray-700 mb-1">Incentive type:</Label>
              <Select
                value={finderParams.incentiveType}
                onValueChange={(value) => setFinderParams({...finderParams, incentiveType: value})}
              >
                <SelectTrigger id="incentive-type">
                  <SelectValue placeholder="Select incentive type" />
                </SelectTrigger>
                <SelectContent>
                  {incentiveTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={handleFindIncentives}
                className="w-full"
              >
                Find Incentives
              </Button>
            </div>
          </div>

          {/* Results Section */}
          {hasSearched && (
            <div className="mt-8">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Searching for incentives...</p>
                </div>
              ) : subsidies && subsidies.length > 0 ? (
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                    Found {subsidies.length} incentives matching your criteria
                  </h4>
                  <div className="space-y-4">
                    {subsidies.map((subsidy: any) => (
                      <div key={subsidy.id} className="bg-white p-4 rounded-lg border border-gray-200">
                        <h5 className="text-md font-medium text-gray-900">{subsidy.title}</h5>
                        <p className="mt-1 text-sm text-gray-600">{subsidy.description}</p>
                        {subsidy.amount && (
                          <p className="mt-2 text-sm font-medium text-primary-600">Amount: {subsidy.amount}</p>
                        )}
                        <p className="mt-1 text-sm text-gray-500">Eligibility: {subsidy.eligibility}</p>
                        {subsidy.link && (
                          <a 
                            href={subsidy.link} 
                            target="_blank" 
                            rel="noreferrer"
                            className="mt-2 inline-block text-sm font-medium text-primary-600 hover:text-primary-500"
                          >
                            Learn more
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">No incentives found matching your criteria.</p>
                  <p className="mt-2 text-sm text-gray-500">Try adjusting your search parameters or contact us for personalized assistance.</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SubsidyFinder;
