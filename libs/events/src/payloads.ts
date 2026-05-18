export interface CreateOrderPayload {
  userId: string;
  items: { productId: string; quantity: number; price: number }[];
}

export interface CreateUserPayload {
  email: string;
  password: string;
  name: string;
}

export interface CheckStockPayload {
  productId: string;
  quantity: number;
}

export interface SendEmailPayload {
  to: string;
  subject: string;
  body: string;
}

export interface ProcessPaymentPayload {
  orderId: string;
  amount: number;
  currency: string;
  userId: string;
}
