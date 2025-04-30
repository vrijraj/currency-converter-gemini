# INR to USD Currency Converter

A simple web application that converts Indian Rupees (INR) to US Dollars (USD) using Google's Gemini AI to process natural language requests.

## Features

- Simple mode for direct amount input
- Chat mode for natural language queries
- Real-time currency conversion using current exchange rates
- Modern, responsive UI

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **AI**: Google Gemini AI
- **APIs**: ExchangeRate API for real-time conversion rates

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- Google Gemini API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/vrijraj/currency-converter-gemini.git
   cd currency-converter
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your Google API key:
   ```
   GOOGLE_API_KEY=your_google_api_key_here
   PORT=3000
   ```

4. Start the application:
   ```
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Development

For development with auto-restart on file changes:
```
npm run dev
```

## Usage

1. **Simple Mode**:
   - Enter the amount in INR
   - Click "Convert to USD"
   - View the conversion result

2. **Chat Mode**:
   - Type a natural language query like "Convert 500 rupees to USD"
   - Click "Get Conversion"
   - View the conversion result

## Project Structure

```
currency-converter/
├── public/
│   ├── index.html         // HTML interface
│   ├── styles.css         // CSS styles
│   └── script.js          // Frontend JavaScript
│
├── server/
│   └── index.js           // Node.js backend server
│
├── .env                   // Environment variables
├── package.json           // Project configuration
└── README.md              // Project documentation
```

## Credits

- Exchange rates provided by [ExchangeRate-API](https://www.exchangerate-api.com/)
- Natural language processing by [Google Gemini AI](https://ai.google.dev/)
