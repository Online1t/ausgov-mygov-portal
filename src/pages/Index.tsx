import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, User, CreditCard, AlertCircle } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <div className="bg-primary text-primary-foreground px-4 py-2 text-sm mb-4">
            Welcome
          </div>
          <div className="bg-white rounded border p-4 mb-4">
            <p className="text-sm text-muted-foreground">
              Last sign in 07 June 2022 08:47:18 PM AEST
            </p>
          </div>
        </div>

        {/* Main service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-lg">Inbox</CardTitle>
                  <CardDescription className="text-sm">
                    Read important messages from linked services
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <User className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-lg">My profile</CardTitle>
                  <CardDescription className="text-sm">
                    Manage linked services and personal details
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-lg">Payments & claims</CardTitle>
                  <CardDescription className="text-sm">
                    Track payments, claims and applications
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Centrelink tasks */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">You don't have any Centrelink tasks</h2>
          <p className="text-muted-foreground mb-4">
            Centrelink tasks will appear here when you need to complete them.
          </p>
        </div>

        {/* Linked services */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Linked services (4 linked)</h2>
            <Button variant="ghost" className="text-primary hover:text-primary-foreground hover:bg-primary">
              View and link services →
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <h3 className="font-medium mb-2">Go to Centrelink</h3>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <h3 className="font-medium mb-2">Go to Medicare</h3>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <h3 className="font-medium mb-2">Go to My Health Record</h3>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <h3 className="font-medium mb-2">Go to Australian Taxation Office</h3>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Alerts */}
        <div>
          <h2 className="text-lg font-medium mb-4">Alerts</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-4 bg-white rounded border">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium text-primary hover:underline cursor-pointer">
                  Proof of COVID-19 vaccination
                </h3>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-white rounded border">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium text-primary hover:underline cursor-pointer">
                  Government support for natural disasters
                </h3>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-white rounded border">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium text-primary hover:underline cursor-pointer">
                  Government support for coronavirus
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
