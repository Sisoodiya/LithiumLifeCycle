import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Truck, Factory, Sun, CheckCircle,
  Battery, FlaskRound, Zap
} from "lucide-react";

const BusinessTabs = () => {
  const [activeTab, setActiveTab] = useState("sell");

  return (
    <Tabs defaultValue="sell" className="w-full" onValueChange={setActiveTab}>
      <div className="bg-gray-50 overflow-hidden sm:rounded-lg">
        <div className="border-b border-gray-200">
          <TabsList className="w-full bg-transparent h-auto">
            <TabsTrigger
              value="sell"
              className={`w-full p-4 text-left font-medium border-r border-gray-200 ${activeTab === 'sell' ? 'text-primary-600 bg-white' : 'text-gray-500 hover:text-gray-700 bg-gray-50'}`}
            >
              Sell Batteries to Us
            </TabsTrigger>
            <TabsTrigger
              value="buy"
              className={`w-full p-4 text-left font-medium ${activeTab === 'buy' ? 'text-primary-600 bg-white' : 'text-gray-500 hover:text-gray-700 bg-gray-50'}`}
            >
              Buy Recycled Batteries
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="sell" className="p-6">
          <div className="md:flex md:space-x-8">
            <div className="md:w-1/2">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Volume Battery Collection</h3>
              <p className="text-gray-600 mb-6">
                We offer specialized solutions for businesses with large quantities of batteries to recycle. Our process is streamlined to handle volume with efficiency.
              </p>

              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary-600 text-white">
                      <Truck className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Fleet Collection</h4>
                    <p className="mt-1 text-sm text-gray-600">Specialized service for electric vehicle fleets and transport companies.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary-600 text-white">
                      <Factory className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Manufacturing Partners</h4>
                    <p className="mt-1 text-sm text-gray-600">Recycling solutions for battery and EV manufacturers.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary-600 text-white">
                      <Sun className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Energy Storage Facilities</h4>
                    <p className="mt-1 text-sm text-gray-600">Solutions for recycling large-scale energy storage batteries.</p>
                  </div>
                </div>
              </div>

              <Button className="mt-8">
                Request Business Quote
              </Button>
            </div>

            <div className="mt-8 md:mt-0 md:w-1/2">
              <Card>
                <CardContent className="px-6 py-8">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Business Advantages</h3>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-secondary-500 mt-1" />
                      </div>
                      <p className="ml-3 text-base text-gray-600">Volume-based pricing with better rates for larger quantities</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-secondary-500 mt-1" />
                      </div>
                      <p className="ml-3 text-base text-gray-600">Dedicated account manager for your recycling program</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-secondary-500 mt-1" />
                      </div>
                      <p className="ml-3 text-base text-gray-600">Compliance documentation and environmental certificates</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-secondary-500 mt-1" />
                      </div>
                      <p className="ml-3 text-base text-gray-600">Custom logistics solutions including on-site collection</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-secondary-500 mt-1" />
                      </div>
                      <p className="ml-3 text-base text-gray-600">Detailed reporting on materials recovered and environmental impact</p>
                    </li>
                  </ul>

                  <div className="mt-8 bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600 italic">
                      "EcoBatt helped us implement a comprehensive recycling program for our EV fleet, reducing disposal costs by 34% while meeting our sustainability goals."
                    </p>
                    <p className="mt-2 text-sm font-medium text-gray-900">— Fleet Manager, GreenTransport Inc.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="buy" className="p-6">
          <div className="md:flex md:space-x-8">
            <div className="md:w-1/2">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Procure Recycled Battery Products</h3>
              <p className="text-gray-600 mb-6">
                Source high-quality recycled batteries and materials for your business needs with complete transparency on sourcing and specifications.
              </p>

              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-secondary-600 text-white">
                      <Battery className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Refurbished Batteries</h4>
                    <p className="mt-1 text-sm text-gray-600">Second-life batteries tested and certified for specific applications.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-secondary-600 text-white">
                      <FlaskRound className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Recovered Materials</h4>
                    <p className="mt-1 text-sm text-gray-600">High-purity recycled lithium, cobalt, nickel and other metals.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-secondary-600 text-white">
                      <Zap className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Energy Storage Solutions</h4>
                    <p className="mt-1 text-sm text-gray-600">Repurposed battery systems for renewable energy storage.</p>
                  </div>
                </div>
              </div>

              <Button className="mt-8 bg-secondary-600 hover:bg-secondary-700">
                Browse Available Products
              </Button>
            </div>

            <div className="mt-8 md:mt-0 md:w-1/2">
              <Card>
                <CardContent className="px-6 py-8">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Quality Assurance</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="text-lg font-medium text-gray-900">Rigorous Testing</h4>
                      <p className="mt-2 text-sm text-gray-600">
                        All batteries undergo comprehensive capacity, voltage, and safety testing before being made available.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="text-lg font-medium text-gray-900">Transparent History</h4>
                      <p className="mt-2 text-sm text-gray-600">
                        Each battery comes with detailed information about its previous use, testing results, and expected lifespan.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="text-lg font-medium text-gray-900">Custom Specifications</h4>
                      <p className="mt-2 text-sm text-gray-600">
                        We can source and prepare batteries to meet your specific requirements and applications.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="text-lg font-medium text-gray-900">Warranty & Support</h4>
                      <p className="mt-2 text-sm text-gray-600">
                        All recycled batteries come with warranties and ongoing technical support.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default BusinessTabs;
