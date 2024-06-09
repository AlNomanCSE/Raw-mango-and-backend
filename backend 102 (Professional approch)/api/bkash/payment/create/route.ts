import type { NextApiRequest, NextApiResponse } from "next";
import {
  createPayment,
  executePayment,
  queryPayment,
  searchTransaction,
  refundTransaction,
} from "bkash-payment";

const bkashConfig = {
  base_url: "https://tokenized.sandbox.bka.sh/v1.2.0-beta",
  username: "01770618567",
  password: "D7DaC<*E*eG",
  app_key: "0vWQuCRGiUX7EPVjQDr0EUAYtc",
  app_secret: "jcUNPBgbcqEDedNKdvE4G1cAK7D3hCjmJccNPZZBq96QIxxwAMEx",
};

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { amount, callbackURL, orderID, reference } = req.body;
    const paymentDetails = {
      amount: amount || 10, // your product price
      callbackURL: callbackURL || "http://127.0.0.1:3000/bkash-callback", // your callback route
      orderID: orderID || "Order_101", // your orderID
      reference: reference || "1", // your reference
    };
    const result = await createPayment(bkashConfig, paymentDetails);

    // return res.send(result);
  } catch (e) {
    console.log(e);
  }
}
