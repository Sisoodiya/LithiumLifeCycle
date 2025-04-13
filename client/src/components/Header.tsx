import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Battery } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Battery className="text-primary-600 h-6 w-6 mr-2" />
              <Link href="/">
                <span className="font-bold text-xl text-primary-700 cursor-pointer">EcoBatt</span>
              </Link>
            </div>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/">
                <a className={`px-1 py-5 text-sm font-medium ${isActive("/") ? "text-primary-600 border-b-2 border-primary-600" : "text-gray-700 hover:text-primary-600"}`}>
                  Home
                </a>
              </Link>
              <Link href="/sell-battery">
                <a className={`px-1 py-5 text-sm font-medium ${isActive("/sell-battery") ? "text-primary-600 border-b-2 border-primary-600" : "text-gray-700 hover:text-primary-600"}`}>
                  Sell Battery
                </a>
              </Link>
              <Link href="/business">
                <a className={`px-1 py-5 text-sm font-medium ${isActive("/business") ? "text-primary-600 border-b-2 border-primary-600" : "text-gray-700 hover:text-primary-600"}`}>
                  Business Portal
                </a>
              </Link>
              <Link href="/subsidies">
                <a className={`px-1 py-5 text-sm font-medium ${isActive("/subsidies") ? "text-primary-600 border-b-2 border-primary-600" : "text-gray-700 hover:text-primary-600"}`}>
                  Gov. Subsidies
                </a>
              </Link>
              <Link href="/contribute">
                <a className={`px-1 py-5 text-sm font-medium ${isActive("/contribute") ? "text-primary-600 border-b-2 border-primary-600" : "text-gray-700 hover:text-primary-600"}`}>
                  Contribute
                </a>
              </Link>
              <Link href="/marketplace">
                <a className={`px-1 py-5 text-sm font-medium ${isActive("/marketplace") ? "text-primary-600 border-b-2 border-primary-600" : "text-gray-700 hover:text-primary-600"}`}>
                  Marketplace
                </a>
              </Link>
            </nav>
          </div>
          <div className="hidden md:flex items-center">
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Sign In
            </button>
          </div>
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? "block" : "hidden"} md:hidden bg-white p-4 border-t`}>
        <div className="space-y-1">
          <Link href="/">
            <a className={`block px-3 py-2 text-base font-medium rounded-md ${isActive("/") ? "text-primary-600 bg-gray-100" : "text-gray-700 hover:bg-gray-100 hover:text-primary-600"}`}>
              Home
            </a>
          </Link>
          <Link href="/sell-battery">
            <a className={`block px-3 py-2 text-base font-medium rounded-md ${isActive("/sell-battery") ? "text-primary-600 bg-gray-100" : "text-gray-700 hover:bg-gray-100 hover:text-primary-600"}`}>
              Sell Battery
            </a>
          </Link>
          <Link href="/business">
            <a className={`block px-3 py-2 text-base font-medium rounded-md ${isActive("/business") ? "text-primary-600 bg-gray-100" : "text-gray-700 hover:bg-gray-100 hover:text-primary-600"}`}>
              Business Portal
            </a>
          </Link>
          <Link href="/subsidies">
            <a className={`block px-3 py-2 text-base font-medium rounded-md ${isActive("/subsidies") ? "text-primary-600 bg-gray-100" : "text-gray-700 hover:bg-gray-100 hover:text-primary-600"}`}>
              Gov. Subsidies
            </a>
          </Link>
          <Link href="/contribute">
            <a className={`block px-3 py-2 text-base font-medium rounded-md ${isActive("/contribute") ? "text-primary-600 bg-gray-100" : "text-gray-700 hover:bg-gray-100 hover:text-primary-600"}`}>
              Contribute
            </a>
          </Link>
          <Link href="/marketplace">
            <a className={`block px-3 py-2 text-base font-medium rounded-md ${isActive("/marketplace") ? "text-primary-600 bg-gray-100" : "text-gray-700 hover:bg-gray-100 hover:text-primary-600"}`}>
              Marketplace
            </a>
          </Link>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
