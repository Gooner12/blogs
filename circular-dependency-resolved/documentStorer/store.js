const { v4: uuidv4 } = require("uuid");
const accessIdProvider = require("../accessProvider/access-id-provider");
const VerifyDocument = require("../verifyDocuments/verify");

class StoreDocument {
  storedRecord;
  #membershipNumber;
  constructor(name, age, personalID) {
    this.name = name;
    this.age = age;
    this.personalID = personalID;
    this.#membershipNumber = uuidv4();
    this.record = {
      verifiedName: this.name,
      verifiedMembershipNumber: this.#membershipNumber,
      verifiedAge: this.age,
    };
  }

  storeRecord() {
    this.storedRecord = { [this.personalID]: this.record };
  }

  getRecord(personalID, verifierAccessID) {
    const storerAccessCode = accessIdProvider.getAccessCode();
    const storerAccessID = `${this.personalID}-${storerAccessCode}`;
    if (storerAccessID.localeCompare(verifierAccessID) === 0)
      return this.storedRecord[personalID];
    return null;
  }
}

module.exports = StoreDocument;
