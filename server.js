const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT;
const vendorRoute = require("./routes/vendorRoute");

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(vendorRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
