import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Plus, Fish, Clock, CheckCircle, XCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const SeasonalPermits = ({ permits }) => {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [newPermit, setNewPermit] = useState({
    type: "",
    season: "",
    fishingArea: "",
    vesselId: "",
    quotaRequest: ""
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "denied":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "expired":
      case "denied":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New permit application:", newPermit);
    setShowApplyForm(false);
    setNewPermit({
      type: "",
      season: "",
      fishingArea: "",
      vesselId: "",
      quotaRequest: ""
    });
  };

  const permitTypes = [
    "Lobster Season",
    "Tuna Season", 
    "Crab Season",
    "Salmon Season",
    "Commercial Fishing",
    "Charter Fishing",
    "Research Permit"
  ];

  const seasons = [
    "Spring 2024",
    "Summer 2024", 
    "Fall 2024",
    "Winter 2024/25"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-deep-sea mb-2">Seasonal Permits</h2>
          <p className="text-muted-foreground">Manage your fishing permits and seasonal licenses</p>
        </div>
        <Dialog open={showApplyForm} onOpenChange={setShowApplyForm}>
          <DialogTrigger asChild>
            <Button variant="ocean" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Apply for Permit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-ocean" />
                Apply for Seasonal Permit
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="permitType">Permit Type</Label>
                  <Select onValueChange={(value) => setNewPermit(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select permit type" />
                    </SelectTrigger>
                    <SelectContent>
                      {permitTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="season">Season</Label>
                  <Select onValueChange={(value) => setNewPermit(prev => ({ ...prev, season: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      {seasons.map((season) => (
                        <SelectItem key={season} value={season}>{season}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fishingArea">Fishing Area</Label>
                  <Input
                    id="fishingArea"
                    value={newPermit.fishingArea}
                    onChange={(e) => setNewPermit(prev => ({ ...prev, fishingArea: e.target.value }))}
                    placeholder="e.g., Zone 3A, Gulf Coast"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="vesselId">Vessel ID</Label>
                  <Input
                    id="vesselId"
                    value={newPermit.vesselId}
                    onChange={(e) => setNewPermit(prev => ({ ...prev, vesselId: e.target.value }))}
                    placeholder="e.g., BL-001"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="quotaRequest">Quota Request (if applicable)</Label>
                  <Input
                    id="quotaRequest"
                    value={newPermit.quotaRequest}
                    onChange={(e) => setNewPermit(prev => ({ ...prev, quotaRequest: e.target.value }))}
                    placeholder="e.g., 500 lbs per day"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="ocean" className="flex-1">
                  Submit Application
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowApplyForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Permits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {permits.map((permit) => (
          <Card key={permit.id} className="shadow-card hover:shadow-elevated transition-all duration-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-deep-sea flex items-center gap-2">
                  <Fish className="h-5 w-5 text-ocean" />
                  {permit.type}
                </CardTitle>
                <Badge className={`${getStatusColor(permit.status)} flex items-center gap-1`}>
                  {getStatusIcon(permit.status)}
                  {permit.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Season:</span>
                  <span className="font-medium">{permit.season}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Permit ID:</span>
                  <span className="font-medium">{permit.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Expires:</span>
                  <span className="font-medium">{new Date(permit.expiry).toLocaleDateString()}</span>
                </div>
              </div>

              {permit.status === "Active" && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Valid for fishing</span>
                  </div>
                  <p className="text-xs text-green-700">
                    Remember to follow all catch limits and regulations
                  </p>
                </div>
              )}

              {permit.status === "Expired" && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-800">Permit expired</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Renew Permit
                  </Button>
                </div>
              )}

              {permit.status === "Pending" && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">Under review</span>
                  </div>
                  <p className="text-xs text-yellow-700">
                    Application is being processed
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button variant="nautical" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Apply for New Permit Card */}
        <Card className="shadow-card hover:shadow-elevated transition-all duration-200 border-dashed border-2 border-ocean/30">
          <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
            <CalendarDays className="h-12 w-12 text-ocean/50 mb-3" />
            <h3 className="font-semibold text-deep-sea mb-2">Apply for New Permit</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get permits for upcoming fishing seasons
            </p>
            <Button 
              variant="ocean" 
              onClick={() => setShowApplyForm(true)}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Apply Now
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Permits</p>
                <p className="text-2xl font-bold text-ocean">{permits.length}</p>
              </div>
              <CalendarDays className="h-8 w-8 text-ocean/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {permits.filter(p => p.status === "Active").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {permits.filter(p => p.status === "Pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Expired</p>
                <p className="text-2xl font-bold text-red-600">
                  {permits.filter(p => p.status === "Expired").length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};