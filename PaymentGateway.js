const axios = require('axios');
const { Order } = require('./Order');
const { OrderStatus } = require('./OrderStatus');
const { DetailedOrderStatus } = require('./DetailedOrderStatus');
const PROD_HOST = 'https://e-commerce.kapitalbank.az';
const DEV_HOST = 'https://txpgtst.kapitalbank.az';
const DEFAULT_CURRENCY = 'AZN';
const DEFAULT_LANGUAGE = 'az';

class PaymentGateway {
  #requestHeaders;
  #paymentHost

  /**
   * @param {PaymentGatewayConstructorOptions} options
   */
  constructor(options) {
    if (!options.login) {
      throw new Error('Missing required parameter "login" for PaymentGateway constructor');
    }

    if (!options.password) {
      throw new Error('Missing required parameter "password" for PaymentGateway constructor')
    }

    this.#requestHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(`${options.login}:${options.password}`).toString('base64')}`
    };

    this.#paymentHost = options.paymentHost || (
      options.isDev ? DEV_HOST : PROD_HOST
    );
  }

  /**
   * @param {CreateOrderOptions} options
   * @param {TypeRid} type
   * @returns {Promise<Order>}
   */
  async createOrder(options, type) {
    const body = {
      order: {
        typeRid: type,
        amount: options.amount.toFixed(2),
        description: options.description,
        currency: options.currency || DEFAULT_CURRENCY,
        language: options.language || DEFAULT_LANGUAGE,
        hppRedirectUrl: options.redirectUrl
      }
    };

    if (options.cofCapturePurposes) {
      body.order.hppCofCapturePurposes = options.cofCapturePurposes;
    }

    const response = await axios.post(`${this.#paymentHost}/api/order`, body, {
      headers: this.#requestHeaders
    });

    return new Order(response.data.order);
  }

  /**
   * @param {CreateOrderOptions} options
   * @returns {Promise<Order>}
   */
  createPurchaseOrder(options) {
    return this.createOrder(options, Order.TYPE_PURCHASE);
  }

  /**
   * @param {CreateOrderOptions} options
   * @returns {Promise<Order>}
   */
  createPreAuthOrder(options) {
    return this.createOrder(options, Order.TYPE_PRE_AUTH);
  }

  /**
   * @param {CreateOrderOptions} options
   * @returns {Promise<Order>}
   */
  createRecurringOrder(options) {
    return this.createOrder(options, Order.TYPE_RECURRING);
  }

  /**
   * @param {OrderConstructorOptions} options
   * @returns {Order}
  */
  restoreOrder(options) {
    return new Order(options);
  }

  /**
   * @param {RefundOptions} options
   * @returns {Promise<RefundResponse>}
   */
  async refund(options) {
    const body = {
      tran: {
        phase: options.phase || 'Single',
        amount: options.amount.toFixed(2),
        type: 'Refund'
      }
    }
    const response = await axios.post(
      `${this.#paymentHost}/api/order/${id}/exec-tran`,
      body,
      {
        headers: this.#requestHeaders,
        params: { password: options.password }
      }
    );
    return response.data.tran;
  }

  /**
   * 
   * @param {string} id Id of order
   * @param {Object} params Object with URL params, including password as mandatory param
   * @returns {Promise<Object>}
   */
  #requestOrderStatus(id, params) {
    return axios.get(
      `${this.#paymentHost}/api/order/${id}`,
      {
        headers: this.#requestHeaders,
        params
      }
    );
  }

  /**
   * @param {OrderStatusOptions} options
   * @returns {Promise<OrderStatus>}
   */
  async getOrderStatus(options) {
    const response = await this.#requestOrderStatus(options.id, {
      password: options.password,
    });
    return new OrderStatus(response.data.order);
  }

   /**
   * @param {OrderStatusOptions} options
   * @returns {Promise<DetailedOrderStatus>}
   */
  async getDetailedOrderStatus(options) {
    const response = await this.#requestOrderStatus(options.id, {
      password: options.password,
      tranDetailLevel: 2,
      tokenDetailLevel: 2,
      orderDetailLevel: 2
    });

    return new DetailedOrderStatus(response.data.order)
  }
}

module.exports.PaymentGateway = PaymentGateway;