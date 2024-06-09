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
    const { status, paymentID } = req.query;
    let result;
    let response = {
      statusCode: "4000",
      statusMessage: "Payment Failed",
    };
    if (status === "success")
      result = await executePayment(bkashConfig, paymentID);

    if (result?.transactionStatus === "Completed") {
    }
    if (result)
      response = {
        statusCode: result?.statusCode,
        statusMessage: result?.statusMessage,
      };
    // You may use here WebSocket, server-sent events, or other methods to notify your client
    res.send(response);
  } catch (e) {
    console.log(e);
  }
}
