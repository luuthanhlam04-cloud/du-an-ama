import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export async function analyzeMedicineImage(base64Image: string, mimeType: string) {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash-latest",
    contents: [
      {
        role: "user",
        parts: [
          { inlineData: { data: base64Image, mimeType: mimeType } },
          { text: "Trích xuất thông tin thuốc thành JSON. Các trường: name (string), brandName (string|null), activeIngredients (string|null), usage (string), expiryDate (string|null, định dạng dd/mm/yyyy), warnings (string|null). Nếu không thấy expiryDate, bắt buộc trả về null." }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
    }
  });
  
  if (!response.text) {
    throw new Error("Empty response");
  }
  
  return JSON.parse(response.text);
}