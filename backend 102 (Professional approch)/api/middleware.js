import axios from "axios";
import { get, set, unset } from "node-global-storage";
class middleWare {
  bkash_auth = async (req, res, next) => {
    unset("id_token");
    try {
      const { data } = await axios.post(
        `https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant`,
        {
          app_key: "0vWQuCRGiUX7EPVjQDr0EUAYtc",
          app_secret: "jcUNPBgbcqEDedNKdvE4G1cAK7D3hCjmJccNPZZBq96QIxxwAMEx",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            username: "01770618567",
            password: "D7DaC<*E*eG",
          },
        }
      );
      set("id_token", data.id_token, { protected: true });
      next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  };
}

export default new middleWare();
