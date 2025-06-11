import {
  users,
  products,
  subscriptionPlans,
  subscriptions,
  orders,
  servicePincodes,
  type User,
  type InsertUser,
  type Product,
  type InsertProduct,
  type SubscriptionPlan,
  type InsertSubscriptionPlan,
  type Subscription,
  type InsertSubscription,
  type Order,
  type InsertOrder,
  type ServicePincode,
  type InsertServicePincode,
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;

  // Products
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;

  // Subscription Plans
  getAllSubscriptionPlans(): Promise<SubscriptionPlan[]>;
  getSubscriptionPlan(id: number): Promise<SubscriptionPlan | undefined>;

  // Subscriptions
  getSubscriptionsByUser(userId: number): Promise<Subscription[]>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  updateSubscription(id: number, subscription: Partial<InsertSubscription>): Promise<Subscription | undefined>;

  // Orders
  getAllOrders(): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  getOrdersByUser(userId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: number, order: Partial<InsertOrder>): Promise<Order | undefined>;

  // Service Pincodes
  checkServiceAvailability(pincode: string): Promise<boolean>;
  getAllServicePincodes(): Promise<ServicePincode[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private products: Map<number, Product> = new Map();
  private subscriptionPlans: Map<number, SubscriptionPlan> = new Map();
  private subscriptions: Map<number, Subscription> = new Map();
  private orders: Map<number, Order> = new Map();
  private servicePincodes: Map<string, ServicePincode> = new Map();
  
  private currentUserId = 1;
  private currentProductId = 1;
  private currentSubscriptionPlanId = 1;
  private currentSubscriptionId = 1;
  private currentOrderId = 1;
  private currentServicePincodeId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed products
    const productsData: InsertProduct[] = [
      {
        name: "500ml Premium Water",
        description: "Natural spring water with essential minerals. Perfect for daily hydration needs.",
        price: "25.00",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "bottles",
        stock: 847,
        isActive: true,
      },
      {
        name: "1L Family Pack",
        description: "Large capacity bottle ideal for families and office use. Enhanced with minerals.",
        price: "45.00",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "bottles",
        stock: 234,
        isActive: true,
      },
      {
        name: "20L Dispenser Can",
        description: "High-capacity water can for dispenser use. Perfect for offices and large families.",
        price: "180.00",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "cans",
        stock: 166,
        isActive: true,
      },
      {
        name: "500ml Bulk Pack (24)",
        description: "24-bottle pack with significant savings. Perfect for events and bulk orders.",
        price: "480.00",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "bulk",
        stock: 89,
        isActive: true,
      },
      {
        name: "1L Bulk Pack (12)",
        description: "12-bottle family pack with convenient packaging and bulk pricing.",
        price: "432.00",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "bulk",
        stock: 67,
        isActive: true,
      },
      {
        name: "Premium 20L Can",
        description: "Ultra-pure water with advanced filtration. Perfect for premium dispenser use.",
        price: "220.00",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "cans",
        stock: 145,
        isActive: true,
      },
    ];

    productsData.forEach(product => {
      const id = this.currentProductId++;
      this.products.set(id, { ...product, id });
    });

    // Seed subscription plans
    const plansData: InsertSubscriptionPlan[] = [
      {
        name: "Weekly Plan",
        price: "1000.00",
        duration: "weekly",
        discount: 5,
        benefits: ["Priority delivery slots", "5% discount on each can", "Weekly delivery schedule", "Customer support priority"],
        isActive: true,
      },
      {
        name: "Monthly Plan",
        price: "4500.00",
        duration: "monthly",
        discount: 10,
        benefits: ["Priority delivery slots", "10% discount on all orders", "Flexible delivery schedule", "Free delivery tracking", "24/7 customer support"],
        isActive: true,
      },
      {
        name: "Yearly Plan",
        price: "13000.00",
        duration: "yearly",
        discount: 15,
        benefits: ["Priority delivery slots", "15% discount on all orders", "Free signup gift", "VIP customer support", "Free dispenser maintenance"],
        isActive: true,
      },
    ];

    plansData.forEach(plan => {
      const id = this.currentSubscriptionPlanId++;
      this.subscriptionPlans.set(id, { ...plan, id });
    });

    // Seed service pincodes
    const pincodes = [
      { pincode: "110001", area: "Connaught Place, New Delhi" },
      { pincode: "110002", area: "Darya Ganj, New Delhi" },
      { pincode: "110003", area: "Nizamuddin, New Delhi" },
      { pincode: "110004", area: "Rashtrapati Bhawan, New Delhi" },
      { pincode: "110005", area: "Karol Bagh, New Delhi" },
      { pincode: "400001", area: "Mumbai Fort, Mumbai" },
      { pincode: "400002", area: "Kalbadevi, Mumbai" },
      { pincode: "560001", area: "Bangalore City, Bangalore" },
      { pincode: "560002", area: "Bangalore GPO, Bangalore" },
    ];

    pincodes.forEach(data => {
      const id = this.currentServicePincodeId++;
      this.servicePincodes.set(data.pincode, { ...data, id, isActive: true });
    });

    // Seed sample user
    const sampleUser: InsertUser = {
      email: "john.doe@example.com",
      name: "John Doe",
      phone: "+91 98765 43210",
      address: "123 Main Street, New Delhi",
      pincode: "110001",
    };
    const userId = this.currentUserId++;
    this.users.set(userId, { ...sampleUser, id: userId, createdAt: new Date() });

    // Seed sample orders
    const sampleOrders: InsertOrder[] = [
      {
        userId: 1,
        items: JSON.stringify([{ productId: 3, quantity: 2, name: "20L Dispenser Can", price: "180.00" }]),
        totalAmount: "360.00",
        status: "processing",
        deliveryAddress: "123 Main Street, New Delhi",
        deliveryPincode: "110001",
        paymentStatus: "paid",
        deliveryDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      {
        userId: 1,
        items: JSON.stringify([{ productId: 4, quantity: 1, name: "500ml Bulk Pack (24)", price: "480.00" }]),
        totalAmount: "480.00",
        status: "out_for_delivery",
        deliveryAddress: "123 Main Street, New Delhi",
        deliveryPincode: "110001",
        paymentStatus: "paid",
        deliveryDate: new Date(),
      },
      {
        userId: 1,
        items: JSON.stringify([{ productId: 5, quantity: 1, name: "1L Bulk Pack (12)", price: "432.00" }]),
        totalAmount: "432.00",
        status: "delivered",
        deliveryAddress: "123 Main Street, New Delhi",
        deliveryPincode: "110001",
        paymentStatus: "paid",
        deliveryDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ];

    sampleOrders.forEach(order => {
      const id = this.currentOrderId++;
      const orderNumber = `WTR-2024-${String(id).padStart(3, '0')}`;
      this.orders.set(id, { ...order, id, orderNumber, createdAt: new Date() });
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const newUser: User = { ...user, id, createdAt: new Date() };
    this.users.set(id, newUser);
    return newUser;
  }

  async updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined> {
    const existingUser = this.users.get(id);
    if (!existingUser) return undefined;
    
    const updatedUser = { ...existingUser, ...user };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Products
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.isActive);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const newProduct: Product = { ...product, id };
    this.products.set(id, newProduct);
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) return undefined;
    
    const updatedProduct = { ...existingProduct, ...product };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  // Subscription Plans
  async getAllSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return Array.from(this.subscriptionPlans.values()).filter(plan => plan.isActive);
  }

  async getSubscriptionPlan(id: number): Promise<SubscriptionPlan | undefined> {
    return this.subscriptionPlans.get(id);
  }

  // Subscriptions
  async getSubscriptionsByUser(userId: number): Promise<Subscription[]> {
    return Array.from(this.subscriptions.values()).filter(sub => sub.userId === userId);
  }

  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    const id = this.currentSubscriptionId++;
    const newSubscription: Subscription = { ...subscription, id, createdAt: new Date() };
    this.subscriptions.set(id, newSubscription);
    return newSubscription;
  }

  async updateSubscription(id: number, subscription: Partial<InsertSubscription>): Promise<Subscription | undefined> {
    const existingSub = this.subscriptions.get(id);
    if (!existingSub) return undefined;
    
    const updatedSub = { ...existingSub, ...subscription };
    this.subscriptions.set(id, updatedSub);
    return updatedSub;
  }

  // Orders
  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter(order => order.userId === userId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const orderNumber = `WTR-2024-${String(id).padStart(3, '0')}`;
    const newOrder: Order = { ...order, id, orderNumber, createdAt: new Date() };
    this.orders.set(id, newOrder);
    return newOrder;
  }

  async updateOrder(id: number, order: Partial<InsertOrder>): Promise<Order | undefined> {
    const existingOrder = this.orders.get(id);
    if (!existingOrder) return undefined;
    
    const updatedOrder = { ...existingOrder, ...order };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  // Service Pincodes
  async checkServiceAvailability(pincode: string): Promise<boolean> {
    const serviceArea = this.servicePincodes.get(pincode);
    return serviceArea?.isActive ?? false;
  }

  async getAllServicePincodes(): Promise<ServicePincode[]> {
    return Array.from(this.servicePincodes.values()).filter(pincode => pincode.isActive);
  }
}

export const storage = new MemStorage();
