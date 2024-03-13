import { useState } from "react"
import OpenAI from 'openai';


const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
  });


type Message = {
    role: string;
    content: string;
}

function App() {
    const [history, setHistory] = useState<Message[]>([{role: 'system', content: createSystemPrompt()}]);
    const [generating, setGenerating] = useState<boolean>(false);
    const [textareaCount, setTextareaCount] = useState<number>(0);
    const [prompt, setPrompt] = useState<string>("");
    const maxTokens = 250;
    
    const handleSubmit = async () => {
        const m: Message = {role: "user", content: prompt};
        setGenerating(true);
        const response = await openai.chat.completions.create({
            messages: [{ role: 'user', content: 'Say this is a test' }],
            model: 'gpt-3.5-turbo',
          });
        setPrompt("");
        setTextareaCount(0);
        setHistory([...history, m, {role: 'system', content: response.data.choices[0].message.content}]);
        setGenerating(false);
    }

    return (
        <>
            <h1>AI Chat Bot</h1>
            <div className="chat">
                <div className="chat-history">
                    {history.map(h => {
                        if (h.role == 'system')
                            return;
                        return <p>{h.role}: {h.content}</p>
                    })}
                </div>
                <div className="textarea-wrapper">
                    <div className="above-input">
                        <p>{textareaCount}/{maxTokens}</p>
                    </div>
                    <div className="textarea-container">
                        <textarea 
                            disabled={generating}
                            maxLength={maxTokens}
                            value={prompt}
                            onChange={e => {setTextareaCount(e.target.value.length); setPrompt(e.target.value);}}/>
                        <button disabled={generating} type="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>

        </>
    )
}

const createSystemPrompt = () => {
    let header = `
Reageer altijd in het nederlands.
Jij bent een online chat bot voor een Keukentafel maker. Jij helpt de klant met het vinden van het beste product.
Reageer alleen op relevante vragen, alles wat er niet mee te maken heeft moet je negeren.
Als er spraken is van opsomming van de prijzen, geef een duidelijk overzicht over welke getallen het gaat.
Dit zijn de producten:
1. Kwartsen Werkbladen: Prijs: €200 per vierkante meter
2. Granieten Werkbladen: Prijs: €250 per vierkante meter

Extra items:
Aanbrengen van sealer: €20 per vierkante meter
Achterwand installatie: €60 per strekkende meter
Inmeten en opmeten: €200 per bezoek
Randafwerking (bijv. afgeschuind, afgerond): €50 per strekkende meter
Uitsparing voor onderbouw spoelbak: €100 per stuk
Installatie: €200 per meter
`
    return header;
}

export default App
