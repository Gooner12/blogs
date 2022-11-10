const express = require("express");
const accessDocument = require("./documentAccessor/access");
const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
    const record = accessDocument(1);
    console.log(record);
    res.send("Request sent.");
  });

app.listen(5001, () => {
    console.log("Server is listening on 5001");
});