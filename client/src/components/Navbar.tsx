import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Sell Battery", href: "/sell" },
  { name: "Business Portal", href: "/business" },
  { name: "Subsidies", href: "/subsidies" },
  { name: "Contribute", href: "/contribute" },
  { name: "Marketplace", href: "/marketplace" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Recycle className="text-primary h-6 w-6 mr-2" />
              <span className="font-heading font-bold text-xl text-gray-800">BatteryCircle</span>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                    location === item.href
                      ? "border-primary text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <Button className="hidden md:inline-flex">
              Get Started
            </Button>
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="ml-3 md:hidden">
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <Recycle className="text-primary h-6 w-6 mr-2" />
                    <span className="font-heading font-bold text-xl text-gray-800">BatteryCircle</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center py-2 px-3 rounded-md",
                            location === item.href
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-gray-600 hover:bg-gray-100"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                  <div className="mt-auto pt-6">
                    <SheetClose asChild>
                      <Button className="w-full" onClick={() => setMobileMenuOpen(false)}>
                        Get Started
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
