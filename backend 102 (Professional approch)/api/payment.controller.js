import axios from "axios";
import globals from "node-global-storage";
import { v4 } from "uuid";
class paymentController {
  bkash_headers = async () => {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: globals.get("id_token"),
      "x-app-key": `0vWQuCRGiUX7EPVjQDr0EUAYtc`,
    };
  };
  payment_create = async (req, res) => {
    const { amount } = req.body;
    try {
      const { data } = await axios.post(
        `https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create`,
        {
          mode: "0011",
          payerReference: " ",
          callbackURL: "http://localhost:3000/api/bkash/payment/callback",
          amount: amount,
          currency: "BDT",
          intent: "sale",
          merchantInvoiceNumber: "Inv" + v4().substring(0, 5),
        },
        { headers: await this.bkash_headers() }
      );
      return res.status(200).json({ bkashURL: data.bkashURL });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  };
  call_back = async (req, res) => {
    const { paymentID, status } = req.query;
    console.log(req.query);
    if (status === "cancel" || status === "failure") {
      return res.redirect(`http://localhost:3000/bkasherror`);
    }
  };
}

export default new paymentController();
