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

  isDeclined() {
    return this.status === BaseOrderStatus.DECLINED;
  }

  isCanceled() {
    return this.status === BaseOrderStatus.CANCELED;
  }

  isFullyPaid() {
    return this.status === BaseOrderStatus.FULLY_PAID;
  }

  isRefunded() {
    return this.status === BaseOrderStatus.REFUNDED;
  }

  isExpired() {
    return this.status === BaseOrderStatus.EXPIRED;
  }

  isPreparing() {
    return this.status === BaseOrderStatus.PREPARING;
  }

  isOneOf(statuses) {
    return statuses.includes(this.status);
  }
}

module.exports.BaseOrderStatus = BaseOrderStatus;
