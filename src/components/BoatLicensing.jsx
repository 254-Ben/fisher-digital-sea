import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ship, Plus, FileText, Calendar, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const BoatLicensing = ({ boats }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBoat, setNewBoat] = useState({
    name: "",
    type: "",
    length: "",
    engine: "",
    registrationNumber: "",
    homePort: ""
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isExpiringSoon = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle boat registration
    console.log("New boat registration:", newBoat);
    setShowAddForm(false);
    setNewBoat({
      name: "",
      type: "",
      length: "",
      engine: "",
      registrationNumber: "",
      homePort: ""
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-deep-sea mb-2">Boat Licensing</h2>
          <p className="text-muted-foreground">Manage your vessel registrations and licenses</p>
        </div>
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogTrigger asChild>
            <Button variant="ocean" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Register New Boat
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Ship className="h-5 w-5 text-ocean" />
                Register New Boat
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="boatName">Boat Name</Label>
                  <Input
                    id="boatName"
                    value={newBoat.name}
                    onChange={(e) => setNewBoat(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="boatType">Boat Type</Label>
                  <Select onValueChange={(value) => setNewBoat(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select boat type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recreational">Recreational</SelectItem>
                      <SelectItem value="sport-fishing">Sport Fishing</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="charter">Charter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="length">Length (feet)</Label>
                  <Input
                    id="length"
                    type="number"
                    value={newBoat.length}
                    onChange={(e) => setNewBoat(prev => ({ ...prev, length: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="engine">Engine Type/HP</Label>
                  <Input
                    id="engine"
                    value={newBoat.engine}
                    onChange={(e) => setNewBoat(prev => ({ ...prev, engine: e.target.value }))}
                    placeholder="e.g., Outboard 150HP"
                  />
                </div>
                <div>
                  <Label htmlFor="registration">Registration Number</Label>
                  <Input
                    id="registration"
                    value={newBoat.registrationNumber}
                    onChange={(e) => setNewBoat(prev => ({ ...prev, registrationNumber: e.target.value }))}
                    placeholder="e.g., FL-1234-AB"
                  />
                </div>
                <div>
                  <Label htmlFor="homePort">Home Port</Label>
                  <Input
                    id="homePort"
                    value={newBoat.homePort}
                    onChange={(e) => setNewBoat(prev => ({ ...prev, homePort: e.target.value }))}
                    placeholder="e.g., Miami Harbor"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="ocean" className="flex-1">
                  Register Boat
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Boats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boats.map((boat) => (
          <Card key={boat.id} className="shadow-card hover:shadow-elevated transition-all duration-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-deep-sea flex items-center gap-2">
                  <Ship className="h-5 w-5 text-ocean" />
                  {boat.name}
                </CardTitle>
                <Badge className={getStatusColor(boat.status)}>
                  {boat.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium">{boat.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">License ID:</span>
                  <span className="font-medium">{boat.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Expires:</span>
                  <span className={`font-medium ${isExpiringSoon(boat.expiry) ? 'text-amber-600' : ''}`}>
                    {new Date(boat.expiry).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {isExpiringSoon(boat.expiry) && (
                <div className="flex items-center gap-2 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <span className="text-sm text-amber-800">Expires soon!</span>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button variant="nautical" size="sm" className="flex-1">
                  <FileText className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Boat Card */}
        <Card className="shadow-card hover:shadow-elevated transition-all duration-200 border-dashed border-2 border-ocean/30">
          <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
            <Ship className="h-12 w-12 text-ocean/50 mb-3" />
            <h3 className="font-semibold text-deep-sea mb-2">Register New Boat</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add another vessel to your fleet
            </p>
            <Button 
              variant="ocean" 
              onClick={() => setShowAddForm(true)}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Boat
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Boats</p>
                <p className="text-2xl font-bold text-ocean">{boats.length}</p>
              </div>
              <Ship className="h-8 w-8 text-ocean/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Licenses</p>
                <p className="text-2xl font-bold text-green-600">
                  {boats.filter(b => b.status === "Active").length}
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800 text-lg px-2 py-1">✓</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
                <p className="text-2xl font-bold text-amber-600">
                  {boats.filter(b => isExpiringSoon(b.expiry)).length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};