let instance = null;
const twilio = require("twilio")(
  // "AC364bfb45095c3913241d7f52169dea5c",
  // "8b499a7f307ac312a1fca57bdbad5dc1"
  "AC364bfb45095c3913241d7f52169dea5c",
  "8b499a7f307ac312a1fca57bdbad5dc1"
);

class SingletonTwilioClass {
  getIceServers() {
    return twilio.tokens
      .create()
      .then((response) => response)
      .catch((e) => {});
  }

  static getInstance() {
    if (!instance) {
      instance = new SingletonTwilioClass();
    }

    return instance;
  }
}

module.exports = SingletonTwilioClass;
