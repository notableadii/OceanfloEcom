import { MapPin, Clock, Phone } from "lucide-react";

interface OrderTrackingProps {
  status: string;
  eta?: string;
  driverName?: string;
  driverPhone?: string;
}

export default function OrderTracking({ 
  status, 
  eta = "15 minutes",
  driverName = "Ravi Kumar",
  driverPhone = "+91 98765 43210"
}: OrderTrackingProps) {
  const trackingSteps = [
    { label: "Order confirmed", completed: true },
    { label: "Picked up from warehouse", completed: true },
    { label: "Out for delivery", completed: status === "out_for_delivery" || status === "delivered" },
    { label: "Delivered", completed: status === "delivered" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Live Order Tracking</h2>
      
      {/* Map Placeholder */}
      <div className="bg-gray-200 rounded-lg h-64 mb-4 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <MapPin className="mx-auto mb-2" size={48} />
          <p>Live Tracking Map</p>
          <p className="text-sm">Driver location updates</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {trackingSteps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div 
              className={`w-3 h-3 rounded-full mr-3 ${
                step.completed ? 'bg-success' : 
                index === trackingSteps.findIndex(s => !s.completed) ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
            <span className={`text-sm ${
              step.completed ? 'text-gray-900' : 
              index === trackingSteps.findIndex(s => !s.completed) ? 'font-medium text-gray-900' : 'text-gray-text'
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {status === "out_for_delivery" && (
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center text-primary font-medium mb-1">
            <Clock className="mr-1" size={16} />
            ETA: {eta}
          </div>
          <div className="flex items-center text-xs text-gray-text">
            <span className="mr-2">Driver: {driverName}</span>
            <span>•</span>
            <div className="flex items-center ml-2">
              <Phone className="mr-1" size={12} />
              {driverPhone}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
