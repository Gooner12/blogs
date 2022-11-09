const StoreDocument = require("../documentStorer/store");
const { v4: uuidv4 } = require("uuid");

class VerifyDocument {
  #accessCode = uuidv4();
  constructor(name, age, personalID) {
    this.name = name;
    this.age = age;
    this.personalID = personalID;
    
    this.provideAccessCode = () => {
      return this.#accessCode;
    }
  }

  sendDocumentsForStorage() {
    const storeDocument = new StoreDocument(this.name, this.age, this.personalID);
    storeDocument.storeRecord();
    return storeDocument;
  }

  retrieveRecord(personalID) {
    const accessID = `${personalID}-${this.provideAccessCode()}`; // encrypting access code to get access id
    // uncomment this line and comment out the next line to run the api for this demonstration.
    // const storeDocument = this.sendDocumentsForStorage();
    const storeDocument = new StoreDocument(this.name, this.age, this.personalID); 
    const retrievedRecord = storeDocument.getRecord(personalID, accessID);
    return retrievedRecord;
  }
}

module.exports = VerifyDocument;
