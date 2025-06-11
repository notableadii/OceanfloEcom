import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { MapPin, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/queryClient";

interface ServiceCheckResult {
  available: boolean;
  pincode: string;
}

export default function ServiceChecker() {
  const [pincode, setPincode] = useState("");

  const serviceCheckMutation = useMutation({
    mutationFn: async (pincode: string): Promise<ServiceCheckResult> => {
      const response = await apiRequest("GET", `/api/service-check/${pincode}`);
      return response.json();
    },
  });

  const handleCheck = () => {
    if (!pincode.trim()) {
      return;
    }
    serviceCheckMutation.mutate(pincode.trim());
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Check Service Availability</h2>
          <p className="text-gray-text text-lg">Enter your pincode to see if we deliver to your area</p>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-8">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Pincode
              </Label>
              <Input
                id="pincode"
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="e.g., 110001"
                className="w-full"
                onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
              />
              {serviceCheckMutation.data && (
                <div className="mt-2 text-sm flex items-center">
                  {serviceCheckMutation.data.available ? (
                    <div className="flex items-center text-success">
                      <CheckCircle className="mr-1" size={16} />
                      Service available in your area!
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <XCircle className="mr-1" size={16} />
                      Service not available in your area yet.
                    </div>
                  )}
                </div>
              )}
            </div>
            <Button 
              onClick={handleCheck}
              disabled={serviceCheckMutation.isPending || !pincode.trim()}
              className="bg-primary text-white hover:bg-primary-dark hover:text-white"
            >
              {serviceCheckMutation.isPending ? "Checking..." : "Check Availability"}
            </Button>
          </div>
          
          {/* Map Placeholder */}
          <div className="mt-8 bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="mx-auto mb-2" size={48} />
              <p>Interactive Map</p>
              <p className="text-sm">Click on the map to select your location</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
