import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface ProductFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: {
    type: string;
    condition: string;
    minPrice: string;
    maxPrice: string;
    capacity: string;
  };
  setFilters: (filters: any) => void;
  showAdvancedFilters: boolean;
  setShowAdvancedFilters: (show: boolean) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
}

const ProductFilters = ({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  showAdvancedFilters,
  setShowAdvancedFilters,
  sortOption,
  setSortOption
}: ProductFiltersProps) => {
  // Local state for form inputs (to apply filters only when "Apply Filters" is clicked)
  const [localFilters, setLocalFilters] = useState({ ...filters });

  const handleFilterChange = (name: string, value: string) => {
    setLocalFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    setFilters(localFilters);
  };

  return (
    <Card className="mt-12">
      <CardContent className="p-6">
        <div className="md:flex md:items-center md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search batteries, parts, materials..."
                className="w-full pl-10 pr-4 py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 md:w-auto">
            <Button
              variant="outline"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center"
            >
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </div>
          
          <div className="mt-4 md:mt-0 md:w-auto">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by: Featured" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Sort by: Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="capacity">Best Capacity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Filter */}
        {showAdvancedFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              <div>
                <label htmlFor="battery-type-filter" className="block text-sm font-medium text-gray-700">Battery Type</label>
                <Select 
                  value={localFilters.type} 
                  onValueChange={(value) => handleFilterChange("type", value)}
                >
                  <SelectTrigger id="battery-type-filter">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="EV Battery">EV Battery (Tata, Mahindra, MG)</SelectItem>
                    <SelectItem value="Energy Storage">Energy Storage (Solar, Home)</SelectItem>
                    <SelectItem value="Portable">Portable</SelectItem>
                    <SelectItem value="Cells">Cells</SelectItem>
                    <SelectItem value="Charger">Charger</SelectItem>
                    <SelectItem value="E-Bike">E-Bike/E-Rickshaw</SelectItem>
                    <SelectItem value="Inverter">Inverter Battery</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="condition-filter" className="block text-sm font-medium text-gray-700">Condition</label>
                <Select 
                  value={localFilters.condition} 
                  onValueChange={(value) => handleFilterChange("condition", value)}
                >
                  <SelectTrigger id="condition-filter">
                    <SelectValue placeholder="All Conditions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Conditions</SelectItem>
                    <SelectItem value="New (Recycled Materials)">New (Recycled Materials)</SelectItem>
                    <SelectItem value="Refurbished (Grade A)">Refurbished (Grade A)</SelectItem>
                    <SelectItem value="Refurbished (Grade B)">Refurbished (Grade B)</SelectItem>
                    <SelectItem value="Tested & Certified">Tested & Certified</SelectItem>
                    <SelectItem value="Tested & Sorted">Tested & Sorted</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="price-range" className="block text-sm font-medium text-gray-700">Price Range (₹)</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <div className="relative flex items-stretch flex-grow focus-within:z-10">
                    <Input 
                      type="number" 
                      id="price-min" 
                      placeholder="Min ₹"
                      value={localFilters.minPrice}
                      onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                      className="rounded-l-md"
                    />
                  </div>
                  <div className="relative flex items-stretch flex-grow focus-within:z-10">
                    <Input 
                      type="number" 
                      id="price-max" 
                      placeholder="Max ₹"
                      value={localFilters.maxPrice}
                      onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                      className="rounded-r-md"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="capacity-filter" className="block text-sm font-medium text-gray-700">Capacity (kWh)</label>
                <Select 
                  value={localFilters.capacity} 
                  onValueChange={(value) => handleFilterChange("capacity", value)}
                >
                  <SelectTrigger id="capacity-filter">
                    <SelectValue placeholder="All Capacities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Capacities</SelectItem>
                    <SelectItem value="Small (< 20 kWh)">Small (&lt; 20 kWh)</SelectItem>
                    <SelectItem value="Medium (20-60 kWh)">Medium (20-60 kWh)</SelectItem>
                    <SelectItem value="Large (60-100 kWh)">Large (60-100 kWh)</SelectItem>
                    <SelectItem value="Industrial (> 100 kWh)">Industrial (&gt; 100 kWh)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button 
                onClick={applyFilters} 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductFilters;
