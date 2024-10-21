export type OrderConstructorOptions = {
  id: string | number;
  password: string;
  secret?: string;
  hppUrl: string;
};

export type OrderStatusValue =
  | "Declined"
  | "Preparing"
  | "FullyPaid"
  | "Cancelled"
  | "Expired"
  | "Refunded";

export type OrderType = "Order_SMS" | "Order_DMS" | "Order_REC";

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

interface BaseOrderStatusConstructorOptions {
  id: number;
  status: OrderStatusValue;
  prevStatus?: OrderStatusValue;
  lastStatusLogin: string;
  amount: number;
  currency: string;
  createTime: string;
  finishTime?: string;
}

type OrderStatusType = {
  title: string;
}

export interface OrderStatusConstructorOptions extends BaseOrderStatusConstructorOptions {
  typeRid: OrderType;
  type: OrderStatusType;
}

declare abstract class BaseOrderStatus {
  public id: number;
  public status: OrderStatusValue;
  public prevStatus: OrderStatusValue;
  public lastStatusLogin: string;
  public amount: number;
  public currency: string;
  public createTime: string;
  public finishTime: string;

  isDeclined(): boolean;
  isExpired(): boolean;
  isCanceled(): boolean;
  isPreparing(): boolean;
  isFullyPaid(): boolean;
  isRefunded(): boolean;
  isOneOf(statuses: OrderStatusValue): boolean;
}

export class OrderStatus extends BaseOrderStatus {
  public typeRid: OrderType;
  public type: OrderStatusType;

  constructor(options: OrderConstructorOptions);
}

type PaymentGatewayConstructorOptions = {
  login: string;
  password: string;
  /** Flag for conducting tests in Kapital Bank's test environment */
  isDev?: boolean;
  /** You don't need to pass this option It was added just in case Kapital Bank changes host address */
  paymentHost?: string;
};

export type CofCapturePurpose =
  | "Cit"
  | "PartialShipment"
  | "Instalment"
  | "Recurring"
  | "UnspecifiedMit"
  | "DelayedCharge"
  | string;

export type CreateOrderOptions = {
  amount: number;
  description: string;
  redirectUrl: string;
  currency?: string | null;
  language?: string | null;
  cofCapturePurposes?: CofCapturePurpose[];
};

type RestoreOrderOptions = Omit<OrderConstructorOptions, "hppUrl">;

export type RefundOptions = {
  id: string | number;
  password: string;
  amount: number;
  phase?: string;
};

export type RefundResponse = {
  approvalCode: string;
  match: {
    tranActionId: string;
    ridByPmo: string;
  };
  pmoResultCode: string;
};

export type GetOrderStatusOptions = {
  id: string | number;
  password: string;
};

export class PaymentGateway {
  constructor(options: PaymentGatewayConstructorOptions);
  createOrder(options: CreateOrderOptions, type: OrderType): Promise<Order>;
  createPurchaseOrder(options: CreateOrderOptions): Promise<Order>;
  createPreAuthOrder(options: CreateOrderOptions): Promise<Order>;
  createRecurringOrder(options: CreateOrderOptions): Promise<Order>;
  restoreOrder(options: RestoreOrderOptions): Order;
  refund(options: RefundOptions): Promise<RefundResponse>;
  getOrderStatus(options: GetOrderStatusOptions): Promise<OrderStatus>;
  getDetailedOrderStatus(options: GetOrderStatusOptions): Promise<DetailedOrderStatus>;
}

export interface DetailedOrderStatusConstructorOptions extends BaseOrderStatusConstructorOptions {
  hppUrl: string;
  hppRedirectUrl: string;
  password: string;
  terminal: Terminal;
  srcAmount: number;
  srcAmountFull: number;
  srcCurrency: string;
  dstAmount: number;
  dstCurrency: string;
  trans: Tran[];
  cvv2AuthStatus: string;
  tdsV1AuthStatus: string;
  tdsV2AuthStatus: string;
  tdsServerUrl: string;
  authorizedChargeAmount: number;
  clearedChargeAmount: number;
  clearedRefundAmount: number;
  title: string;
  description: string;
  language: string;
  srcToken: SrcToken;
  merchant: Merchant;
  initiationEnvKind: string;
  type: DetailedOrderType;
  hppCofCapturePurposes: CofCapturePurpose[];
  custAttrs: unknown[];
  reportPubs: unknown;
}

export class DetailedOrderStatus extends BaseOrderStatus {
  public hppUrl: string;
  public hppRedirectUrl: string;
  public password: string;
  public terminal: Terminal;
  public srcAmount: number;
  public srcAmountFull: number;
  public srcCurrency: string;
  public dstAmount: number;
  public dstCurrency: string;
  public trans: Tran[];
  public cvv2AuthStatus: string;
  public tdsV1AuthStatus: string;
  public tdsV2AuthStatus: string;
  public tdsServerUrl: string;
  public authorizedChargeAmount: number;
  public clearedChargeAmount: number;
  public clearedRefundAmount: number;
  public title: string;
  public description: string;
  public language: string;
  public srcToken: SrcToken;
  public merchant: Merchant;
  public initiationEnvKind: string;
  public type: DetailedOrderType;
  public hppCofCapturePurposes: CofCapturePurpose[];
  public custAttrs: unknown[];
  public reportPubs: unknown;

  constructor(options: DetailedOrderStatusConstructorOptions);
}

export interface Merchant {
  id: number;
  rid: string;
  title: string;
  businessAddress: BusinessAddress;
  trustConsumerPhone: boolean;
}

export interface BusinessAddress {
  country: string;
  countryA2: string;
  countryN3: number;
}

interface SrcToken {
  id: number;
  paymentMethod: string;
  role: string;
  status: string;
  regTime: Date;
  entryMode: string;
  displayName: string;
  owner: unknown;
  card: Card;
}

interface Card {
  authentication: CardAuthentication;
  expiration: string;
  brand: string;
  issuerRid: string;
}

interface CardAuthentication {
  needCvv2: boolean;
  needTds: boolean;
  tranId: string;
  tdsDsTranId: string;
  timestamp: Date;
  tdsProtocolVer: string;
  cryptType: string;
  cryptVal: string;
  eci: string;
  tdsARes: string;
}

interface Terminal {
  id: number;
  rid: string;
  title: string;
  mcc: number;
  status: string;
}

interface Tran {
  approvalCode: string;
  actionId: string;
  orderId: number;
  terminalId: number;
  merchantId: number;
  billingStatus: string;
  isReversal: boolean;
  ridByAcquirer: string;
  ridByPmo: string;
  regTime: Date;
  clearAmount: number;
  clearCcy: string;
  amount: number;
  currency: string;
  description: string;
  phase: string;
  type: string;
  pmoResultCode: string;
}

interface DetailedOrderType {
  allowVoid: boolean;
  hppTranPhase: string;
  secretLength: number;
  title: string;
  rid: OrderType;
  paymentMethods: string[];
  cardBrands: string[];
  allowTdsAttempt: boolean;
  allowTdsCant: boolean;
  allowTdsChallenged: boolean;
  allowSurcharge: boolean;
  allowTranTypes: string[];
  allowTranPhases: string[];
  allowAuthKinds: string[];
  allowCofStoreUsages: CofCapturePurpose[];
  orderClass: string;
  allowCVV2: boolean;
}
