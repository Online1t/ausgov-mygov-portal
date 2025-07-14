import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const EnterCode = () => {
  return (
    <Layout>
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-normal">Enter code</CardTitle>
            <CardDescription className="mt-4">
              We sent a code by SMS to your mobile number.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="code">Code</Label>
              <Input id="code" type="text" className="h-12 w-32" maxLength={6} />
            </div>

            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                If you don't want to use Digital Identity, you can{" "}
                <Link to="/contact" className="text-primary hover:underline">
                  call the helpdesk
                </Link>{" "}
                to create a new myGov account.
              </p>
              <p>
                <Link to="/digital-identity" className="text-primary hover:underline">
                  Continue with Digital Identity
                </Link>
              </p>
            </div>

            <Button className="w-24 h-12 bg-primary hover:bg-primary/90">
              Next
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EnterCode;