const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const signUpVendor = async (req, res) => {
  // let { firstName, lastName, email, password, phoneNumber, business } =
  //   req.body;wrong
  const { business, ...rest } = req.body;
  try {
    // This will check whether vendor's details already exist in the database
    const existingVendor = await prisma.vendor.findFirst({
      where: { email: rest.email },
    });
    if (existingVendor) {
      return res.status(409).json({ message: "Vendor has already registered" });
    } else {
      //Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(rest.password, 10);
      rest.password = hashedPassword;

      //This line of code is going to create a vendor

      const newVendor = await prisma.vendor.create({
        data: {
          ...rest,
          business: {
            create: business,
          },
        },
        include: { business: true },
      });
      res.status(201).json({
        message: "Vendor successfully registered",
        vendor: newVendor,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//This code is use to get a single vendor by id

const getSingleVendor = async (req, res) => {
  //const id = req.params.id;wrong
  const { id } = req.params;
  try {
    const getSingleVendor = await prisma.vendor.findUnique({
      where: { id },
      include: { business: true },
    });
    res.status(200).json({ getSingleVendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//This code is for updating a vendor

const updateSingleVendor = async (req, res) => {
  //const id = req.params.id;wrong
  const { id } = req.params;
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
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Vendor authentication endpoint

const loginVendor = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { email },
      include: { business: true },
    });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    } else {
      const token = jwt.sign({ userId: vendor.id }, process.env.SECRET_KEY);
      res.json({ token, vendor });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  signUpVendor,
  getSingleVendor,
  updateSingleVendor,
  loginVendor,
};
