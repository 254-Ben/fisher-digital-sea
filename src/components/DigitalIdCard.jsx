import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DigitalIdCard = ({ fisher }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-deep-sea mb-2">Digital Fisher ID</h2>
        <p className="text-muted-foreground">Official digital identification card</p>
      </div>

      {/* Digital ID Card */}
      <div className="flex justify-center">
        <Card className="w-full max-w-md bg-gradient-card shadow-float border-0 animate-float">
          <CardContent className="p-0">
            {/* Card Header */}
            <div className="bg-gradient-hero text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">FISHER ID CARD</h3>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  OFFICIAL
                </Badge>
              </div>
              <p className="text-xs text-blue-100">Department of Maritime Affairs</p>
            </div>

            {/* Photo and Basic Info */}
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={fisher.photo}
                  alt={fisher.name}
                  className="w-20 h-20 rounded-lg object-cover border-2 border-ocean/20"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-deep-sea">{fisher.name}</h3>
                  <p className="text-sm text-muted-foreground">Licensed Fisher</p>
                  <Badge className="mt-1 bg-green-100 text-green-800">Active</Badge>
                </div>
              </div>

              {/* License Details */}
              <div className="space-y-3 pt-2 border-t border-ocean/10">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">License No.</p>
                    <p className="font-semibold text-ocean">{fisher.licenseNumber}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Fisher ID</p>
                    <p className="font-semibold text-ocean">{fisher.id}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Issue Date</p>
                    <p className="font-semibold">{new Date(fisher.issueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Expires</p>
                    <p className="font-semibold">{new Date(fisher.expiryDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex justify-center pt-2 border-t border-ocean/10">
                <div className="bg-white p-3 rounded-lg border border-ocean/20">
                  <QrCode className="h-16 w-16 text-deep-sea" />
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="bg-sea-foam/30 p-3 rounded-b-lg text-center">
              <p className="text-xs text-muted-foreground">
                Valid for all maritime activities within jurisdiction
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Information Card */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-deep-sea mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Email Address</p>
              <p className="font-medium">{fisher.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone Number</p>
              <p className="font-medium">{fisher.phone}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{fisher.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button variant="ocean" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        <Button variant="nautical" className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share Digital Copy
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <QrCode className="h-4 w-4" />
          Generate QR Code
        </Button>
      </div>
    </div>
  );
};