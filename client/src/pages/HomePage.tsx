import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Truck,
  Recycle,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Chart from "chart.js/auto";

interface MarketData {
  id: number;
  dataType: string;
  value: number;
  unit: string;
  change: number;
  year: number;
}

interface ChartData {
  id: number;
  chartType: string;
  data: any;
}

export default function HomePage() {
  const marketGapChartRef = useRef<HTMLCanvasElement>(null);
  const recoveryRatesChartRef = useRef<HTMLCanvasElement>(null);
  const marketGapChartInstance = useRef<Chart | null>(null);
  const recoveryRatesChartInstance = useRef<Chart | null>(null);

  const { data: marketData, isLoading: marketDataLoading } = useQuery<MarketData[]>({
    queryKey: ["/api/market-data"],
  });

  const { data: marketGapData, isLoading: marketGapLoading } = useQuery<ChartData>({
    queryKey: ["/api/chart-data/market_gap"],
  });

  const { data: recoveryRatesData, isLoading: recoveryRatesLoading } = useQuery<ChartData>({
    queryKey: ["/api/chart-data/recovery_rates"],
  });

  // Create the charts when data is loaded
  useEffect(() => {
    if (marketGapData && marketGapChartRef.current) {
      // Destroy existing chart if it exists
      if (marketGapChartInstance.current) {
        marketGapChartInstance.current.destroy();
      }
      
      const ctx = marketGapChartRef.current.getContext("2d");
      if (ctx) {
        marketGapChartInstance.current = new Chart(ctx, {
          type: 'line',
          data: marketGapData.data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Volume (thousands of units)'
                }
              }
            }
          }
        });
      }
    }

    if (recoveryRatesData && recoveryRatesChartRef.current) {
      // Destroy existing chart if it exists
      if (recoveryRatesChartInstance.current) {
        recoveryRatesChartInstance.current.destroy();
      }
      
      const ctx = recoveryRatesChartRef.current.getContext("2d");
      if (ctx) {
        recoveryRatesChartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: recoveryRatesData.data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                title: {
                  display: true,
                  text: 'Recovery Rate (%)'
                }
              }
            }
          }
        });
      }
    }

    // Cleanup function
    return () => {
      if (marketGapChartInstance.current) {
        marketGapChartInstance.current.destroy();
      }
      if (recoveryRatesChartInstance.current) {
        recoveryRatesChartInstance.current.destroy();
      }
    };
  }, [marketGapData, recoveryRatesData]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="lg:flex items-center justify-between">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-4xl font-bold font-heading text-gray-900 mb-4">
              Revolutionizing Lithium-ion <span className="text-primary">Battery Recycling</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Join our sustainable ecosystem for recycling, selling, and buying EV batteries. 
              We're closing the loop on the EV battery lifecycle with AI-powered solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/sell">Sell Your Battery</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/marketplace">Visit Marketplace</Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1593941707882-a5bba53b0998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="EV battery recycling illustration" 
              className="rounded-lg shadow-lg object-cover w-full h-80"
            />
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">EV Market Gap Analytics</h2>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {marketDataLoading ? (
              <>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-10 w-[120px]" />
                      <Skeleton className="h-2 w-full mt-4" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-10 w-[120px]" />
                      <Skeleton className="h-2 w-full mt-4" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-10 w-[120px]" />
                      <Skeleton className="h-2 w-full mt-4" />
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              marketData?.map(item => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {item.dataType === "recycled_batteries"
                            ? "Recycled Batteries"
                            : item.dataType === "market_value"
                            ? "Market Value"
                            : "Resource Recovery"}
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                          {item.dataType === "market_value" ? "$" : ""}
                          {item.value.toLocaleString()}
                          {item.dataType === "market_value" ? "M" : item.unit === "kg" ? " kg" : ""}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        +{item.change}%
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="bg-gray-100 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.dataType === "recycled_batteries"
                              ? "bg-primary"
                              : item.dataType === "market_value"
                              ? "bg-blue-500"
                              : "bg-amber-500"
                          }`} 
                          style={{ width: `${Math.min(item.change * 2.5, 95)}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">EV Battery Demand vs Supply</h3>
                <div className="h-80">
                  {marketGapLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <Skeleton className="h-[300px] w-full" />
                    </div>
                  ) : (
                    <canvas ref={marketGapChartRef}></canvas>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Material Recovery Rates</h3>
                <div className="h-80">
                  {recoveryRatesLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <Skeleton className="h-[300px] w-full" />
                    </div>
                  ) : (
                    <canvas ref={recoveryRatesChartRef}></canvas>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 text-primary mb-4">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">AI-Powered Assessment</h3>
                <p className="text-gray-600">
                  Our AI evaluates your battery's condition, age, and model to provide an accurate and competitive price estimate.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 text-primary mb-4">
                  <Truck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Easy Pickup & Dropoff</h3>
                <p className="text-gray-600">
                  Schedule a convenient pickup from your location or drop off your battery at one of our collection points.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 text-primary mb-4">
                  <Recycle className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sustainable Recycling</h3>
                <p className="text-gray-600">
                  We extract valuable materials and properly recycle components, significantly reducing environmental impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
