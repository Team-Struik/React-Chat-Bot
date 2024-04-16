import { useState, useRef } from "react";
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { OPENAI_KEY } from "../keys.json";

const openai = new OpenAI({ apiKey: OPENAI_KEY, dangerouslyAllowBrowser: true });

function App() {
  const [history, setHistory] = useState<ChatCompletionMessageParam[]>([
    { role: 'system', content: createSystemPrompt() },
  ]);
  const [generating, setGenerating] = useState<boolean>(false);
  const [textareaCount, setTextareaCount] = useState<number>(0);
  const [prompt, setPrompt] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [purchasedItems, setPurchasedItems] = useState<any>([]);

  const [isImageExpanded, setIsImageExpanded] = useState<boolean>(false);

  const maxTokens = 250;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    setIsImageExpanded(!isImageExpanded);
  };

  const handleSubmit = async () => {
    const m: ChatCompletionMessageParam = { role: "user", content: prompt };
    setGenerating(true);

    let response;
    if (imageFile) {
      const base64Image = await encodeImage(imageFile);
      response = await openai.chat.completions.create({
        messages: [...history, m, { role: "user", content: [{ type: "text", text: prompt }, { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } }] }],
        model: 'gpt-4-turbo',
      });
      setImageFile(null);
    } else {
      response = await openai.chat.completions.create({
        messages: [...history, m],
        model: 'gpt-4-turbo',
      });
    }

    if (!response.choices[0].message.content) {
      return;
    }

    if (response.choices[0].message.content.includes("completed")) {
        console.log("Chat is completed");
        setPrompt("");
        setTextareaCount(0);
        setHistory([...history, m]);
        setGenerating(true);
        const finalResponse = await openai.chat.completions.create({
            messages: [...history, 
            { role: "system", content: "Het gesprek is afgelopen, het volgende bericht komt van intern. reageer alleen met een json" },
            { role: "user", content: `Een voorbeeld van een json bericht na het afronden van het gesprek is:
            reageer ALLEEN met een json bericht met de volgende structuur NIKS ANDERS
            {
                "items": [
                {
                    "name": "Quartz Countertops",
                    "quantity": "2 vierkante meters",
                    "price": "€200",
                    "total_price": "€400"
                },
                {
                    "name": "Backsplash installation",
                    "quantity": "2 lineaire meters",
                    "price": "€60",
                    "total_price": "€120"
                }
                ],
                "total_price": "€520"
            }`}],
            model: 'gpt-4-turbo',
        });

          if (finalResponse.choices[0].message.content) {
            try {
              const purchasedItemsJson = JSON.parse(finalResponse.choices[0].message.content);
              setPurchasedItems(purchasedItemsJson);
              console.log("Purchased items:", purchasedItemsJson);
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          }

        return;
    }

    setPrompt("");
    setTextareaCount(0);
    setHistory([...history, m, response.choices[0].message]);
    setGenerating(false);
  };

  const encodeImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result?.toString().split(',')[1];
        if (typeof base64 === 'string') {
          resolve(base64);
        } else {
          reject('Failed to encode image');
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <h1>AI Chat Bot</h1>
      <div className="chat">
        <div className="chat-history">
          {history.map((h, i) => {
            if (h.role == 'system') return null;
            return <p key={i}>{h.role == "user" ? "You" : "Kitchen Assistant"}: {h.content?.toString()}</p>;
          })}
        </div>
        <div className="textarea-wrapper">
          <div className="above-input">
            <p>{textareaCount}/{maxTokens}</p>
          </div>
          <div className="textarea-container">
            {imagePreview && (
              <div className="image-preview" onClick={handleImageClick}>
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  style={{
                    width: isImageExpanded ? '300px' : '50px',
                    height: isImageExpanded ? '300px' : '50px',
                    objectFit: 'contain',
                    cursor: 'pointer',
                  }}
                />
              </div>
            )}
            <textarea
              disabled={generating}
              maxLength={maxTokens}
              value={prompt}
              onChange={(e) => {
                setTextareaCount(e.target.value.length);
                setPrompt(e.target.value);
              }}
            />
            <label htmlFor="image-upload" className="image-upload-label">
              {imageFile ? imageFile.name : "Upload Image"}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <button
              disabled={generating || prompt.trim() === ""}
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const createSystemPrompt = () => {
  let header = `
Respond in Dutch always.
You are an online chat bot for a kitchen table maker. You help the customer find the best product.
Only respond to relevant questions, ignore anything that is not related.
If there is a list of prices, provide a clear overview of which numbers are referring to.
These are the products:
1. Quartz Countertops: Price: €200 per square meter
2. Granite Countertops: Price: €250 per square meter

Additional items:
Applying sealer: €20 per square meter
Backsplash installation: €60 per linear meter
Measuring and surveying: €200 per visit
Edge finishing (e.g. beveled, rounded): €50 per linear meter
Cutout for undermount sink: €100 per piece
Installation: €200 per meter

Formateer je text in normale zinnen, en gebruik alleen newlines als het nodig is.


Als het gesprek afgelopen is, stuur je een AFSLUITINGSBERICHT.
In dit bericht Vraag je of het gesprek afgerond is, en als het afgerond is. Reageer dan met een json bericht met de volgende structuur:
{
  "status": "completed"
}
`;
  return header;
};

export default App;