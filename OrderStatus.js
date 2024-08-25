class OrderStatus {
  /**
   * Order ID 
   * @type {string} */
  id;

  /**
   * Order status
   * @type {OrderStatusValue}
   */
  status;

  /**
   * Order type
   * @type {TypeRid}
   */
  typeRid;

  /**
   * Previous status
   * @type {OrderStatusValue}
   */
  prevStatus;

  /**
   * @type {string}
   */
  lastStatusLogin;

  /**
   * @type {number}
   */
  amount;

  /**
   * @type {string}
   */
  currency;

  /**
   * @type {string}
   */
  createTime;

  /**
   * @type {string}
   */
  finishTime;

  /**
   * @type {Object}
   */
  type;

  static DECLINED = 'Declined';
  static PREPARING = 'Preparing';
  static FULLY_PAID = 'FullyPaid';
  static CANCELED = 'Cancelled';
  static EXPIRED = 'Expired';
  static REFUNDED = 'Refunded';

  /**
   * OrderStatus constructor
   * @param {OrderStatusConstructorOptions} options 
   */
  constructor(options) {
    Object.keys(options).forEach(key => {
      this[key] = options[key];
    });
  }

  isDeclined() {
    return this.status === OrderStatus.DECLINED;
  }

  isCanceled() {
    return this.status === OrderStatus.CANCELED;
  }

  isFullyPaid() {
    return this.status === OrderStatus.FULLY_PAID;
  }

  isRefunded() {
    return this.status === OrderStatus.REFUNDED;
  }

  isExpired() {
    return this.status === OrderStatus.EXPIRED;
  }

  isPreparing() {
    return this.status === OrderStatus.PREPARING;
  }

  /**
   * @param {Array.<OrderStatusValue>} statuses 
   */
  isOneOf(statuses) {
    return statuses.includes(this.status);
  }
}

module.exports.OrderStatus = OrderStatus;
