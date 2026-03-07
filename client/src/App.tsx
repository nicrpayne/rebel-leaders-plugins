import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import GravityCheck from "./pages/GravityCheck";
import Results from "./pages/Results";
import Codex from "./pages/Codex";
import Assets from "./pages/Assets";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/gravity-check" component={GravityCheck} />
      <Route path="/results" component={Results} />
      <Route path="/codex" component={Codex} />
      <Route path="/assets" component={Assets} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <div className="scanlines" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
