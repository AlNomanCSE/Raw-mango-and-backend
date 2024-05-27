import "dotenv/config";
import express from "express";
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("This is GET request");
});
app.post("/", (req, res) => {
  res.send("This is POST request");
});
app.post("/sending", (req, res) => {
  res.json({ message: "Abdullah Al Noman" });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
