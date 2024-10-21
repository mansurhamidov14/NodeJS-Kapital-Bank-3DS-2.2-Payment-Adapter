const { BaseOrderStatus } = require('./BaseOrderStatus');

class OrderStatus extends BaseOrderStatus {
  typeRid;
  type;

  constructor(options) {
    super();
    Object.keys(options).forEach(key => {
      this[key] = options[key];
    });
  }
}

module.exports.OrderStatus = OrderStatus;
