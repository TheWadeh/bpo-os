const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getAiInsights = async (req, res) => {
  const { clientName, leadStage, value } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const prompt = `Analyze the following lead data and provide insights:\nClient Name: ${clientName}\nLead Stage: ${leadStage}\nValue: ${value}\n\nBased on this, provide:\n1. Lead closing probability (as a percentage)\n2. Suggestions to improve closing probability\n3. Potential risk factors`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ insights: text });
  } catch (error) {
    console.error("Error generating AI insights:", error);
    res.status(500).json({ error: "Failed to generate AI insights" });
  }
};