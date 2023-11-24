const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const vendorRoute = require("./routes/vendorRoute");
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
