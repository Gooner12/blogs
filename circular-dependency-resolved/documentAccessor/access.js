const VerifyDocument = require("../verifyDocuments/verify");

const verifyDocument = new VerifyDocument("John", 32, 1);
const accessDocument = (accessorPersonalID) => {
    const record = verifyDocument.retrieveRecord(accessorPersonalID);
    return record;
}

module.exports = accessDocument;