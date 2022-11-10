const { v4: uuidv4 } = require("uuid");

class AccessIdProvider {
  #accessCode = uuidv4();
  constructor() {
    this.accessCode = this.#accessCode;
  }

  getAccessCode() {
    return this.accessCode;
  }
}

const accessIdProvider = new AccessIdProvider();
Object.freeze(accessIdProvider);
module.exports = accessIdProvider;
