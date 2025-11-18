import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import logo from "@/assets/fitai-logo.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-hero rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-hero flex items-center justify-center p-4" style={{ boxShadow: "var(--shadow-glow-mint)" }}>
              <img src={logo} alt="FitAI Coach Logo" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
