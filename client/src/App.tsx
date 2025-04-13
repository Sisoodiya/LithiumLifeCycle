import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SellBatteryPage from "./pages/SellBatteryPage";
import BusinessPortalPage from "./pages/BusinessPortalPage";
import SubsidiesPage from "./pages/SubsidiesPage";
import ContributePage from "./pages/ContributePage";
import MarketplacePage from "./pages/MarketplacePage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/sell" component={SellBatteryPage} />
      <Route path="/business" component={BusinessPortalPage} />
      <Route path="/subsidies" component={SubsidiesPage} />
      <Route path="/contribute" component={ContributePage} />
      <Route path="/marketplace" component={MarketplacePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
