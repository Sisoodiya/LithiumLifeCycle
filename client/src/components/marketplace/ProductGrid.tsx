import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";

interface Product {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
  capacity: number;
  condition: string;
  capacityPercentage: number;
  image: string;
  tags: string[];
  createdAt: string;
}

interface ProductGridProps {
  searchQuery: string;
  filters: {
    type: string;
    condition: string;
    minPrice: string;
    maxPrice: string;
    capacity: string;
  };
  sortOption: string;
}

const ProductGrid = ({ searchQuery, filters, sortOption }: ProductGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch products (combining search and filter operations client-side for now)
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Filter and sort products
  const filteredProducts = products ? filterAndSortProducts(products, searchQuery, filters, sortOption) : [];
  
  // Paginate products
  const totalPages = Math.ceil((filteredProducts?.length || 0) / itemsPerPage);
  const displayedProducts = filteredProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {/* Product Grid */}
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden h-56"></div>
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="mt-4 h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))
        ) : displayedProducts && displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-center object-cover group-hover:opacity-75 transition-opacity duration-300"
                />
              </div>
              <CardContent className="p-4">
                <div className="mt-2 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700 font-medium">{product.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{product.condition} | {product.capacity} kWh</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${product.price.toLocaleString()}</p>
                </div>
                <div className="mt-2">
                  {product.capacityPercentage && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {product.capacityPercentage}% Capacity
                    </span>
                  )}
                  {product.tags && product.tags[0] && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {product.tags[0]}
                    </span>
                  )}
                </div>
                <Button className="mt-4 w-full bg-primary-600 hover:bg-primary-700">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredProducts && filteredProducts.length > 0 && (
        <div className="mt-12 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
                </span>{" "}
                of <span className="font-medium">{filteredProducts.length}</span> products
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <Button
                  variant="outline"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </Button>
                
                {/* Page buttons */}
                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  // Logic to show pages around current page
                  let pageNum = i + 1;
                  if (totalPages > 5) {
                    if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNum
                          ? "z-10 bg-primary-50 border-primary-500 text-primary-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to filter and sort products
const filterAndSortProducts = (
  products: Product[],
  searchQuery: string,
  filters: ProductGridProps["filters"],
  sortOption: string
): Product[] => {
  // Apply search
  let filtered = products;
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.type.toLowerCase().includes(query) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  }

  // Apply type filter
  if (filters.type) {
    filtered = filtered.filter((product) => product.type === filters.type);
  }

  // Apply condition filter
  if (filters.condition) {
    filtered = filtered.filter((product) => product.condition === filters.condition);
  }

  // Apply price range filter
  if (filters.minPrice) {
    filtered = filtered.filter((product) => product.price >= parseInt(filters.minPrice));
  }
  if (filters.maxPrice) {
    filtered = filtered.filter((product) => product.price <= parseInt(filters.maxPrice));
  }

  // Apply capacity filter
  if (filters.capacity) {
    switch (filters.capacity) {
      case "Small (< 20 kWh)":
        filtered = filtered.filter((product) => product.capacity < 20);
        break;
      case "Medium (20-60 kWh)":
        filtered = filtered.filter((product) => product.capacity >= 20 && product.capacity <= 60);
        break;
      case "Large (60-100 kWh)":
        filtered = filtered.filter((product) => product.capacity > 60 && product.capacity <= 100);
        break;
      case "Industrial (> 100 kWh)":
        filtered = filtered.filter((product) => product.capacity > 100);
        break;
    }
  }

  // Apply sorting
  switch (sortOption) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case "capacity":
      filtered.sort((a, b) => (b.capacityPercentage || 0) - (a.capacityPercentage || 0));
      break;
    // Default: featured - no sorting needed
  }

  return filtered;
};

export default ProductGrid;
