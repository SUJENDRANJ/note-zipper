const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const User = require("./models/User");
require("colors");

const app = express();

const items = [
  {
    category: "plans",
    title: "What subscription plans do you offer?",
    content:
      "We offer three subscription tiers: Starter ($9/month), Professional ($29/month), and Enterprise ($99/month). Each plan includes increasing storage limits, API access, priority support, and team collaboration features.",
  },
  {
    category: "billing",
    title: "How does billing work?",
    content:
      "Billing occurs automatically at the start of each billing cycle. We accept all major credit cards, PayPal, and ACH transfers for enterprise customers. You'll receive an invoice via email after each payment.",
  },
  {
    category: "cancel",
    title: "How do I cancel my subscription?",
    content:
      "You can cancel your subscription anytime from your account settings. There are no cancellation fees or penalties. Your access will continue until the end of your current billing period.",
  },
];

app.get("/api/data", (req, res) => {
  console.log("called");

  const user = new User({
    name: "Suje",
  });

  user.save();

  res.send(items);
});

connectDB()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server Started".yellow);
    });
  })
  .catch((err) => {
    console.log(`Server Failed ${err.message}`.red);
  });
