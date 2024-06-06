import { useState } from "react";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { OPENAI_KEY } from "../keys.json";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF"
import { createSystemPrompt } from "./Prompt";
import { useParams } from 'react-router-dom';
import ReactMarkdown from "react-markdown";

const openai = new OpenAI({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

function App() {
  const { id } = useParams<{ id: string }>();
  const [history, setHistory] = useState<ChatCompletionMessageParam[]>([
    { role: "system", content: createSystemPrompt(id ?? "-1") },
  ]);
  const [generating, setGenerating] = useState<boolean>(false);
  const [textareaCount, setTextareaCount] = useState<number>(0);
  const [prompt, setPrompt] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [purchasedItems, setPurchasedItems] = useState<any>({});
  const [isImageExpanded, setIsImageExpanded] = useState<boolean>(false);
  const maxTokens = 256;

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
        messages: [
          ...history,
          m,
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        model: "gpt-4o",
      });
      setImageFile(null);
    } else {
      response = await openai.chat.completions.create({
        messages: [...history, m],
        model: "gpt-4o",
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
      let tempHistory: ChatCompletionMessageParam[] = [
        ...history,
        response.choices[0].message,
        {
          role: "user",
          content: `Een voorbeeld van een json bericht na het afronden van het gesprek is:
reageer ALLEEN met een json bericht met de volgende structuur NIKS ANDERS
Laat de additional_info LEEG met een LEGE STRING als er geen extra info is. vul daar alleen iets in als het ABSOLUUT nodig is
bijvoorbeeld een kleur, of extra service.
{
    "items": [
      {
          "name": "Quartz Countertops",
          "quantity": "8 vierkante meters",
          "price": "€200",
          "total_price": "€1.600"
          "additional_info": "extra info about the product"
      },
      {
          "name": "Backsplash installation",
          "quantity": "2 lineaire meters",
          "price": "€60",
          "total_price": "€120"
          "additional_info": "extra info about installation"
      }
      ],
      "total_price": "€1.720"
      "additional_info": "extra info about full order"
}`,
        },
      ];
      let finalResponse = await openai.chat.completions.create({
        messages: tempHistory,
        model: "gpt-4o",
      });
      let total_tries = 4;

      for (let i = 0; i < total_tries; i++) {
        if (finalResponse.choices[0].message.content) {
          try {
            const purchasedItemsJson = JSON.parse(
              finalResponse.choices[0].message.content,
            );
            if (
              purchasedItemsJson.items &&
              purchasedItemsJson.total_price
            ) {
              setPurchasedItems(purchasedItemsJson);
              console.log(finalResponse.choices[0].message.content);
              return;
            }

            tempHistory = [
              ...tempHistory,
              finalResponse.choices[0].message,
              {
                role: "user",
                content: `
              Laat de additional_info LEEG met een LEGE STRING als er geen extra info is. vul daar alleen iets in als het ABSOLUUT nodig is
bijvoorbeeld een kleur, of extra service.

              Fout format van JSON, Verwacht:
              
{
  "items": [
  {
      "name": "Quartz Countertops",
      "quantity": "8 vierkante meters",
      "price": "€200",
      "total_price": "€1.600"
      "additional_info": "extra info about the product"
  },
  {
      "name": "Backsplash installation",
      "quantity": "2 lineaire meters",
      "price": "€60",
      "total_price": "€120"
      "additional_info": "extra info about installation"
  }
  ],
  "total_price": "€1.720"
  "additional_info": "extra info about full order"
} Gekregen:
                ${finalResponse.choices[0].message.content}`,
              },
            ];
            finalResponse = await openai.chat.completions.create({
              messages: tempHistory,
              model: "gpt-4o",
            });
          } catch (error) {
            console.error("Error parsing JSON:", error);
            tempHistory = [
              ...tempHistory,
              {
                role: "user",
                content: `Sorry, het systeem kon de JSON niet parsen ${error}`,
              },
            ];
            finalResponse = await openai.chat.completions.create({
              messages: tempHistory,
              model: "gpt-4o",
            });
          }
        }

        if (i === total_tries - 1) {
          console.log(tempHistory);
          console.log(finalResponse.choices[0].message.content);
          console.error("Failed to get JSON response");
          setHistory([
            ...history,
            {
              role: "assistant",
              content: "Failed to get JSON response",
            },
          ]);
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
        const base64 = reader.result?.toString().split(",")[1];
        if (typeof base64 === "string") {
          resolve(base64);
        } else {
          reject("Failed to encode image");
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
      <h1 className="bliss">
          <a href="/dashboard">
              <img src="/blis.svg" alt="Blis Logo" />
          </a>
        </h1>
      <div className="main-page">
        <div className="chat">
          <div className="chat-history">
            {history.map((h, i) => {
              if (h.role == "system") return null;
              if (h.role === "assistant") {
                return (
                  <div className="message">
                    <p key={i}>
                      Assistant:
                      <ReactMarkdown>{h.content?.toString()}</ReactMarkdown>
                    </p>
                  </div>
                );
              }
              return (
                <div className="message">
                  <p key={i}>You: {h.content?.toString()}</p>
                </div>
              );
            })}
            {purchasedItems.items &&
              <PDFDownloadLink className="download-link" document={<InvoicePDF invoiceData={purchasedItems} />} fileName="invoice.pdf">
                  {({ blob, url, loading, error }) =>
                      loading ? 'Loading document...' : 'Download Invoice'
                  }
              </PDFDownloadLink>}
          </div>
          <div className="textarea-wrapper">
            <div className="word-count">
              <p>
                {textareaCount}/{maxTokens}
              </p>
            </div>
            <div className="textarea-container">
              {imagePreview && (
                <div
                  className="image-preview"
                  onClick={handleImageClick}
                >
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    style={{
                      width: isImageExpanded
                        ? "300px"
                        : "50px",
                      height: isImageExpanded
                        ? "300px"
                        : "50px",
                      objectFit: "contain",
                      cursor: "pointer",
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
              <label
                htmlFor="image-upload"
              >
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
      </div>
    </>
  );
}

export default App;
