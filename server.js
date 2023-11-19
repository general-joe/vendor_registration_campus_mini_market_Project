const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.post("/register", async (req, res) => {
  let { firstName, lastName, email, password, phoneNumber, business } =
    req.body;
  try {
    // This will check whether vendor's details already exist in the database
    const existingVendor = await prisma.vendor.findFirst({
      where: { email },
    });
    if (existingVendor) {
      return res.status(409).json({ massage: "Vendor has already registered" });
    } else {
      //Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 10);
      password = hashedPassword;

      //This line of code is going to create a vendor

      const newVendor = await prisma.vendor.create({
        data: {
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          business: {
            create: business,
          },
        },
        include: { business: true },
      });
      res.status(201).json({
        massage: "Vendor successfully registered",
        vendor: newVendor,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ massage: "Internal Server Error" });
  }
});

//This code is use to get a single vendor by id

app.get("/register/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getSingleVendor = await prisma.vendor.findUnique({
      where: { id },
      include: { business: true },
    });
    res.status(200).json({ getSingleVendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ massage: "Internal Server Error" });
  }
});

//This code is for updating a vendor
app.patch("/register/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const updateVendor = await prisma.vendor.update({
      where: { id },
      include: { business: true },
      data,
    });
    res.status(200).json({ updateVendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ massage: "Internal Server Error" });
  }
});

//Vendor authentication endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { email },
      include: { business: true },
    });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ massage: "Invalid credentials" });
    } else {
      const token = jwt.sign({ userId: vendor.id }, process.env.SECRET_KEY);
      res.json({ token, vendor });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ massage: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
