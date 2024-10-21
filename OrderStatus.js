const { BaseOrderStatus } = require('./BaseOrderStatus');

class OrderStatus extends BaseOrderStatus {
  typeRid;
  type;
}

module.exports.OrderStatus = OrderStatus;
