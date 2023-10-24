const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const PORT = process.env.PORT || 6060;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", async (req, res) => {
  try {
    const data = req.body;
    //This is to filter an array object of the vendor model and business info model
    let = data;
    const {
      businessName,
      businessType,
      address,
      licensed,
      insured,
      ownerName,
    } = data;
    {
      firstName, lastName, email, password, phoneNumber;
    }
    // This will check whether vendor's details already exist in the database
    const existingVendor = await prisma.vendor.findFirst({
      where: { email },
    });
    if (existingVendor) {
      return res.status(409).json({ massage: "Vendor has already registered" });
    } else {
      //Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
      password = hashedPassword;
      //Create the vendor and business info records with a transaction
      const newVendor = await prisma.vendor.create({
        data: { firstName, lastName, email, password, phoneNumber },
      });

      const businessInfo = await prism.businessInfo.create({
        businessName,
        businessType,
        address,
        licensed,
        insured,
        ownerName,
      });
      res
        .status(201)
        .json({
          massage: "Vendor successfully registered",
          vendor: newVendor,
          Business: businessInfo,
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ massage: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
