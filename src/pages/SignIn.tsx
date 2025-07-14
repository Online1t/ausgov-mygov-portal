import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <Layout>
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-normal">Sign in with myGov</CardTitle>
            <CardDescription className="text-lg mt-4">
              Using your myGov sign in details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username or email</Label>
              <Input id="username" type="text" className="h-12" />
              <Link to="/forgot-username" className="text-sm text-primary hover:underline">
                Forgot username
              </Link>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" className="h-12" />
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password
              </Link>
            </div>

            <Button className="w-full h-12 bg-primary hover:bg-primary/90">
              Sign in
            </Button>

            <div className="text-center">
              <Link to="/create-account" className="text-sm text-primary hover:underline">
                Create a myGov account
              </Link>
              <span className="text-sm text-muted-foreground"> if you don't have one already.</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SignIn;