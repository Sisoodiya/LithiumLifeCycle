import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Landmark, MapPin, Plug } from "lucide-react";

interface Subsidy {
  id: number;
  title: string;
  description: string;
  provider: string;
  category: string;
  state?: string;
  eligibility: string;
  amount?: string;
  link?: string;
  createdAt: string;
}

const SubsidyCards = () => {
  const { data: subsidies, isLoading } = useQuery<Subsidy[]>({
    queryKey: ["/api/subsidies"],
  });

  // Group subsidies by category
  const federalSubsidies = subsidies?.filter(subsidy => subsidy.category === "Federal Incentives") || [];
  const stateSubsidies = subsidies?.filter(subsidy => subsidy.category === "State & Local Programs") || [];
  const utilitySubsidies = subsidies?.filter(subsidy => subsidy.category === "Utility Incentives") || [];

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {/* Federal Subsidies Card */}
      <Card className="overflow-hidden">
        <CardContent className="px-6 py-8">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
              <Landmark className="text-primary-600 h-6 w-6" />
            </div>
            <h3 className="ml-4 text-xl font-medium text-gray-900">Federal Incentives</h3>
          </div>
          
          <div className="mt-6 space-y-4">
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ) : federalSubsidies.length > 0 ? (
              federalSubsidies.map(subsidy => (
                <div key={subsidy.id} className="border-l-4 border-primary-500 pl-4 py-2">
                  <h4 className="text-lg font-medium text-gray-900">{subsidy.title}</h4>
                  <p className="mt-1 text-sm text-gray-600">{subsidy.description}</p>
                  {subsidy.link && (
                    <a href={subsidy.link} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500">
                      Learn more <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No federal incentives found.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* State Programs Card */}
      <Card className="overflow-hidden">
        <CardContent className="px-6 py-8">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-secondary-100 rounded-md p-3">
              <MapPin className="text-secondary-600 h-6 w-6" />
            </div>
            <h3 className="ml-4 text-xl font-medium text-gray-900">State & Local Programs</h3>
          </div>
          
          <div className="mt-6 space-y-4">
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ) : stateSubsidies.length > 0 ? (
              stateSubsidies.map(subsidy => (
                <div key={subsidy.id} className="border-l-4 border-secondary-500 pl-4 py-2">
                  <h4 className="text-lg font-medium text-gray-900">{subsidy.title}</h4>
                  <p className="mt-1 text-sm text-gray-600">{subsidy.description}</p>
                  {subsidy.link && (
                    <a href={subsidy.link} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center text-sm font-medium text-secondary-600 hover:text-secondary-500">
                      Learn more <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No state programs found.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Utility Programs Card */}
      <Card className="overflow-hidden">
        <CardContent className="px-6 py-8">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-accent-100 rounded-md p-3">
              <Plug className="text-accent-600 h-6 w-6" />
            </div>
            <h3 className="ml-4 text-xl font-medium text-gray-900">Utility Incentives</h3>
          </div>
          
          <div className="mt-6 space-y-4">
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ) : utilitySubsidies.length > 0 ? (
              utilitySubsidies.map(subsidy => (
                <div key={subsidy.id} className="border-l-4 border-accent-500 pl-4 py-2">
                  <h4 className="text-lg font-medium text-gray-900">{subsidy.title}</h4>
                  <p className="mt-1 text-sm text-gray-600">{subsidy.description}</p>
                  {subsidy.link && (
                    <a href={subsidy.link} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center text-sm font-medium text-accent-600 hover:text-accent-500">
                      Learn more <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No utility incentives found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubsidyCards;
