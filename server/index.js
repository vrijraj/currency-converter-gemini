// Import required packages
require("dotenv").config();
const express = require("express");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

// Initialize Express
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Configure the client
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

// Define the function for AI to understand
const functionDefinitions = [
  {
    name: "convertINRtoUSD",
    description: "Convert amount from Indian Rupees (INR) to US Dollars (USD)",
    parameters: {
      type: "object",
      properties: {
        amount: {
          type: "number",
          description: "Amount in INR to convert",
        },
      },
      required: ["amount"],
    },
  },
];

// Currency conversion function
async function convertINRtoUSD(amount) {
  console.log("amount", amount);

  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/INR"
    );
    const data = await response.json();
    const usdRate = data.rates.USD;
    return amount * usdRate;
  } catch (error) {
    throw new Error("Failed to convert currency");
  }
}

// Create the conversion endpoint
app.post("/convert", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message,
      config: {
        tools: [
          {
            functionDeclarations: functionDefinitions,
          },
        ],
      },
    });

    // Check for function calls in the response
    if (response.functionCalls && response.functionCalls.length > 0) {
      const functionCall = response.functionCalls[0]; // Assuming one function call
      console.log(`Function to call: ${functionCall.name}`);
      console.log(`Arguments: ${JSON.stringify(functionCall.args)}`);

      const amount = functionCall.args.amount;

      // In a real app, you would call your actual function here:
      const usdAmount = await convertINRtoUSD(amount);

      // Send the successful conversion response
      res.json({
        success: true,
        inr: amount,
        usd: usdAmount.toFixed(2),
        message: `${amount} INR = ${usdAmount.toFixed(2)} USD`,
      });
    } else { // If no function call is found
      console.log("No function call found in the response.");
      console.log(response.text);
      // Send a response indicating that the conversion could not be processed
      return res.json({
        success: false,
        message: "Could not process conversion request",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "An unexpected error occurred",
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});