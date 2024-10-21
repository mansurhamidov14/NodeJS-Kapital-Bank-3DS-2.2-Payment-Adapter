class BaseOrderStatus {
  id;
  status;
  prevStatus;
  lastStatusLogin;
  amount;
  currency;
  createTime;
  finishTime;

  static DECLINED = 'Declined';
  static PREPARING = 'Preparing';
  static FULLY_PAID = 'FullyPaid';
  static CANCELED = 'Cancelled';
  static EXPIRED = 'Expired';
  static REFUNDED = 'Refunded';

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

  isOneOf(statuses) {
    return statuses.includes(this.status);
  }
}

module.exports.BaseOrderStatus = BaseOrderStatus;
