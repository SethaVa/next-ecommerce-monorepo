export const ORDER_PATTERNS = {
  CREATE: 'order.create',
  GET_ALL: 'order.getAll',
  GET_ONE: 'order.getOne',
} as const;

export const USER_PATTERNS = {
  CREATE: 'user.create',
  GET_ONE: 'user.getOne',
  GET_ALL: 'user.getAll',
  VALIDATE: 'user.validate',
} as const;

export const INVENTORY_PATTERNS = {
  CHECK_STOCK: 'inventory.checkStock',
  RESERVE: 'inventory.reserve',
  RELEASE: 'inventory.release',
} as const;

export const NOTIFICATION_PATTERNS = {
  SEND_EMAIL: 'notification.sendEmail',
  SEND_SMS: 'notification.sendSms',
} as const;

export const PAYMENT_PATTERNS = {
  PROCESS: 'payment.process',
  REFUND: 'payment.refund',
} as const;
