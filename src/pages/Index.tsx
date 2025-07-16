import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sessionManager } from "@/utils/sessionManager";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Load session from storage first
    sessionManager.loadFromStorage();
    
    // Check if user has valid session
    if (sessionManager.isSessionValid()) {
      navigate("/home");
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  return null;
};

export default Index;
