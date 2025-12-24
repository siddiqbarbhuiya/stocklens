// const express = require('express');
// const multer = require('multer');
// const cors = require('cors');
// const fs = require('fs');
// const dotenv = require('dotenv');
// const { GoogleGenAI } = require('@google/genai');

// dotenv.config();

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// const upload = multer({ dest: 'uploads/' });

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY,
// });

// // Use 'any' for req/res types to avoid the property mapping errors
// app.post('/analyze', upload.single('pdf'), async (req: any, res: any) => {
//     if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//     try {
//         // 1. Convert PDF to Base64
//         const fileBuffer = fs.readFileSync(req.file.path);
//         const base64Data = fileBuffer.toString('base64');

//         // 2. Call Gemini 2.0 Flash with CORRECT SDK casing
//         const response = await ai.models.generateContent({
//             model: 'gemini-2.5-flash',
//             contents: [
//                 {
//                     role: 'user',
//                     parts: [
//                         { text: "Analyze this financial document. Return a JSON object with: companyName, summary, bullishnessScore (0-100), bullishnessReasoning, longTermProjections (array), orderBook, keyRisks (array), and futureOutlook." },
//                         {
//                             // KEY FIX: Change to inlineData (camelCase)
//                             inlineData: {
//                                 mimeType: 'application/pdf', // KEY FIX: Change to mimeType
//                                 data: base64Data
//                             }
//                         }
//                     ]
//                 }
//             ],
//             config: {
//                 response_mime_type: 'application/json',
//             }
//         });

//         // 3. Clean up
//         if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);

//         // 4. Access the response text correctly
//         // In the new SDK, text is a property on the response object
//         // 4. Access and Clean the response text
//         let analysisText = response.candidates[0].content.parts[0].text;

//         // SANITIZER: Remove markdown backticks if they exist
//         if (analysisText.includes("```")) {
//             analysisText = analysisText
//                 .replace(/```json/g, "") // Remove starting tag
//                 .replace(/```/g, "")     // Remove ending tag
//                 .trim();                 // Remove extra whitespace
//         }

//         res.json(JSON.parse(analysisText));

//     } catch (error: any) {
//         console.error("Analysis Error:", error);
//         if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
//         res.status(500).json({ error: error.message || "Failed to analyze document" });
//     }
// });

// app.listen(port, () => {
//     console.log(`🚀 Server running at http://localhost:${port}`);
// });

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const dotenv = require('dotenv');
const { GoogleGenAI } = require('@google/genai');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 50 * 1024 * 1024 }
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const ANALYSIS_PROMPT = `You are an expert financial analyst specializing in Indian stock market (NSE/BSE) companies. 
Analyze the provided financial document and extract comprehensive investment insights.

Return ONLY a valid JSON object (no markdown, no backticks) with this EXACT structure:
{
  "companyName": "string",
  "ticker": "string (NSE/BSE ticker)",
  "sector": "string (e.g., IT, Pharma, Auto, Banking, FMCG, etc.)",
  "marketCap": "string (e.g., '₹1.2 Lakh Cr')",
  "summary": "string (150 words executive summary)",
  "bullishnessScore": number (0-100 scale),
  "bullishnessReasoning": ["string", "string", "string", "string", "string"],
  "financialMetrics": {
    "revenueGrowth": number (% growth YoY),
    "profitMargin": number (% net profit margin),
    "debtToEquity": number (debt/equity ratio),
    "roe": number (return on equity %),
    "eps": "string (earnings per share)",
    "peRatio": number (price to earnings ratio)
  },
  "longTermProjections": [
    {"metric": "FY25 Revenue Target", "value": "string"},
    {"metric": "FY26 Target", "value": "string"},
    {"metric": "CAGR Expected", "value": "string"},
    {"metric": "Margin Expansion", "value": "string"},
    {"metric": "Capex Plan", "value": "string"}
  ],
  "orderBook": {
    "totalValue": "string (e.g., '₹50,000 Cr')",
    "timeline": "string (execution timeline)"
  },
  "keyRisks": ["string risk 1", "string risk 2", "string risk 3", "string risk 4", "string risk 5", "string risk 6", "string risk 7", "string risk 8"],
  "futureOutlook": "string (200 words 3-5 year outlook)",
  "competitiveAdvantage": ["string advantage 1", "string advantage 2", "string advantage 3", "string advantage 4"],
  "managementQuality": number (1-10 scale),
  "pricingStrategy": "string (company's pricing strategy and market position)",
  "marketOpportunity": "string (TAM and market opportunity)"
}`;

