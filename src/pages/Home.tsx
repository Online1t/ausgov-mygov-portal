import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, User, CreditCard, AlertCircle, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sessionManager } from "@/utils/sessionManager";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const [sessionTime, setSessionTime] = useState("");
  const [username, setUsername] = useState("User");
  const [sessionTimeout, setSessionTimeout] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if session is valid
    if (!sessionManager.isSessionValid()) {
      navigate("/");
      return;
    }

    // Update activity and check for page visit limits
    sessionManager.updateActivity();
    
    const sessionData = sessionManager.getSessionData();
    if (sessionData) {
      setUsername(sessionData.username);
      
      // Check if locked due to too many page visits
      if (sessionData.isLocked) {
        toast({
          title: "Account Locked",
          description: "Too many page visits detected. Please sign in again later.",
          variant: "destructive",
        });
        setTimeout(() => {
          sessionManager.clearSession();
          navigate("/");
        }, 3000);
        return;
      }
      
      // Format login time
      const loginDate = new Date(sessionData.loginTime);
      setSessionTime(loginDate.toLocaleString('en-AU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      }));
    }

    // Session timeout countdown
    const timer = setInterval(() => {
      const remaining = sessionManager.getRemainingTime();
      setSessionTimeout(Math.ceil(remaining / 1000));
      
      if (remaining <= 0) {
        clearInterval(timer);
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please sign in again.",
          variant: "destructive",
        });
        setTimeout(() => {
          sessionManager.clearSession();
          navigate("/");
        }, 2000);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, toast]);

  const formatTimeout = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const serviceCards = [
    {
      icon: Mail,
      title: "Inbox",
      description: "Read important messages from linked services",
      href: "/inbox"
    },
    {
      icon: User,
      title: "My profile",
      description: "Manage linked services and personal details",
      href: "/profile"
    },
    {
      icon: CreditCard,
      title: "Payments & claims",
      description: "Track payments, claims and applications",
      href: "/payments"
    }
  ];

  const linkedServices = [
    { name: "Go to Centrelink", href: "/centrelink" },
    { name: "Go to Medicare", href: "/medicare" },
    { name: "Go to My Health Record", href: "/health-record" },
    { name: "Go to Australian Taxation Office", href: "/ato" }
  ];

  const alerts = [
    "Proof of COVID-19 vaccination",
    "Government support for natural disasters",
    "Government support for coronavirus"
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-mygov-background">
        {/* Session timeout warning */}
        {sessionTimeout <= 300 && sessionTimeout > 0 && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-yellow-700">
                ⚠️ Session expires in: <span className="font-mono font-bold">{formatTimeout(sessionTimeout)}</span>
              </p>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome section */}
          <div className="mb-8">
            <div className="bg-mygov-blue text-white px-4 py-3 text-sm mb-4 rounded-t">
              Welcome {username}
            </div>
            <div className="bg-white rounded-b border border-t-0 p-4 mb-4">
              <p className="text-sm text-mygov-text-secondary">
                Last sign in: {sessionTime}
              </p>
            </div>
          </div>

          {/* Main service cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {serviceCards.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-mygov-light-blue border-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <service.icon className="h-8 w-8 text-mygov-light-blue" />
                    <div>
                      <CardTitle className="text-lg text-mygov-text-primary">{service.title}</CardTitle>
                      <CardDescription className="text-sm text-mygov-text-secondary">
                        {service.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Centrelink tasks */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4 text-mygov-text-primary">
              You don't have any Centrelink tasks
            </h2>
            <p className="text-mygov-text-secondary mb-4">
              Centrelink tasks will appear here when you need to complete them.
            </p>
          </div>

          {/* Linked services */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-mygov-text-primary">
                Linked services (4 linked)
              </h2>
              <Button variant="ghost" className="text-mygov-blue hover:text-white hover:bg-mygov-blue">
                View and link services →
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {linkedServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-mygov-light-blue border">
                  <CardContent className="pt-6 flex items-center justify-between">
                    <h3 className="font-medium text-mygov-text-primary">{service.name}</h3>
                    <ExternalLink className="h-4 w-4 text-mygov-light-blue" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4 text-mygov-text-primary">Alerts</h2>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded border">
                  <AlertCircle className="h-5 w-5 text-mygov-light-blue mt-0.5" />
                  <div>
                    <h3 className="font-medium text-mygov-blue hover:underline cursor-pointer">
                      {alert}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assistant button */}
          <div className="fixed bottom-6 right-6">
            <Button className="bg-mygov-footer-dark hover:bg-mygov-footer-dark/90 text-white px-6 py-3 rounded-full shadow-lg">
              Assistant
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;