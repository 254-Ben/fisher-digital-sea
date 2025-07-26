import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Fish, Ship, Calendar, CreditCard, Plus, User } from "lucide-react";
import { DigitalIdCard } from "./DigitalIdCard";
import { RegistrationForm } from "./RegistrationForm";
import { BoatLicensing } from "./BoatLicensing";
import { SeasonalPermits } from "./SeasonalPermits";

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [fisher, setFisher] = useState(null);

  // Mock data for demonstration
  const mockFisher = {
    id: "FL-2024-001",
    name: "John Maritime",
    email: "john.maritime@email.com",
    phone: "+1-555-0123",
    address: "123 Harbor Street, Coastal City, CC 12345",
    licenseNumber: "FL-001-2024",
    issueDate: "2024-01-15",
    expiryDate: "2024-12-31",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  };

  const mockBoats = [
    { id: "BL-001", name: "Sea Explorer", type: "Sport Fishing", status: "Active", expiry: "2024-10-15" },
    { id: "BL-002", name: "Ocean Hunter", type: "Commercial", status: "Pending", expiry: "2024-11-20" }
  ];

  const mockPermits = [
    { id: "SP-001", type: "Lobster Season", season: "Fall 2024", status: "Active", expiry: "2024-11-30" },
    { id: "SP-002", type: "Tuna Season", season: "Summer 2024", status: "Expired", expiry: "2024-09-15" }
  ];

  const renderMainContent = () => {
    switch (activeSection) {
      case "register":
        return <RegistrationForm onComplete={(data) => {
          setFisher(data);
          setActiveSection("dashboard");
        }} />;
      case "id-card":
        return <DigitalIdCard fisher={fisher || mockFisher} />;
      case "boats":
        return <BoatLicensing boats={mockBoats} />;
      case "permits":
        return <SeasonalPermits permits={mockPermits} />;
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-gradient-hero rounded-lg p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">Welcome to Fisher Portal</h1>
              <p className="text-blue-100">Manage your fishing licenses, permits, and vessel registrations</p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                variant="nautical" 
                className="h-20 flex-col"
                onClick={() => setActiveSection("id-card")}
              >
                <CreditCard className="h-6 w-6 mb-2" />
                Digital ID
              </Button>
              <Button 
                variant="nautical" 
                className="h-20 flex-col"
                onClick={() => setActiveSection("boats")}
              >
                <Ship className="h-6 w-6 mb-2" />
                Boat Licenses
              </Button>
              <Button 
                variant="nautical" 
                className="h-20 flex-col"
                onClick={() => setActiveSection("permits")}
              >
                <Calendar className="h-6 w-6 mb-2" />
                Seasonal Permits
              </Button>
              <Button 
                variant="ocean" 
                className="h-20 flex-col"
                onClick={() => setActiveSection("register")}
              >
                <Plus className="h-6 w-6 mb-2" />
                New Registration
              </Button>
            </div>

            {/* Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-card hover:shadow-elevated transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Licenses
                  </CardTitle>
                  <Fish className="h-4 w-4 text-ocean" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-ocean">3</div>
                  <p className="text-xs text-muted-foreground">
                    2 boats, 1 seasonal permit
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elevated transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Expiring Soon
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">1</div>
                  <p className="text-xs text-muted-foreground">
                    Lobster permit expires Nov 30
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elevated transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Profile Status
                  </CardTitle>
                  <User className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Active</div>
                  <p className="text-xs text-muted-foreground">
                    All documents verified
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-ocean">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-sea-foam/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Boat license renewed: Sea Explorer</span>
                  </div>
                  <Badge variant="secondary">Today</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm">Permit expires in 15 days: Lobster Season</span>
                  </div>
                  <Badge variant="outline">Warning</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-sea-foam/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Digital ID card updated</span>
                  </div>
                  <Badge variant="secondary">3 days ago</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Fish className="h-8 w-8 text-ocean mr-3" />
              <h1 className="text-xl font-bold text-deep-sea">Fisher Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant={activeSection === "dashboard" ? "ocean" : "ghost"}
                onClick={() => setActiveSection("dashboard")}
              >
                Dashboard
              </Button>
              <Button 
                variant={activeSection === "id-card" ? "ocean" : "ghost"}
                onClick={() => setActiveSection("id-card")}
              >
                Digital ID
              </Button>
              <Button 
                variant={activeSection === "boats" ? "ocean" : "ghost"}
                onClick={() => setActiveSection("boats")}
              >
                Boats
              </Button>
              <Button 
                variant={activeSection === "permits" ? "ocean" : "ghost"}
                onClick={() => setActiveSection("permits")}
              >
                Permits
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderMainContent()}
      </main>
    </div>
  );
};