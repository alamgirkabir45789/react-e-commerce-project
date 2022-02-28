const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const Secret_Key =
  "sk_test_51KXbxLLZaK5XVv1qZVxymodewNjIfGk1f8it4cyVs5xeVRoX6CzuI0aavUTTlUP8n4K1PQYL6kvaocBdjDnxS6LH00pu1gv7tT";
const stripe = require("stripe")(Secret_Key);
const app = express();
app.use(cors());
app.use(express.json());

//Get request
app.get("/", (req, res) => {
  res.send("Welcome to react shop app");
});

//Post request
app.post("/checkout", (req, res) => {
  let status;
  console.log(req);
  console.log(res);
  try {
    const { product, token } = req.body;
    const customer = stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const key = uuidv4();
    const charge = stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: "all products description",
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      { idempotencykey: key }
    );
    console.log("charge", charge);
    status = "success";
  } catch (error) {
    console.log(error);
    console.log("Status failed!!");
  }
  res.json({ status });
});

//Listen app
app.listen(8080, () => {
  console.log("Your app is running on port number:8080");
});
