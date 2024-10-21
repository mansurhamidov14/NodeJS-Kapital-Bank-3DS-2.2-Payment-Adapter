/** @typedef {('Order_SMS'|'Order_DMS'|'Order_REC')} TypeRid */

/** 
 * @typedef {Object} PaymentGatewayConstructorOptions 
 * @property {string} login
 * @property {string} password
 * @property {boolean|undefined} isDev
 * @property {string|null|undefined} paymentHost
*/

/**
 * @typedef {('Cit'|'PartialShipment'|'Instalment'|'Recurring'|'UnspecifiedMit'|'DelayedCharge'|string)} CofCapturePurpose
 */

/**
 * @typedef {Object} CreateOrderOptions
 * @property {number} amount
 * @property {string|null|undefined} currency
 * @property {string} description
 * @property {string} redirectUrl
 * @property {string|null|undefined} language
 * @property {(CofCapturePurpose[] | null | undefined)} cofCapturePurposes
 */

/** 
 * @typedef {Object} OrderConstructorOptions 
 * @property {string|number} id
 * @property {string} password
 * @property {string|undefined} secret
 * @property {string} hppUrl
*/

/**
 * @typedef {Object} RefundMatch
 * @property {string} tranActionId
 * @property {string} ridByPmo
 */

/**
 * @typedef {Object} RefundResponse
 * @property {string} approvalCode
 * @property {string} pmoResultCode
 * @property {RefundMatch} match
 */

/**
 * @typedef {Object} RefundOptions
 * @property {string|number} id
 * @property {string} password
 * @property {number} amount
 * @property {string|null|undefined} phase
 */

/**
 * @typedef {Object} OrderStatusOptions
 * @property {string|number} id
 * @property {string} password
 */

/**
 * @typedef {('Declined'|'Preparing'|'FullyPaid'|'Cancelled'|'Expired'|'Refunded')} OrderStatusValue
 */
