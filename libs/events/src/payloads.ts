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

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface JwtPayload {
  sub: string; // user id
  email: string;
  iat?: number;
  exp?: number;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
