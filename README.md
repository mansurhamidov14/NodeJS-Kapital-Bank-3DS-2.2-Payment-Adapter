### *In the Name of God, the Merciful, the Compassionate*
_____________________________________________________

# Kapital Bank Payment Gateway integration library

## Table of Contents

- [1. Installation](#1-installation)
- [2. Usage](#2-usage)
    - [2.1 Initialize payment gateway adapter](#21-initialize-payment-gateway-adapter)
    - [2.2 Create order](#22-create-order)
    - [2.3 Refunding](#23-refunding)
    - [2.4 Get order status](#24-get-order-status)

## 1. Installation
```bash
npm i --save @twelver313/kapital-bank
```

## 2. Usage
### 2.1 Initialize payment gateway adapter
```javascript
import { PaymentGateway } from '@twelver313/kapital-bank';

const paymentGateway = new PaymentGateway([
  login: '<YOUR_LOGIN>',
  password: '<YOUR_PASSWORD>',
  isDev: true, // Optional flag for using Kapital-Bank's test environment
  /** You don't need to pass the option below. It was added just in case Kapital Bank changes host address */
  // paymentHost: 'https://txpgtst.kapitalbank.az'
]);
```

### 2.2 Create order
```javascript
const orderParams = {
  amount: 10, // i.e '10.00',
  currency: 'AZN', // Optional, 'AZN' by default
  description: 'Purchase order example', // Your description
  redirectUrl: '/your-redirect-url',
  language: 'az', // Optional, 'az' by default
};
/** Creating purchase order */
const order = await paymentGateway.createPurchaseOrder(orderParams);

/** Creating pre-auth order */
const order = await paymentGateway.createPreAuthOrder(orderParams);

/** Creating recurring order */
const order = await paymentGateway.createRecurringOrder(orderParams);

console.log(order.id) // 4595
console.log(order.password) // "8xjpd1ejxdma"
console.log(order.secret) // "312866"
console.log(order.url) // 'https://txpgtst.kapitalbank.az/flex?id=4595&password=8xjpd1ejxdma
```

### 2.3 Refunding
```javascript
const response = await paymentGateway.refund({
  id: 4595,
  password: '8xjpd1ejxdma',
  amount: 10, // i.e 10.00
  phase: 'Single', // Optional, 'Single' by default
});

// Response properties
console.log(response.approvalCode) // "963348"
console.log(response.match.tranActionId) // "240612-11391689-000tn7="
console.log(response.match.ridByPmo) // "17579348"
console.log(response.pmoResultCode) // "1"
```

### 2.4 Get order status
```javascript
import { OrderStatus } from '@twelver313/kapital-bank';

const orderStatus = await paymentGateway.getOrderStatus([
  id: 4595,
  password: '8xjpd1ejxdma'
]);
// or for more detailed status
const orderStatus = await paymentGateway.getDetailedOrderStatus([
  id: 4595,
  password: '8xjpd1ejxdma'
]);
const status = orderStatus.status;

// Do any stuff depending on status
if (status === OrderStatus.CANCELED) { // equivalent: orderStatus.isCanceled()
  ...
}
if (status === OrderStatus.DECLINED) { // equivalent: orderStatus.isDeclined()
  ...
}
if (status === OrderStatus.FULLY_PAID) { // equivalent: orderStatus.isFullyPaid()
  ...
}
if (status === OrderStatus.EXPIRED) { // equivalent: orderStatus.isExpired()
  ...
}
if (status === OrderStatus.REFUNDED) { // equivalent: orderStatus.isRefunded()
  ...
}
if (orderStatus.isOneOf([OrderStatus.CANCELED, OrderStatus.DECLINED])) {
  ...
}
```

### 2.5 Restore order
```javascript
const orderParams = {
  id: 4595,
  password: '8xjpd1ejxdma'
};
const orderStatus = await paymentGateway.getOrderStatus(orderParams);

/** Restoring order if it was not finished or expired */
if (orderStatus.isPreparing()) {
  const order = orderStatus.restoreOrder(orderParams);
  console.log(order.id) // 4595
  console.log(order.password) // "8xjpd1ejxdma"
  console.log(order.url) // 'https://txpgtst.kapitalbank.az/flex?id=4595&password=8xjpd1ejxdma
}
```
