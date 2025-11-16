import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProgressProvider } from "./contexts/ProgressContext";
import AIConcierge from "./components/AIConcierge";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import WelcomeKit from "./pages/WelcomeKit";
import Emergency from "./pages/Emergency";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Progress from "./pages/Progress";
import Downloads from "./pages/Downloads";
import Pronunciation from "./pages/Pronunciation";
import PaymentSuccess from "./pages/PaymentSuccess";
import LessonList from "./pages/LessonList";
import LessonDetail from "./pages/LessonDetail";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
        <Route path="/welcome-kit" component={WelcomeKit} />
      <Route path="/emergency" component={Emergency} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/progress" component={Progress} />
      <Route path="/downloads" component={Downloads} />
      <Route path="/pronunciation" component={Pronunciation} />
      <Route path="/payment-success" component={PaymentSuccess} />
      <Route path={"/lessons"} component={LessonList} />
      <Route path="/lesson/:id" component={LessonDetail} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <ProgressProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <AIConcierge />
          </TooltipProvider>
        </ProgressProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
