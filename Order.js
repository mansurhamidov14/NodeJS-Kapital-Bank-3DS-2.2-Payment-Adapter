const { stringifyUrlParams } = require("./helpers");

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
    return this.#hppUrl + stringifyUrlParams({ id: this.id, password: this.password });
  }
}

module.exports.Order = Order;