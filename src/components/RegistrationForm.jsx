import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, User, Mail, Phone, MapPin, Camera } from "lucide-react";

export const RegistrationForm = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    experience: "",
    photo: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate license data
    const licenseData = {
      id: `FL-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      licenseNumber: `FL-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}-${new Date().getFullYear()}`,
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      photo: formData.photo ? URL.createObjectURL(formData.photo) : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    };

    onComplete(licenseData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-deep-sea mb-2">Fisher Registration</h2>
        <p className="text-muted-foreground">Complete your registration to receive a digital fisher ID</p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-ocean flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Upload */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                {formData.photo ? (
                  <img
                    src={URL.createObjectURL(formData.photo)}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-ocean/20"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-sea-foam/30 border-2 border-dashed border-ocean/30 flex items-center justify-center">
                    <Camera className="h-8 w-8 text-harbor-gray" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-ocean text-white p-1 rounded-full cursor-pointer hover:bg-ocean/90 transition-colors">
                  <Upload className="h-3 w-3" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-muted-foreground">Upload your photo (required)</p>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  required
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4 p-4 bg-sea-foam/20 rounded-lg">
              <h3 className="font-semibold text-deep-sea">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContact">Contact Name</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone">Contact Phone</Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Fishing Experience */}
            <div>
              <Label htmlFor="experience">Fishing Experience (Optional)</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                placeholder="Describe your fishing experience, certifications, or special skills..."
                className="mt-1"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" variant="ocean" className="flex-1">
                Submit Registration
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  address: "",
                  emergencyContact: "",
                  emergencyPhone: "",
                  experience: "",
                  photo: null
                })}
              >
                Clear Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};