import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

export default function ProductCard({ product, showAddToCart = true }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const getStockStatus = () => {
    if (product.stock > 100) return { label: "In Stock", variant: "secondary" as const };
    if (product.stock > 50) return { label: "Low Stock", variant: "outline" as const };
    return { label: "Critical", variant: "destructive" as const };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-smooth overflow-hidden">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
          <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
        </div>
        
        <p className="text-gray-text mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <span className="text-gray-text text-sm ml-2">(124 reviews)</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">₹{product.price}</span>
            {product.category === 'bulk' && (
              <span className="text-gray-text text-sm line-through ml-2">
                ₹{(parseFloat(product.price) * 1.25).toFixed(2)}
              </span>
            )}
          </div>
          {showAddToCart && (
            <Button 
              onClick={handleAddToCart}
              className="bg-primary text-white hover:bg-primary-dark hover:text-white"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2" size={16} />
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
