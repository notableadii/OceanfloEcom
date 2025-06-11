import { useQuery } from "@tanstack/react-query";
import { Calendar, ShoppingCart, CreditCard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderTracking from "@/components/order-tracking";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import type { Order } from "@shared/schema";

export default function Dashboard() {
  const { toast } = useToast();
  
  // Mock user ID - in real app this would come from auth
  const userId = 1;

  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: [`/api/orders/user/${userId}`],
  });

  const handleQuickOrder = (productName: string, price: string) => {
    toast({
      title: "Quick Order",
      description: `${productName} added to cart. Redirecting to checkout...`,
    });
  };

  const handleSubscriptionAction = (action: string) => {
    toast({
      title: "Subscription Action",
      description: `${action} request submitted. You'll receive confirmation shortly.`,
    });
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "processing":
        return "secondary";
      case "out_for_delivery":
        return "default";
      case "delivered":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
          <p className="text-gray-text mt-2">Welcome back! Manage your subscriptions and orders here.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Subscription */}
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Active Subscription</CardTitle>
                <Badge className="bg-success text-white">Active</Badge>
              </CardHeader>
              <CardContent>
                <div className="hero-gradient rounded-lg p-6 text-white mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Monthly Plan</h3>
                      <p className="text-blue-100">₹4,500 per month</p>
                      <p className="text-blue-100 text-sm mt-2 flex items-center">
                        <Calendar className="mr-1" size={14} />
                        Next renewal: March 15, 2024
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">10%</div>
                      <div className="text-blue-100 text-sm">Discount</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={() => handleSubscriptionAction("Upgrade")}
                    className="bg-primary text-white hover:bg-primary-dark"
                  >
                    Upgrade Plan
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleSubscriptionAction("Downgrade")}
                  >
                    Downgrade
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50"
                    onClick={() => handleSubscriptionAction("Cancel")}
                  >
                    Cancel Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* One-time Orders */}
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Quick Order</CardTitle>
                <Button className="bg-primary text-white hover:bg-primary-dark">
                  <Plus className="mr-2" size={16} />
                  New Order
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-smooth">
                    <h3 className="font-semibold text-gray-900 mb-2">500ml Bottles</h3>
                    <p className="text-gray-text text-sm mb-3">Pack of 24</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold">₹480</span>
                      <Button 
                        size="sm"
                        onClick={() => handleQuickOrder("500ml Bottles (24)", "480")}
                        className="bg-primary text-white hover:bg-primary-dark"
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-smooth">
                    <h3 className="font-semibold text-gray-900 mb-2">1L Bottles</h3>
                    <p className="text-gray-text text-sm mb-3">Pack of 12</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold">₹432</span>
                      <Button 
                        size="sm"
                        onClick={() => handleQuickOrder("1L Bottles (12)", "432")}
                        className="bg-primary text-white hover:bg-primary-dark"
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-smooth">
                    <h3 className="font-semibold text-gray-900 mb-2">20L Can</h3>
                    <p className="text-gray-text text-sm mb-3">Single unit</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold">₹180</span>
                      <Button 
                        size="sm"
                        onClick={() => handleQuickOrder("20L Can", "180")}
                        className="bg-primary text-white hover:bg-primary-dark"
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order History */}
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-4">
                        <div className="animate-pulse">
                          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/6 mb-3"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : orders && orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">Order #{order.orderNumber}</h3>
                            <p className="text-gray-text text-sm">
                              {new Date(order.createdAt!).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={getStatusVariant(order.status)}>
                            {ORDER_STATUS_LABELS[order.status as keyof typeof ORDER_STATUS_LABELS]}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-700">
                              {JSON.parse(order.items).map((item: any) => 
                                `${item.name} × ${item.quantity}`
                              ).join(', ')}
                            </p>
                            <p className="text-primary font-semibold">₹{order.totalAmount}</p>
                          </div>
                          <Button variant="link" className="text-primary hover:text-primary-dark">
                            {order.status === "delivered" ? "Reorder" : "Track Order"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-text">
                    <ShoppingCart className="mx-auto mb-4" size={48} />
                    <p>No orders found. Start shopping to see your order history!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Real-time Tracking */}
            <OrderTracking status="out_for_delivery" />

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <CreditCard className="text-gray-400 mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">•••• •••• •••• 1234</p>
                        <p className="text-xs text-gray-text">Visa ending in 1234</p>
                      </div>
                    </div>
                    <Badge className="bg-primary-light text-primary">Default</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-5 h-5 bg-gray-400 rounded mr-3 flex items-center justify-center text-white text-xs">
                        U
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">UPI Payment</p>
                        <p className="text-xs text-gray-text">user@okaxis</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Plus className="mr-2" size={16} />
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-text">Total Orders</span>
                    <span className="font-semibold text-gray-900">47</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-text">This Month</span>
                    <span className="font-semibold text-gray-900">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-text">Total Saved</span>
                    <span className="font-semibold text-success">₹2,340</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-text">Member Since</span>
                    <span className="font-semibold text-gray-900">Jan 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
