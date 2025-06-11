import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import ServiceChecker from "@/components/service-checker";
import ProductCard from "@/components/product-card";
import { SITE_CONFIG } from "@/lib/constants";
import type { Product } from "@shared/schema";

export default function Home() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredProducts = products?.slice(0, 3) || [];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative hero-gradient">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Pure Water,<br />
              <span className="text-blue-200">Delivered Fresh</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {SITE_CONFIG.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/subscriptions">
                <Button className="bg-white text-primary px-8 py-3 text-lg hover:bg-gray-100">
                  View Subscription Plans
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="border-2 border-white text-white px-8 py-3 text-lg hover:bg-white hover:text-primary">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Service Area Checker */}
      <ServiceChecker />

      {/* Featured Products */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-text text-lg">Premium quality water products for every need</p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="w-full h-48 bg-gray-200 loading-shimmer"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded loading-shimmer mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded loading-shimmer mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded loading-shimmer"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
