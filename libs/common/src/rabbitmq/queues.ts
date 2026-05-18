export const QUEUES = {
  USER: 'user_queue',
  ORDER: 'order_queue',
  PAYMENT: 'payment_queue',
  INVENTORY: 'inventory_queue',
  NOTIFICATION: 'notification_queue',
  SHIPPING: 'shipping_queue',
  CATALOG: 'catalog_queue',
} as const;

export const SERVICES = {
  USER: 'USER_SERVICE',
  ORDER: 'ORDER_SERVICE',
  PAYMENT: 'PAYMENT_SERVICE',
  INVENTORY: 'INVENTORY_SERVICE',
  NOTIFICATION: 'NOTIFICATION_SERVICE',
  SHIPPING: 'SHIPPING_SERVICE',
  CATALOG: 'CATALOG_SERVICE',
} as const;
