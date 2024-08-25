export type OrderConstructorOptions = {
  id: string | number;
  password: string;
  secret?: string;
  hppUrl: string;
}

export type OrderStatusValue = 'Declined'|'Preparing'|'FullyPaid'|'Cancelled'|'Expired'|'Refunded';

export class Order {
  constructor(options: OrderConstructorOptions);
  public id: string;
  public password: string;
  public secret: string;
  public url: string;

  static DECLINED: OrderStatusValue;
  static PREPARING: OrderStatusValue;
  static FULLY_PAID: OrderStatusValue;
  static CANCELED: OrderStatusValue;
  static EXPIRED: OrderStatusValue;
  static REFUNDED: OrderStatusValue;
}

export type OrderStatusConstructorOptions = {
  id: number;
  status: OrderStatusValue;
  typeRid: TypeRid;
  prevStatus?: TypeRid;
  lastStatusLogin: string;
  amount: number;
  currency: string;
  createTime: string;
  finishTime?: string;
  type: {
    title: string
  };
}

export class OrderStatus {
  public id: number;
  public status: OrderStatusValue;
  public typeRid: TypeRid;
  public prevStatus: TypeRid;
  public lastStatusLogin: string;
  public amount: number;
  public currency: string;
  public createTime: string;
  public finishTime: string;
  public type: {
    title: string;
  };

  constructor(options: OrderConstructorOptions);
  isDeclined: () => boolean;
  isExpired: () => boolean;
  isCanceled: () => boolean;
  isPreparing: () => boolean;
  isFullyPaid: () => boolean;
  isRefunded: () => boolean;
}

type PaymentGatewayConstructorOptions = {
  login: string;
  password: string;
  isDev?: boolean;
  paymentHost?: string;
}

export type CreateOrderOptions = {
  amount: number;
  description: string;
  redirectUrl: string;
  currency?: string | null;
  language?: string | null;
}

export type OrderType = 'Order_SMS'|'Order_DMS'|'Order_REC';

type RestoreOrderOptions = Omit<OrderConstructorOptions, 'hppUrl'>;

export type RefundOptions = {
  id: string | number;
  password: string;
  amount: number;
  phase?: string;
}

export type RefundResponse = {
  approvalCode: string;
  match: {
    tranActionId: string;
    ridByPmo: string;
  };
  pmoResultCode: string;
}

export type GetOrderStatusOptions = {
  id: string | number;
  password: string;
}

export class PaymentGateway {
  constructor(options: PaymentGatewayConstructorOptions);
  createOrder(options: CreateOrderOptions, type: OrderType): Promise<Order>;
  createPurchaseOrder(options: CreateOrderOptions): Promise<Order>;
  createPreAuthOrder(options: CreateOrderOptions): Promise<Order>;
  createRecurringOrder(options: CreateOrderOptions): Promise<Order>;
  restoreOrder(options: RestoreOrderOptions): Order;
  refund(options: RefundOptions): Promise<RefundResponse>;
  getOrderStatus(options: GetOrderStatusOptions): Promise<OrderStatus>;
}