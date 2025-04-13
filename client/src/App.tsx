import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import SellBattery from "./pages/SellBattery";
import Business from "./pages/Business";
import Subsidies from "./pages/Subsidies";
import Contribute from "./pages/Contribute";
import Marketplace from "./pages/Marketplace";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/sell-battery" component={SellBattery} />
      <Route path="/business" component={Business} />
      <Route path="/subsidies" component={Subsidies} />
      <Route path="/contribute" component={Contribute} />
      <Route path="/marketplace" component={Marketplace} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Router />
      </MainLayout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
