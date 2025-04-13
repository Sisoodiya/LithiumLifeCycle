import ProductFilters from "../components/marketplace/ProductFilters";
import ProductGrid from "../components/marketplace/ProductGrid";
import { useState } from "react";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    condition: "",
    minPrice: "",
    maxPrice: "",
    capacity: ""
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [sortOption, setSortOption] = useState("featured");

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Battery Marketplace</h2>
          <p className="mt-4 text-lg text-gray-600">
            Browse our selection of quality refurbished and recycled battery products.
          </p>
        </div>

        <ProductFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          setFilters={setFilters}
          showAdvancedFilters={showAdvancedFilters}
          setShowAdvancedFilters={setShowAdvancedFilters}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        <ProductGrid 
          searchQuery={searchQuery}
          filters={filters}
          sortOption={sortOption}
        />
      </div>
    </section>
  );
};

export default Marketplace;
