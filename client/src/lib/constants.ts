export const SITE_CONFIG = {
  name: "AquaFresh",
  description: "Premium water delivery service with subscription plans. Fresh, clean water delivered to your doorstep daily.",
  tagline: "Pure Water, Delivered Fresh",
};

export const ORDER_STATUS = {
  PROCESSING: "processing",
  OUT_FOR_DELIVERY: "out_for_delivery", 
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PROCESSING]: "Processing",
  [ORDER_STATUS.OUT_FOR_DELIVERY]: "Out for Delivery",
  [ORDER_STATUS.DELIVERED]: "Delivered",
  [ORDER_STATUS.CANCELLED]: "Cancelled",
} as const;

export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
} as const;

export const SUBSCRIPTION_STATUS = {
  ACTIVE: "active",
  CANCELLED: "cancelled",
  EXPIRED: "expired",
} as const;

export const PRODUCT_CATEGORIES = {
  BOTTLES: "bottles",
  CANS: "cans",
  BULK: "bulk",
} as const;

export const DELIVERY_SLOTS = [
  "6:00 AM - 9:00 AM",
  "9:00 AM - 12:00 PM", 
  "12:00 PM - 3:00 PM",
  "3:00 PM - 6:00 PM",
  "6:00 PM - 9:00 PM",
];

export const CONTACT_INFO = {
  phone: "+91 98765 43210",
  email: "support@aquafresh.com",
  address: "123 Water Street, New Delhi, 110001",
  businessHours: {
    weekdays: "Mon-Sat: 6:00 AM - 10:00 PM",
    weekend: "Sun: 8:00 AM - 8:00 PM",
  },
};
