import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import PackOpening from "./pages/PackOpening";
import Collection from "./pages/Collection";
import Arena from "./pages/Arena";

function Router() {
    return (
        <Switch>
            <Route path="/" component={Home} />
            <Route path="/open-pack/:id" component={PackOpening} />
            <Route path="/collection" component={Collection} />
            <Route path="/arena" component={Arena} />
            <Route component={NotFound} />
        </Switch>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Router />
            </TooltipProvider>
        </QueryClientProvider>
    );
}

export default App;