import { useQuery } from "@tanstack/react-query";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, Leaf, Battery
} from "lucide-react";

interface Analytics {
  id: number;
  name: string;
  value: number;
  unit: string;
  category: string;
  data: any;
  createdAt: string;
}

const MarketAnalytics = () => {
  const { data: analyticsData, isLoading } = useQuery<Analytics[]>({
    queryKey: ["/api/analytics"],
  });

  // Find specific analytics by category
  const growthAnalytics = analyticsData?.find(item => item.category === "growth");
  const environmentAnalytics = analyticsData?.find(item => item.category === "environment");
  const materialsAnalytics = analyticsData?.find(item => item.category === "materials");

  // Define chart colors
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6b7280'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">EV Market Gap Analytics</h2>
        <p className="mt-4 text-lg text-gray-600">
          Our data shows the growing demand for EV battery recycling solutions across markets.
        </p>
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Market Stat Card 1 */}
            <Card className="bg-gray-50 border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                    <TrendingUp className="text-primary-600 h-5 w-5" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">Annual Growth</h3>
                    <div className="mt-1 text-3xl font-semibold text-primary-600">
                      {isLoading ? "Loading..." : `+${growthAnalytics?.value}${growthAnalytics?.unit}`}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">In battery recycling demand</p>
                  </div>
                </div>
                {/* Line Chart */}
                <div className="h-32 mt-4 bg-white rounded border border-gray-200">
                  {isLoading ? (
                    <div className="h-full flex items-center justify-center text-gray-400">Loading chart...</div>
                  ) : growthAnalytics?.data ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={growthAnalytics.data.years.map((year: string, index: number) => ({
                        year,
                        growth: growthAnalytics.data.values[index]
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="growth" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">No data available</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Market Stat Card 2 */}
            <Card className="bg-gray-50 border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-secondary-100 rounded-md p-3">
                    <Leaf className="text-secondary-600 h-5 w-5" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">CO₂ Reduction</h3>
                    <div className="mt-1 text-3xl font-semibold text-secondary-600">
                      {isLoading ? "Loading..." : `${(environmentAnalytics?.value / 1000)}K ${environmentAnalytics?.unit}`}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Estimated annual impact</p>
                  </div>
                </div>
                {/* Bar Chart */}
                <div className="h-32 mt-4 bg-white rounded border border-gray-200">
                  {isLoading ? (
                    <div className="h-full flex items-center justify-center text-gray-400">Loading chart...</div>
                  ) : environmentAnalytics?.data ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={environmentAnalytics.data.batteryTypes.map((type: string, index: number) => ({
                        type,
                        value: environmentAnalytics.data.values[index]
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" tick={{ fontSize: 8 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">No data available</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Market Stat Card 3 */}
            <Card className="bg-gray-50 border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-accent-100 rounded-md p-3">
                    <Battery className="text-accent-600 h-5 w-5" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">Materials Recovered</h3>
                    <div className="mt-1 text-3xl font-semibold text-accent-600">
                      {isLoading ? "Loading..." : `${(materialsAnalytics?.value / 1000).toFixed(1)}K ${materialsAnalytics?.unit}`}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Lithium, cobalt, nickel, etc.</p>
                  </div>
                </div>
                {/* Pie Chart */}
                <div className="h-32 mt-4 bg-white rounded border border-gray-200">
                  {isLoading ? (
                    <div className="h-full flex items-center justify-center text-gray-400">Loading chart...</div>
                  ) : materialsAnalytics?.data ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={materialsAnalytics.data.materials.map((material: string, index: number) => ({
                            name: material,
                            value: materialsAnalytics.data.values[index]
                          }))}
                          cx="50%"
                          cy="50%"
                          outerRadius={40}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name }) => name}
                          labelLine={false}
                        >
                          {materialsAnalytics.data.materials.map((entry: string, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">No data available</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chart Section */}
          <div className="mt-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">EV Battery Lifecycle Market Analysis</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="px-3 py-1 text-gray-600 hover:bg-gray-200">1Y</Button>
                  <Button variant="outline" size="sm" className="px-3 py-1 bg-primary-100 text-primary-600 font-medium">3Y</Button>
                  <Button variant="outline" size="sm" className="px-3 py-1 text-gray-600 hover:bg-gray-200">5Y</Button>
                  <Button variant="outline" size="sm" className="px-3 py-1 text-gray-600 hover:bg-gray-200">All</Button>
                </div>
              </div>
              {/* Large Chart */}
              <div className="h-80 bg-gray-50 rounded border border-gray-200">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center text-gray-400">Loading chart...</div>
                ) : growthAnalytics?.data ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { year: "2020", demand: 100, supply: 60, gap: 40, recyclingCapacity: 30 },
                        { year: "2021", demand: 130, supply: 75, gap: 55, recyclingCapacity: 45 },
                        { year: "2022", demand: 170, supply: 90, gap: 80, recyclingCapacity: 65 },
                        { year: "2023", demand: 220, supply: 120, gap: 100, recyclingCapacity: 90 },
                        { year: "2024", demand: 280, supply: 160, gap: 120, recyclingCapacity: 130 },
                        { year: "2025", demand: 350, supply: 200, gap: 150, recyclingCapacity: 180 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="demand" stroke="#3b82f6" strokeWidth={2} name="Battery Demand" />
                      <Line type="monotone" dataKey="supply" stroke="#10b981" strokeWidth={2} name="Supply (New Production)" />
                      <Line type="monotone" dataKey="gap" stroke="#f59e0b" strokeWidth={2} name="Supply Gap" />
                      <Line type="monotone" dataKey="recyclingCapacity" stroke="#8b5cf6" strokeWidth={2} name="Recycling Capacity" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">No data available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalytics;
