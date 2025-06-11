import { Link, useLocation } from "wouter";
import { ShoppingCart, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { SITE_CONFIG } from "@/lib/constants";

export default function Navbar() {
  const [location] = useLocation();
  const { cart } = useCart();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/subscriptions", label: "Subscriptions" },
    { path: "/about", label: "About" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/admin", label: "Admin" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex-shrink-0 flex items-center cursor-pointer">
                <Droplet className="text-primary text-2xl mr-2" />
                <span className="font-bold text-xl text-gray-900">{SITE_CONFIG.name}</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <button
                    className={`${
                      location === item.path
                        ? "text-gray-900"
                        : "text-gray-text hover:text-primary"
                    } px-3 py-2 rounded-md text-sm font-medium transition duration-150`}
                  >
                    {item.label}
                  </button>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <ShoppingCart className="text-gray-text hover:text-primary cursor-pointer text-lg" />
              {cart.totalItems > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center p-0"
                >
                  {cart.totalItems}
                </Badge>
              )}
            </div>
            <Button className="bg-primary text-white hover:bg-primary-dark">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
