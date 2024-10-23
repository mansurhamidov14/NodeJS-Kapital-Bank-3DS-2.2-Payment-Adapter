const { BaseOrderStatus } = require('./BaseOrderStatus');

class DetailedOrderStatus extends BaseOrderStatus {
  hppUrl;
  hppRedirectUrl;
  password;
  terminal;
  srcAmount;
  srcAmountFull;
  srcCurrency;
  dstAmount;
  dstCurrency;
  trans;
  cvv2AuthStatus;
  tdsV1AuthStatus;
  tdsV2AuthStatus;
  tdsServerUrl;
  authorizedChargeAmount;
  clearedChargeAmount;
  clearedRefundAmount;
  title;
  description;
  language;
  srcToken;
  merchant;
  initiationEnvKind;
  type;
  hppCofCapturePurposes;
  custAttrs;
  reportPubs;

  constructor(options) {
    super();
    Object.keys(options).forEach(key => {
      this[key] = options[key];
    });
  }
}

module.exports.DetailedOrderStatus = DetailedOrderStatus;
