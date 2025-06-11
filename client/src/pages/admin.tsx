import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ShoppingCart, Truck, Package, Users, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import type { Order } from "@shared/schema";

interface AdminStats {
  totalOrders: number;
  outForDelivery: number;
  inventoryItems: number;
  totalCustomers: number;
}

interface InventoryItem {
  id: number;
  name: string;
  stock: number;
  status: string;
}

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: stats, isLoading: statsLoading } = useQuery<AdminStats>({
    queryKey: ["/api/admin/stats"],
  });

  const { data: orders, isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
  });

  const { data: inventory, isLoading: inventoryLoading } = useQuery<InventoryItem[]>({
    queryKey: ["/api/admin/inventory"],
  });

  const updateOrderMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: number; status: string }) => {
      const response = await apiRequest("PATCH", `/api/orders/${orderId}`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Order Updated",
        description: "Order status has been successfully updated.",
      });
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update order status. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleExportCustomers = () => {
    toast({
      title: "Export Started",
      description: "Customer data export is being prepared. Download will start shortly.",
    });
    // In a real app, this would trigger a CSV download
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: "Action Executed",
      description: `${action} has been initiated successfully.`,
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

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "text-success";
      case "Low Stock":
        return "text-warning";
      case "Critical":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-text mt-2">Manage orders, inventory, and customer data</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {statsLoading ? (
            [...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Skeleton className="h-12 w-12 rounded-lg mr-4" />
                    <div>
                      <Skeleton className="h-6 w-16 mb-2" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : stats ? (
            <>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="bg-primary text-white p-3 rounded-lg">
                      <ShoppingCart size={20} />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                      <p className="text-gray-text text-sm">Total Orders</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="bg-success text-white p-3 rounded-lg">
                      <Truck size={20} />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{stats.outForDelivery}</p>
                      <p className="text-gray-text text-sm">Out for Delivery</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="bg-warning text-white p-3 rounded-lg">
                      <Package size={20} />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{stats.inventoryItems}</p>
                      <p className="text-gray-text text-sm">Inventory Items</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="bg-blue-600 text-white p-3 rounded-lg">
                      <Users size={20} />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
                      <p className="text-gray-text text-sm">Total Customers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : null}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders Management */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button onClick={handleExportCustomers} className="bg-primary text-white hover:bg-primary-dark">
                  <Download className="mr-2" size={16} />
                  Export CSV
                </Button>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <Skeleton className="h-4 w-24 mb-2" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                    ))}
                  </div>
                ) : orders && orders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order ID
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Items
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {orders.slice(0, 10).map((order, index) => (
                          <tr key={order.id} className={index % 2 === 1 ? "bg-gray-50" : ""}>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{order.orderNumber}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              Customer #{order.userId}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {JSON.parse(order.items).map((item: any) => 
                                `${item.name} × ${item.quantity}`
                              ).join(', ').substring(0, 30)}...
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              ₹{order.totalAmount}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <Badge variant={getStatusVariant(order.status)}>
                                {ORDER_STATUS_LABELS[order.status as keyof typeof ORDER_STATUS_LABELS]}
                              </Badge>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm">
                              {order.status !== "delivered" && (
                                <Button
                                  variant="link"
                                  className="text-primary hover:text-primary-dark mr-3 p-0"
                                  onClick={() => {
                                    const nextStatus = order.status === "processing" ? "out_for_delivery" : "delivered";
                                    updateOrderMutation.mutate({ orderId: order.id, status: nextStatus });
                                  }}
                                  disabled={updateOrderMutation.isPending}
                                >
                                  Update
                                </Button>
                              )}
                              <Button variant="link" className="text-gray-400 hover:text-gray-600 p-0">
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-text">
                    <p>No orders found.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Inventory Management */}
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Inventory Levels</CardTitle>
                <Button variant="outline">
                  <Plus className="mr-2" size={16} />
                  Add Stock
                </Button>
              </CardHeader>
              <CardContent>
                {inventoryLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <Skeleton className="h-12 w-12 rounded-lg mr-4" />
                          <div>
                            <Skeleton className="h-4 w-32 mb-2" />
                            <Skeleton className="h-3 w-20" />
                          </div>
                        </div>
                        <div className="text-right">
                          <Skeleton className="h-6 w-12 mb-1" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : inventory && inventory.length > 0 ? (
                  <div className="space-y-4">
                    {inventory.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mr-4">
                            <Package className="text-primary" size={20} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-text">Current Stock</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">{item.stock}</p>
                          <p className={`text-sm ${getStockStatusColor(item.status)}`}>{item.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-text">
                    <p>No inventory data available.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Customer Export */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                    <Users className="mx-auto mb-4 text-gray-400" size={48} />
                    <p className="font-medium text-gray-900 mb-2">Export Customer Data</p>
                    <p className="text-sm text-gray-text mb-4">Download complete customer database in CSV format</p>
                    <Button onClick={handleExportCustomers} className="bg-primary text-white hover:bg-primary-dark">
                      <Download className="mr-2" size={16} />
                      Export CSV
                    </Button>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-text">
                      ℹ️ Customer data is automatically backed up daily
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    onClick={() => handleQuickAction("Generate Delivery Routes")}
                    className="w-full bg-primary text-white hover:bg-primary-dark justify-start"
                  >
                    <Package className="mr-3" size={16} />
                    Generate Delivery Routes
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction("Send Delivery Reminders")}
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    📧 Send Delivery Reminders
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction("Process Subscription Payments")}
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    💳 Process Subscription Payments
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction("Generate Reports")}
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    📊 Generate Reports
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Payment Gateway</span>
                    <Badge className="bg-success text-white">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Delivery Tracking</span>
                    <Badge className="bg-success text-white">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Email Service</span>
                    <Badge className="bg-success text-white">Running</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Database</span>
                    <Badge className="bg-success text-white">Healthy</Badge>
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
