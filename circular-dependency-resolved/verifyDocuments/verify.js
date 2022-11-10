const StoreDocument = require("../documentStorer/store");
const accessIdProvider = require("../accessProvider/access-id-provider");
const { v4: uuidv4 } = require("uuid");

class VerifyDocument {
  // #accessCode = uuidv4();
  constructor(name, age, personalID) {
    this.name = name;
    this.age = age;
    this.personalID = personalID;
    // this.accessID = `${this.personalID}-${this.#accessCode}`; // assume accessID is encrypted here

    // this.provideAccessCode = () => {
    //   return this.#accessCode;
    // }
  }

  sendDocumentsForStorage() {
    const storeDocument = new StoreDocument(this.name, this.age, this.personalID);
    storeDocument.storeRecord();
    return storeDocument;
  }

  retrieveRecord(personalID) {
    const accessCode = accessIdProvider.getAccessCode();
    const accessID = `${personalID}-${accessCode}`;
    // uncomment the following line and comment out the next line after that to run the api for this demonstration.
    const storeDocument = this.sendDocumentsForStorage();
    // const storeDocument = new StoreDocument(this.name, this.age, this.personalID); 
    const retrievedRecord = storeDocument.getRecord(personalID, accessID);
    return retrievedRecord;
  }

  
}

module.exports = VerifyDocument;
