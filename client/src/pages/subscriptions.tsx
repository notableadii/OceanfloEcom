import { useQuery } from "@tanstack/react-query";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import type { SubscriptionPlan } from "@shared/schema";

export default function Subscriptions() {
  const { toast } = useToast();
  const { data: plans, isLoading, error } = useQuery<SubscriptionPlan[]>({
    queryKey: ["/api/subscription-plans"],
  });

  const handleSubscribe = (plan: SubscriptionPlan) => {
    toast({
      title: "Subscription Selected",
      description: `You've selected the ${plan.name}. Redirecting to checkout...`,
    });
    // Here you would implement actual subscription logic
  };

  if (error) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Plans</h1>
          <p className="text-gray-text">Failed to load subscription plans. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Subscription Plans</h1>
          <p className="text-gray-text text-lg max-w-2xl mx-auto">
            Choose a subscription plan that fits your needs. 
            Enjoy regular delivery, priority service, and exclusive discounts.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="text-center">
                  <Skeleton className="h-8 w-32 mx-auto mb-4" />
                  <Skeleton className="h-12 w-24 mx-auto mb-6" />
                  <div className="space-y-3 mb-8">
                    {[...Array(4)].map((_, j) => (
                      <Skeleton key={j} className="h-5 w-full" />
                    ))}
                  </div>
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : plans && plans.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {plans.map((plan, index) => (
                <div 
                  key={plan.id}
                  className={`bg-white rounded-xl shadow-sm p-8 relative transition-smooth ${
                    index === 1 
                      ? "border-2 border-primary scale-105 shadow-lg" 
                      : "border border-gray-200 hover:shadow-md"
                  }`}
                >
                  {index === 1 && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Badge className="bg-primary text-white px-4 py-1">
                        <Star className="mr-1" size={12} />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-primary">₹{plan.price}</span>
                      <span className="text-gray-text">/{plan.duration === 'weekly' ? 'week' : plan.duration === 'monthly' ? 'month' : 'year'}</span>
                      {plan.duration === 'yearly' && (
                        <div className="text-sm text-success">Save ₹41,000</div>
                      )}
                    </div>
                    
                    <ul className="text-left space-y-3 mb-8">
                      {plan.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="text-success mr-3 flex-shrink-0" size={16} />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      onClick={() => handleSubscribe(plan)}
                      className="w-full bg-primary text-white hover:bg-primary-dark"
                    >
                      Choose {plan.name.split(' ')[0]}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Plan Comparison</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Feature
                      </th>
                      {plans.map(plan => (
                        <th key={plan.id} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {plan.name.split(' ')[0]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Priority Delivery</td>
                      {plans.map(plan => (
                        <td key={plan.id} className="px-6 py-4 whitespace-nowrap text-center">
                          <Check className="text-success mx-auto" size={16} />
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Discount Rate</td>
                      {plans.map(plan => (
                        <td key={plan.id} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                          {plan.discount}%
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Free Signup Gift</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-gray-400">✕</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-gray-400">✕</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <Check className="text-success mx-auto" size={16} />
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">24/7 Support</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-gray-400">✕</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <Check className="text-success mx-auto" size={16} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <Check className="text-success mx-auto" size={16} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Plans Available</h2>
            <p className="text-gray-text">Please check back later for our subscription plans.</p>
          </div>
        )}
      </div>
    </div>
  );
}