app.post('/analyze', upload.single('pdf'), async (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // 1. Convert PDF to Base64
    const fileBuffer = fs.readFileSync(req.file.path);
    const base64Data = fileBuffer.toString('base64');

    // 2. Call Gemini 2.0 Flash with proper structure
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { 
              text: ANALYSIS_PROMPT
            },
            {
              inlineData: {
                mimeType: 'application/pdf',
                data: base64Data
              }
            }
          ]
        }
      ],
      config: {
        response_mime_type: 'application/json',
      }
    });

    // 3. Clean up uploaded file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    // 4. Extract response text
    let analysisText = response.candidates[0].content.parts[0].text;

    // 5. Clean markdown formatting if present
    if (analysisText.includes("```")) {
      analysisText = analysisText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
    }

    // 6. Parse JSON
    const analysisData = JSON.parse(analysisText);

    // 7. Validate and add defaults for missing fields
    const safeData = {
      companyName: analysisData.companyName || 'Unknown Company',
      ticker: analysisData.ticker || 'N/A',
      sector: analysisData.sector || 'Unknown',
      marketCap: analysisData.marketCap || 'N/A',
      summary: analysisData.summary || 'Summary not available',
      bullishnessScore: Math.min(100, Math.max(0, analysisData.bullishnessScore || 50)),
      bullishnessReasoning: Array.isArray(analysisData.bullishnessReasoning) 
        ? analysisData.bullishnessReasoning.slice(0, 5) 
        : ['Analysis completed'],
      financialMetrics: {
        revenueGrowth: analysisData.financialMetrics?.revenueGrowth || 0,
        profitMargin: analysisData.financialMetrics?.profitMargin || 0,
        debtToEquity: analysisData.financialMetrics?.debtToEquity || 0,
        roe: analysisData.financialMetrics?.roe || 0,
        eps: analysisData.financialMetrics?.eps || 'N/A',
        peRatio: analysisData.financialMetrics?.peRatio || 0,
      },
      longTermProjections: (analysisData.longTermProjections || []).slice(0, 8),
      orderBook: analysisData.orderBook || { totalValue: 'N/A', timeline: 'N/A' },
      keyRisks: Array.isArray(analysisData.keyRisks) ? analysisData.keyRisks.slice(0, 8) : [],
      futureOutlook: analysisData.futureOutlook || 'Outlook not available',
      competitiveAdvantage: Array.isArray(analysisData.competitiveAdvantage) 
        ? analysisData.competitiveAdvantage.slice(0, 4) 
        : [],
      managementQuality: Math.min(10, Math.max(1, analysisData.managementQuality || 5)),
      pricingStrategy: analysisData.pricingStrategy || 'Strategy analysis pending',
      marketOpportunity: analysisData.marketOpportunity || 'Market analysis pending',
    };

    res.json(safeData);

  } catch (error: any) {
    console.error("Analysis Error:", error);
    
    // Clean up file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ 
      error: error.message || "Failed to analyze document",
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Health check endpoint
app.get('/health', (req: any, res: any) => {
  res.json({ status: 'Server running', version: '2.0' });
});

app.listen(port, () => {
  console.log(`🚀 StockLens Server running at http://localhost:${port}`);
  console.log(`📊 Indian Market Edition with Gemini 2.0`);
});