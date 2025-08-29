import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Your bfhl logic (copied from bfhl.js)
const FULL_NAME = "soham_rajendra_bhore";
const DOB_DDMMYYYY = "18052003";
const EMAIL = "sohamrajendra.bhore2022@vitstudent.ac.in";
const ROLL_NUMBER = "22BLC1146";

const isNumeric = (s) => typeof s === "string" && /^[0-9]+$/.test(s);
const isAlphabet = (s) => typeof s === "string" && /^[a-zA-Z]+$/.test(s);

const alternateCaps = (s) =>
  s
    .split("")
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");

app.post("/bfhl", (req, res) => {
  try {
    const body = req.body || {};
    const data = Array.isArray(body.data) ? body.data : null;

    if (!data) {
      return res.status(400).json({
        is_success: false,
        message: 'Invalid payload. Expected: { "data": ["a","1","$"] }',
      });
    }

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    for (const item of data) {
      if (isNumeric(item)) {
        const n = parseInt(item, 10);
        sum += n;
        (n % 2 === 0 ? even_numbers : odd_numbers).push(item);
      } else if (isAlphabet(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    }

    const joinedAlpha = alphabets.join("");
    const reversed = joinedAlpha.split("").reverse().join("");
    const concat_string = alternateCaps(reversed);

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ is_success: false, message: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("BFHL API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
