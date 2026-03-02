import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProgressProvider } from "./contexts/ProgressContext";
import AIConcierge from "./components/AIConcierge";
import Navbar from "./components/Navbar";
import AnimatedPage from "./components/AnimatedPage";
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
import Admin from "./pages/Admin";
import AdminContent from "./pages/AdminContent";
import AdminFinancial from "./pages/AdminFinancial";
import Profile from "./pages/Profile";
import InteractiveLessons from "./pages/InteractiveLessons";
import Quiz from "./pages/Quiz";
import EmergencyScripts from "./pages/EmergencyScripts";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import SubscriptionSuccess from "./pages/SubscriptionSuccess";
import ChiangMaiTrip from "./pages/ChiangMaiTrip";
import ScrollToTop from "./components/ScrollToTop";

function AnimatedRoute({
  component: Component,
}: {
  component: React.ComponentType;
}) {
  return (
    <AnimatedPage>
      <Component />
    </AnimatedPage>
  );
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"}>
        <AnimatedRoute component={Home} />
      </Route>
      <Route path="/welcome-kit">
        <AnimatedRoute component={WelcomeKit} />
      </Route>
      <Route path="/emergency">
        <AnimatedRoute component={Emergency} />
      </Route>
      <Route path="/blog">
        <AnimatedRoute component={Blog} />
      </Route>
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/progress">
        <AnimatedRoute component={Progress} />
      </Route>
      <Route path="/downloads">
        <AnimatedRoute component={Downloads} />
      </Route>
      <Route path="/pronunciation">
        <AnimatedRoute component={Pronunciation} />
      </Route>
      <Route path="/payment-success">
        <AnimatedRoute component={PaymentSuccess} />
      </Route>
      <Route path="/subscription-success">
        <AnimatedRoute component={SubscriptionSuccess} />
      </Route>
      <Route path="/admin" component={Admin} />
      <Route path="/admin/content" component={AdminContent} />
      <Route path="/admin/financial" component={AdminFinancial} />
      <Route path="/profile">
        <AnimatedRoute component={Profile} />
      </Route>
      <Route path="/interactive-lessons">
        <AnimatedRoute component={InteractiveLessons} />
      </Route>
      <Route path="/quiz">
        <AnimatedRoute component={Quiz} />
      </Route>
      <Route path="/emergency-scripts">
        <AnimatedRoute component={EmergencyScripts} />
      </Route>
      <Route path="/articles">
        <AnimatedRoute component={Articles} />
      </Route>
      <Route path="/articles/:slug" component={ArticleDetail} />
      <Route path="/trips/chiang-mai-one-day">
        <AnimatedRoute component={ChiangMaiTrip} />
      </Route>
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
            <ScrollToTop />
            <Navbar />
            <Router />
            <AIConcierge />
          </TooltipProvider>
        </ProgressProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
