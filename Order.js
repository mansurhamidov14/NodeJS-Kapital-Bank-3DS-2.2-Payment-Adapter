const { stringify } = require('qs');

class Order {
  /**
   * @type {number}
   */
  id;

  /**
   * @type {string}
   */
  password;

  /**
   * @type {string}
   */
  secret;

  static TYPE_PURCHASE = 'Order_SMS';
  static TYPE_RECURRING = 'Order_REC';
  static TYPE_PRE_AUTH = 'Order_DMS';
  #hppUrl;

  /**
   * @param {OrderConstructorOptions} options
   */
  constructor(options) {
    this.id = Number(options.id);
    this.password = options.password;
    this.secret = options.secret;
    this.#hppUrl = options.hppUrl;
  }

  /**
   * @returns {string}
   */
  get url() {
    const searchParams = {
      id: this.id,
      password: this.password
    };
    return this.#hppUrl + stringify(searchParams, { addQueryPrefix: true });
  }
}

module.exports.Order = Order;